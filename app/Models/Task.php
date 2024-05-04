<?php

namespace App\Models;

use App\Models\Team;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    protected $fillable = ["id", "title", "teamID", "desc", "date_start", "date_end", "status"];
    use HasFactory;
    public function team(){
        return $this->belongsTo(Team::class,"teamID");
    }
    public function comments(){
        return $this->hasMany(Comment::class,"taskID");
    }
}