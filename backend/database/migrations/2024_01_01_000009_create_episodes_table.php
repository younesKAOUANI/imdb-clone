<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('episodes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('movie_id')->constrained('movies')->onDelete('cascade');
            $table->integer('season');
            $table->integer('episode_number');
            $table->string('title');
            $table->text('description')->nullable();
            $table->integer('runtime')->nullable();
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('episodes');
    }
}; 