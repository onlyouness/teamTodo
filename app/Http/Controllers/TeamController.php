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
        \Log::info("request",$request->all());
     

    
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
    public function createTask(Request $request){
        $rules = [
            'title' => "required",
            "date_start"=>"required",
            "team_id"=>"required",


        ];
        $customMessage = [
            'title.required' => ValidationText::query()->where("id", 18)->first()->custom_text,
            'date_start.required' => ValidationText::query()->where("id", 32)->first()->custom_text,

        ];
        \Log::info("request",$request->all());
     

    
        try {
             $request->validate($rules, $customMessage);

            Task::create([
                "title" => $request->title,
                "teamID" => $request->team_id,
                "date_start"=>$request->date_start,
                "date_end"=>$request->date_end,
                "status"=>"in process",
                
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
    public function createComment(Request $request){
        $rules = [
            'content' => "required",
            "user_id"=>"required",
            "task_id"=>"required",


        ];
        $customMessage = [
            'content.required' => ValidationText::query()->where("id", 10)->first()->custom_text,

        ];
        \Log::info("request",$request->all());
     

    
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