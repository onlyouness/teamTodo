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
        try{
            $request->validate( $rules, $customMessages);
            $credential = [
                "email" => $request->email,
                "password" => $request->password,
            ];
        $user = User::query()->where("email",$request->email)->first();
            
            if ($user) {
                if (Hash::check($request->password, $user->password)) {
                    if ( Auth::guard("api")->attempt($credential)) {
                        $message = $this->notify->where('id', 26)->first()->custom_text;
                        $notification = $message;
                        \Log::info("user" . $request->user());
                        // Session::put('userAuth', Auth::user());
                        Session::flash('userAuth', Auth::user());
                        Session::save();
                        $tokenResult = $user->createToken('Personal Access Token');
                        $token = $tokenResult->plainTextToken;
                        \Log::info("auth user login" . Session::get("userAuth"));
                        return response()->json(['success' => $notification,"user"=>Auth::guard("api")->user(),'accessToken' =>$token,
                        'token_type' => 'Bearer',]);
                    } else {
                        $message = $this->notify->where('id', 28)->first()->custom_text;
                        $notification = $message;
    
                        return response()->json(['error' => $notification],406 );
                    }
                } else {
                    $message = $this->notify->where('id', 54)->first()->custom_text;
                    $notification =
                        $message;
                    return response()->json(['password' => $notification]);
                }
            } else {
                if($request->google){
                    $slug = Str::slug($request->name);
                    $user = User::create([
                        "name" => $request->name,
                        "slug" => $slug,
                        "email" => $request->email,
                        "image" => $request->image ? $request->image :  "uploads/profiles/default.jpg",
                        "verified" => $request->verified ? $request->verified :  false,
                        "password" => Hash::make($request->password),
                    ]);
                    Auth::guard("api")->login($user);
                    $message = $this->notify->where('id', 26)->first()->custom_text;
                    $notification = $message;
                      
                        
                    return response()->json(['success' => $notification,"user"=>Auth::user()]);
                   
                }else{
                    
                    $message = $this->notify->where('id', 35)->first()->custom_text;
                    $notification = $message;
                    return response()->json(["email" => $notification],406 );
                }
            }
        }catch (ValidationException $e) {
            // If validation fails, return the validation errors along with custom messages
            return response()->json(['error' => $e->errors()], 422);
        }
       
       
    }
    public function getUser(Request $request){
        return response()->json($request->user());
    }

    //Log out
    public function userLogOut(Request $request)
    {
        
        $authSession = Session::get("userAuth");
        // Session::remove("userAuth");
        \Log::info("user auth" .Auth::guard("sanctum")->user());
        // \Log::info("message: " .Session::get("message"));
        if(Auth::guard("sanctum")->user()){
           Auth::guard("sanctum")->logout();
        // $request->user()->tokens()->delete();
        
           return response()->json(["success"=>"Sign out successfully "]);
       } else{
        \Log::info(" no user auth" .Auth::guard("api")->user());
        return response()->json(["error"=>"No user To Log Out ","user"=> $authSession],406);

       }
    }
    //register:
    public function register(Request $request)
    {

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
             $request->validate($rules,$customMessage);

            $user = User::create([
                "name" => $request->name,
                "slug" => $slug,
                "email" => $request->email,
                "image" => $request->image ? $request->image :  "uploads/profiles/default.jpg",
                "verified" => $request->verified ? $request->verified :  false,
                "password" => Hash::make($request->password),
            ]);
            Auth::guard("web")->login($user);
            
            return response()->json(['success' =>"User Created Successfully"]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        }

       
       
    }
    public function forgetPassword (Request $request){
        $user = User::where("email",$request->email)->first();
        
         if ($user){
            $token = Str::random(30);
            $user->remember_token = $token;
            $user->save();
            Mail::to($user->email)->send(new ForgetPasswordMail($user));
            return response()->json(["success" => "Please Check Your Mail To Reset Your Password"]);
         }else{
            
            $message = $this->notify->where('id', 35)->first()->custom_text;
            return response()->json(["email" => $message],406);

         }
         
        
    }
    public function resetPassword($token){
        $user = User::where("remember_token","=" ,$token)->first();
        if(!empty($user)){
            return response()->json(["user" => $user], 200);
        }else{
            abort(404);
        }
        
    }
    public function postPassword($token,Request $request){
        \Log::info("request:" . json_encode( $request->all()));
        $rules = [

            "password" => "required|min:4",
            'confirmed_password' => 'required|same:password|min:4'

        ];
        $customMessage = [
            "password.required" => ValidationText::query()->where("id", 12)->first()->custom_text,
            "password.min" => ValidationText::query()->where("id", 35)->first()->custom_text,
            "confirmed_password.same"=>ValidationText::query()->where("id", 14)->first()->custom_text,
            
        ];
        

        try {
            $request->validate($rules, $customMessage);
             $user = User::where("remember_token","=" ,$token)->first();
        if(!empty($user)){
                $user->password = Hash::make($request->password);
                $user->remember_token = Str::random(30);
                $user->verified = true;
                $user->save();
                $message = $this->notify->where("id",13)->first()->custom_text;
                return response()->json(['success' =>$message]);
        }else{
            abort(404);
        }
          } 
         catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        }
    }
}