<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRealisateursTable extends Migration
{
    public function up()
    {
        Schema::create('realisateurs', function (Blueprint $table) {
            $table->id();
            $table->string('fistName');
            $table->string('lastName');
            $table->date('birthDate');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('realisateurs');
    }
}