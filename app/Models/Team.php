<?php

namespace App\Models;

use App\Models\Task;
use App\Models\Member;
use App\Models\Project;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Team extends Model
{
    protected $fillable = [
        "id","projectID","name"
    ];
    use HasFactory;
    public function project(){
        return $this->belongsTo(Project::class,"projectID");
    }
    public function members(){
        return $this->hasMany(Member::class,"teamID");
    }
    public function tasks(){
        return $this->hasMany(Task::class,"teamID");
    }
}