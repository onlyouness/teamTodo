<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\Member;
use Illuminate\Http\Request;

class MembersController extends Controller
{
    //
    public function memberByTeam ($id){
        $members = Member::where("team_id",$id)->with("user","role")->get();
        \Log::info("members".$members);
        return response()->json(["members" => $members]);
        
    }
}