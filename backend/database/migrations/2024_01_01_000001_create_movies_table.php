<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->year('release_year')->nullable();
            $table->integer('runtime')->nullable();
            $table->string('director')->nullable();
            $table->string('trailer_link')->nullable();
            $table->string('poster_image')->nullable();
            $table->string('cover_image')->nullable();
            $table->enum('type', ['movie', 'series']);
            $table->float('rating_avg')->default(0);
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('movies');
    }
}; 