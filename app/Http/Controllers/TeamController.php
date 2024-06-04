<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Team;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Models\ValidationText;
use App\Models\NotificationText;
use Illuminate\Validation\ValidationException;

class TeamController extends Controller
{
    //
    public function createTeam(Request $request){
        $rules = [
            'name' => "required",
            "project_id"=>"required"


        ];
        $customMessage = [
            'name.required' => ValidationText::query()->where("id", 4)->first()->custom_text,
            'project_id.required' => ValidationText::query()->where("id", 217)->first()->custom_text,

        ];
        // \Log::info("request",$request->all());
     

    
        try {
             $request->validate($rules, $customMessage);

            $user = Team::create([
                "name" => $request->name,
                "projectID" => $request->project_id,
                
            ]);

           
            $message = NotificationText::where("id", 9)->first()->custom_text;
            $notification = [
                $message,
                "success"
            ];

            return response()->json(['success' => $notification]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        }
    }

    public function index(){
       $teams = Team::all();
        return response()->json(["teams"=>$teams]);
    }
    public function teambyProject($id){
       $teams = Team::where("project_id",$id)->get();
        return response()->json(["teams"=>$teams]);
    }
   
    public function createComment(Request $request){
        $rules = [
            'content' => "required",
            "user_id"=>"required",
            "task_id"=>"required",


        ];
        $customMessage = [
            'content.required' => ValidationText::query()->where("id", 10)->first()->custom_text,

        ];
        // \Log::info("request",$request->all());
     

    
        try {
             $request->validate($rules, $customMessage);

            Comment::create([
                "content" => $request->content,
                "userID" => $request->user_id,
                "taskID"=>$request->task_id,
             
                
            ]);

           
            $message = NotificationText::where("id", 9)->first()->custom_text;
            $notification = [
                $message,
                "success"
            ];

            return response()->json(['success' => $notification]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        }
    }
}