<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sprint extends Model
{
    use HasFactory;
    protected $fillable = ["id", "title", "date_fin", 'status', "project_id"];
    public function project (){
      return  $this->belongsTo(Project::class, "project_id");
    }
    public function tasks()
    {
        return $this->hasMany(Task::class, "sprint_id");
    }
}