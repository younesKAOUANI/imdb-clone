<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\ActorController;

class AdminActorController extends ActorController
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'role:admin']);
    }
}