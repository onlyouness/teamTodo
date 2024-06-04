<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'date_fin',"owner_id"];
    public function sprints(){
        return $this->hasMany(Sprint::class);
    }
    public function owner (){
        return $this->belongsTo(User::class, "owner_id");
    } 
    public function teams (){
        return $this->hasMany(Team::class);
    }
}