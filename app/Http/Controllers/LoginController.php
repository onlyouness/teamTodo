<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ValidationText;
use App\Mail\ForgetPasswordMail;
use App\Models\NotificationText;
use Illuminate\Queue\RedisQueue;
use Illuminate\Contracts\Auth\Guard;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;
use \Illuminate\Foundation\Validation\ValidatesRequests;
use SebastianBergmann\Type\FalseType;// Include the ValidatesRequests trait
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;


class LoginController extends Controller
{
    //

    public $errorTexts;
    public $notify;
    public function __construct()
    {
        $this->errorTexts = ValidationText::all();
        $this->notify = NotificationText::all();



    }
    public function login(Request $request)
    {
        $rules = [
            'email' => "required",
            "password" => "required",
        ];
        $customMessages = [
            'email.required' => $this->errorTexts->where('id', 1)->first()->translated_custom_text,
            'email.email' => $this->errorTexts->where('id', 2)->first()->translated_custom_text,
            'password.required' => $this->errorTexts->where('id', 12)->first()->translated_custom_text,

        ];
        try {
            $request->validate($rules, $customMessages);
            $credentials = [
                "email" => $request->email,
                "password" => $request->password,
            ];
            $user = User::query()->where("email", $request->email)->first();

            if ($user) {
                if (Hash::check($request->password, $user->password)) {
                    $message = $this->notify->where('id', 26)->first()->custom_text;
                    $token = $user->createToken('Personal Access Token')->plainTextToken;
                    Session::remove("user");
                    Session::put("user", $user);
                    return response()->json([
                        'success' => $message,
                        "user" => $user,
                        'accessToken' => $token,
                        'token_type' => 'Bearer',
                    ]);
                    // if ( Auth::attempt($credentials)) {
                    //     $message = $this->notify->where('id', 26)->first()->custom_text;
                    //     $notification = $message;
                    //     \Log::info("user" . $request->user());
                    //     // Session::put('userAuth', Auth::user());
                    //     Session::flash('userAuth', Auth::user());
                    //     Session::save();
                    //     $tokenResult = $user->createToken('Personal Access Token');
                    //     $token = $tokenResult->plainTextToken;
                    //     \Log::info("auth user login" . Session::get("userAuth"));
                    //     return response()->json(['success' => $notification,"user"=>Auth::user(),'accessToken' =>$token,
                    //     'token_type' => 'Bearer',]);
                    // } else {
                    //     $message = $this->notify->where('id', 28)->first()->custom_text;
                    //     $notification = $message;

                    //     return response()->json(['error' => $notification],406 );
                    // }
                } else {
                    $message = $this->notify->where('id', 54)->first()->custom_text;
                    $notification =
                        $message;
                    return response()->json(['password' => $notification], 406);
                }
            } else {
                if ($request->google) {
                    $slug = Str::slug($request->name);
                    $user = User::create([
                        "name" => $request->name,
                        "slug" => $slug,
                        "email" => $request->email,
                        "image" => $request->image ? $request->image : "uploads/profiles/default.jpg",
                        "verified" => $request->verified ? $request->verified : false,
                        "password" => Hash::make($request->password),
                    ]);
                    $message = $this->notify->where('id', 26)->first()->custom_text;
                    $token = $user->createToken('Personal Access Token')->plainTextToken;
                    return response()->json([
                        'success' => $message,
                        "user" => $user,
                        'accessToken' => $token,
                        'token_type' => 'Bearer',
                    ]);



                } else {

                    $message = $this->notify->where('id', 35)->first()->custom_text;
                    $notification = $message;
                    return response()->json(["email" => $notification], 406);
                }
            }
        } catch (ValidationException $e) {
            // If validation fails, return the validation errors along with custom messages
            return response()->json(['error' => $e->errors()], 422);
        }


    }
    public function getUser(Request $request)
    {
        return response()->json(["user" => $request->user()]);
    }

    //Log out
    public function userLogOut(Request $request)
    {
        // \Log::info("token" . $request->user());
        $request->user()->tokens()->delete();
        return response()->json(["success" => "Sign out successfully "]);
    }



