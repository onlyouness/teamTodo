<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Task;
use App\Models\Assign;
use Illuminate\Http\Request;
use App\Models\ValidationText;
use App\Models\NotificationText;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;

class TaskController extends Controller
{
    //
    public function createTask(Request $request)
    {

        $dateFin = Carbon::parse($request->newItem["date_end"])->format('Y-m-d H:i:s');
        $dateStart = Carbon::parse($request->newItem["date_start"])->format('Y-m-d H:i:s');



        try {


            $task = new Task();
            $task->title = $request->newItem['title'];
            $task->desc = $request->newItem['desc'];
            $task->status = $request->newItem['status'];
            $task->priority = $request->newItem['priority'];
            $task->date_end = $dateFin;
            $task->date_start = $dateStart;
            $task->team_id = $request->newItem['team'];
            $task->sprint_id = $request->newItem['sprint'];
            $task->user_id = $request->newItem["user"];
            $task->save();


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
    public function getTasks(Request $request)
    {
        $user = $request->user();
        $query = Task::where("user_id", $user->id)->with(["team.project", "comments"]);

        if ($request->status !== "null") {
            $query->where("status", $request->status);
        }
        if ($request->priority !== "null") {
            $query->where("priority", $request->priority);
        }
        if ($request->search !== "null") {
            $query->where("title", "like", "%$request->search%");
        }
        if ($request->date !== "null") {
            if ($request->date == "Overdue") {
                $query->where("date_end", '<', date("Y-m-d"));
            } else if ($request->date === "Due") {
                $query->where("date_end", '>=', date("Y-m-d"));
            }
        }

        $tasks = $query->paginate(6);
        return response()->json(['success' => $tasks]);
    }
    public function updateStatus(Task $task, Request $request)
    {
        if ($task) {
            $task->status = $request->status;
            $task->save();
        }
        return response()->json(['success' => "successfully changed"]);

    }
    public function updatePriority(Task $task, Request $request)
    {
        if ($task) {
            $task->priority = $request->priority;
            $task->save();
        }
        return response()->json(['success' => "successfully changed"]);

    }
    public function edit(Task $task,Request $request){
        $dateFin = Carbon::parse($request->date_end)->format('Y-m-d H:i:s');
        $dateStart = Carbon::parse($request->date_start)->format('Y-m-d H:i:s');

        $task->title = $request->title;
            $task->desc = $request->desc;
            $task->status = $request->status;
            $task->priority = $request->priority;
            $task->date_end = $dateFin;
            $task->date_start = $dateStart;
            $task->team_id = $request->team;
            $task->save();
        return response()->json(['success' => "successfully changed"]);

    }
    public function show(Task $task){
       $task->load("team");
        return response()->json(['success' => $task]);

    }
}