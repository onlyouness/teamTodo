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
        "id","role_id","user_id","team_id"
    ];
    public function team(){
        return $this->belongsTo(Team::class,"team_id");
    }
    public function user(){
        return $this->belongsTo(User::class,"user_id");
    }
    public function role(){
        return $this->belongsTo(Role::class,"role_id");
    }
}