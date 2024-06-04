<?php

namespace App\Http\Controllers;

use App\Models\Sprint;
use Carbon\Carbon;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = $request->user();
        $query = Project::with("sprints.tasks", 'owner')->where("owner_id", $user->id);
        if ($request->search !== "null") {
            $query->where("name", "like", "%$request->search%")->orWhere("description", "like", "%$request->search%");
        }
        $projects = $query->orderBy("id", "desc")->get();
        return response()->json(["success" => $projects]);

    }
    public function edit(Project $project)
    {
        return response()->json(["success" => $project]);
    }
    public function update(Request $request, Project $project)
    {
        $dateFin = Carbon::parse($request->date_fin)->format('Y-m-d H:i:s');
        $request->validate([
            "name" => "required",
            "description" => "required|max:300",
        ]);
        $project->name = $request->name;
        $project->description = $request->description;
        $project->date_fin = $dateFin;
        $project->save();
        return response()->json(["success" => $project]);
    }
    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(["success" => $project]);
    }
    public function store(Request $request)
    {
        $dateFin = Carbon::parse($request->newItem["date_fin"])->format('Y-m-d H:i:s');
        $user = $request->user();
        $project = new Project();
        $project->name = $request->newItem['name'];
        $project->description = $request->newItem['description'];
        $project->date_fin = $dateFin;
        $project->owner_id = $user->id;
        $project->save();
        return response()->json(["success" => "Project Added Successfully"]);

    }
    public function show(Project $project)
    {
        $progress = 0;
        $projectWithSprints = $project->load("owner", "sprints.tasks.user", "sprints.tasks.team", "sprints.tasks.comments.user", "teams.tasks");
        $completedSprintsCheck = count($projectWithSprints->sprints()->where("status", 1)->get());
        if ($completedSprintsCheck > 0) {
            $completedSprints = count($projectWithSprints->sprints()->where("status", 1)->get());
            $sprintsCount = count($projectWithSprints->sprints()->get());
            $progress = intval(($completedSprints / $sprintsCount) * 100);
        }

        //check for the status complete
        $sprints = Sprint::with("tasks")->get();
        foreach ($sprints as $sprint) {
            $totalTasks = count($sprint->tasks);
            if ($totalTasks != 0) {
                $completed = count($sprint->tasks->where("status", "Completed"));
                if ($completed === $totalTasks) {
                    $sprint->status = 1;
                    $sprint->save();
                } else {
                    $sprint->status = 0;
                    $sprint->save();
                }
            }
        }

        return response()->json(["success" => $projectWithSprints, "progress" => $progress]);
    }
}