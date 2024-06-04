<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\MembersController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SprintController;
use App\Http\Controllers\TaskController;
use App\Models\Sprint;
use App\Models\Task;
use App\Models\Team;
use App\Models\Test;
use App\Models\User;
// use JWTAuth;
use Tymon\JWTAuth\JWTAuth;
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

Route::post("/login-google",[LoginController::class,"loginGoogle"]);
Route::post("/register-google",[LoginController::class,"registerGoogle"]);

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



//teams
Route::post("create_team", [TeamController::class, "createTeam"]);
Route::get("/teams", [TeamController::class, "index"]);
Route::get("/teams/{id}", [TeamController::class, "teambyProject"]);
Route::delete("delete/{team}", function (Team $team) {
    $team->delete();
    return response()->json("ok");
});

//tasks
Route::post("/create_task", [TaskController::class, "createTask"]);
Route::get("/get_tasks", [TaskController::class, "getTasks"]);
Route::get("/tasks/{task}", [TaskController::class, "show"]);
Route::put("task-status/{task}", [TaskController::class, "updateStatus"]);
Route::put("/task-priority/{task}", [TaskController::class, "updatePriority"]);
Route::post("create_comment", [TeamController::class, "createComment"]);
Route::put("/tasks/{task}", [TaskController::class, "edit"]);

//project Route 
Route::get('/projects', [ProjectController::class, "index"]);
Route::get('/projects/{project}/project', [ProjectController::class, "show"]);
Route::get("/projects/{project}", [ProjectController::class, "edit"]);
Route::put("/projects/{project}", [ProjectController::class, "update"]);
Route::delete("/projects/{project}", [ProjectController::class, "destroy"]);
Route::post("/projects/add", [ProjectController::class, "store"]);


// Comments Routes
Route::post("/comments", [CommentController::class, "store"]);

//Sprint Routes
Route::post("/sprints", [SprintController::class, "store"]);

//members Routes:
Route::get("/members/{id}", [MembersController::class, "memberByTeam"]);