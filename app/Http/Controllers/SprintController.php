<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Sprint;
use Illuminate\Http\Request;
use App\Models\NotificationText;
use Illuminate\Validation\ValidationException;

class SprintController extends Controller
{
    //
    public function store(Request $request)
    {
        $dateFin = Carbon::parse($request->newItem["date_fin"])->format('Y-m-d H:i:s');
        try {
            $sprint = new Sprint();
            $sprint->title = $request->newItem['title'];
            $sprint->status = 0;
            $sprint->date_fin = $dateFin;
            $sprint->project_id = $request->newItem["project_id"];
            $sprint->save();
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