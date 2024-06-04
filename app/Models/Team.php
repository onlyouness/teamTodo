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
        "id","project_id","name"
    ];
    use HasFactory;
    public function project(){
        return $this->belongsTo(Project::class,"project_id");
    }
    public function members(){
        return $this->hasMany(Member::class,"team_id");
    }
    public function tasks(){
        return $this->hasMany(Task::class,"team_id");
    }
}