    //register:
    public function register(Request $request)
    {
        \Log::info("requests " . json_encode($request->all()));

        $rules = [
            'name' => "required",
            'email' => "required|unique:users|email",
            "password" => "sometimes|required|min:3",
        ];
        $customMessage = [
            'name.required' => ValidationText::query()->where("id", 4)->first()->custom_text,
            'email.required' => ValidationText::query()->where("id", 1)->first()->custom_text,
            "email.email" => ValidationText::query()->where("id", 2)->first()->custom_text,
            "email.unique" => ValidationText::query()->where("id", 3)->first()->custom_text,
            "password.required" => ValidationText::query()->where("id", 12)->first()->custom_text,
            "password.min" => ValidationText::query()->where("id", 35)->first()->custom_text,
        ];
        $slug = Str::slug($request->name);

        try {
            $request->validate($rules, $customMessage);
            if ($request->file('image')) {
                $manager = new ImageManager(new Driver());
                $image_extention = $request->file('image')->getClientOriginalExtension();
                $image_name = 'image-' . date('Y-m-d-h-i-s-') . rand(999, 9999) . '.' . $image_extention;
                // read image from filesystem
                $image = $manager->read($request->file('image'));
                $image->save(base_path('public/uploads/profiles/' . $image_name));
                $image_path = 'uploads/profiles/' . $image_name;

                // $listing->banner_image = $banner_image_path;
                \Log::info("there is a image path" . $image_path . "and the imgae" . $image_name);
            } else {
                $image_path = "uploads/profiles/image-2024-05-09-12-36-49-2986.jpg";

            }


            $user = User::create([
                "name" => $request->name,
                "slug" => $slug,
                "email" => $request->email,
                "image" => $image_path,

                "verified" => $request->verified ? $request->verified : false,
                "password" => Hash::make($request->password),
            ]);
            Session::remove("user");
            Session::put("user", $user);

            $message = $this->notify->where('id', 26)->first()->custom_text;
            $token = $user->createToken('Personal Access Token')->plainTextToken;
            return response()->json([
                'success' => $message,
                "user" => $user,
                'accessToken' => $token,
                'token_type' => 'Bearer',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        }



    }
    public function forgetPassword(Request $request)
    {
        $user = User::where("email", $request->email)->first();

        if ($user) {
            $token = Str::random(30);
            $user->remember_token = $token;
            $user->save();
            Mail::to($user->email)->send(new ForgetPasswordMail($user));
            return response()->json(["success" => "Please Check Your Mail To Reset Your Password"]);
        } else {

            $message = $this->notify->where('id', 35)->first()->custom_text;
            return response()->json(["email" => $message], 406);

        }


    }
    public function resetPassword($token)
    {
        $user = User::where("remember_token", "=", $token)->first();
        if (!empty($user)) {
            return response()->json(["user" => $user], 200);
        } else {
            abort(404);
        }

    }
    public function postPassword($token, Request $request)
    {
        \Log::info("request:" . json_encode($request->all()));
        $rules = [

            "password" => "required|min:4",
            'confirmed_password' => 'required|same:password|min:4'

        ];
        $customMessage = [
            "password.required" => ValidationText::query()->where("id", 12)->first()->custom_text,
            "password.min" => ValidationText::query()->where("id", 35)->first()->custom_text,
            "confirmed_password.same" => ValidationText::query()->where("id", 14)->first()->custom_text,

        ];


        try {
            $request->validate($rules, $customMessage);
            $user = User::where("remember_token", "=", $token)->first();
            if (!empty($user)) {
                $user->password = Hash::make($request->password);
                $user->remember_token = Str::random(30);
                $user->verified = true;
                $user->save();
                $message = $this->notify->where("id", 13)->first()->custom_text;
                return response()->json(['success' => $message]);
            } else {
                abort(404);
            }
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        }
    }

    public function registerGoogle(Request $request)
    {



        $slug = Str::slug($request->name);

        try {



            $user = User::create([
                "name" => $request->name,
                "slug" => $slug,
                "email" => $request->email,
                "image" => $request->image,

                "verified" => $request->verified ? $request->verified : false,
                "password" => Hash::make($request->password),
            ]);


            $message = $this->notify->where('id', 26)->first()->custom_text;
            $token = $user->createToken('Personal Access Token')->plainTextToken;
            Session::remove("user");
            Session::put("user", $user);
            return response()->json([
                'success' => $message,
                "user" => $user,
                'accessToken' => $token,
                'token_type' => 'Bearer',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        }



    }
}