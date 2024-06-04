<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //
    public function store(Request $request){
        $user = $request->user();
        $comment = new Comment();
        $comment->user_id = $user->id;
        $comment->content = $request->newItem['content'];
        $comment->task_id = $request->newItem['task_id'];
        $comment->save();
        $comments = Comment::where("task_id", $request->newItem['task_id'])->with("user")->get();
        return response()->json(["comments"=>$comments]);
        
    }
}