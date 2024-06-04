<?php

namespace App\Models;

use App\Models\Team;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    protected $fillable = ["id", "title", "team_id", "desc", "date_start", "date_end", "status","user_id"];
    use HasFactory;
    public function team(){
        return $this->belongsTo(Team::class,"team_id");
    }
    public function comments(){
        return $this->hasMany(Comment::class,"task_id");
    }
    public function user(){
       return $this->belongsTo(User::class, "user_id");
    }
}