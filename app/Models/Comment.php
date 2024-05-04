<?php

namespace App\Models;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = ["id", "content", "taskID", "userID"];
    public function task(){
        return $this->belongsTo(Task::class,"taskID");
    }
    public function user(){
        return $this->belongsTo(User::class,"userID");
    }
}