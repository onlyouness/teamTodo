<?php

use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use Tymon\JWTAuth\JWTAuth;
// use JWTAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\LoginController;
use Tymon\JWTAuth\Exceptions\JWTException;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    \Log::info("api/user done");
    return $request->user();
});
// Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::get("/me",[LoginController::class,"getUser"]);
//   });
Route::get("/hello", function () {
    return response()->json(["success"=>"Hello"]);
});

Route::get("/logout",[LoginController::class,"userLogOut"]);

Route::post("/login",[LoginController::class,"login"]);
Route::post("/register",[LoginController::class,"register"]);
Route::post("/forget-password",[LoginController::class,"forgetPassword"]);
Route::get("/reset/{token}", [LoginController::class, "resetPassword"]);
Route::post("/confirm-reset/{token}", [LoginController::class, "postPassword"]);
// Route::get("/logout",[LoginController::class,"userLogOut"]);
Route::get("user", function () {
    $user = Auth::guard("web")->user();
    
    if ($user) {
        return response()->json(["User Data" => $user]);
    } else {
        return response()->json(["error" => "Unauthenticated"], 401);
    }
})->withoutMiddleware('auth:api'); // Applying auth middleware to protect the route
// Route::get("/member", function () {
//     // $team = Team::where("id",1)->first();
//     // \Log::info("member".$team->members);
//     // $formattedDate = Carbon::parse($request->date)->format('Y-m-s');
//     // return "ok";
//     $user = Task::find(2);
//     return $user->comments;
// });
Route::get("/member", function () {

    // $user = Task::where("userID",1)->get();
    $user = Team::first();
    \Log::info("member".$user->tasks);
    return response()->json(["tasks"=>$user->tasks,"teams"=>$user]);
});
Route::post("create_team", [TeamController::class, "createTeam"]);
Route::post("create_task", [TeamController::class, "createTask"]);
Route::post("create_comment", [TeamController::class, "createComment"]);