<?php

namespace App\Models;

use App\Models\Role;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Member extends Model
{
    use HasFactory;
    protected $fillable = [
        "id","roleID","userID","teamID"
    ];
    public function team(){
        return $this->belongsTo(Team::class,"teamID");
    }
    public function user(){
        return $this->belongsTo(User::class,"userID");
    }
    public function role(){
        return $this->belongsTo(Role::class,"roleID");
    }
}