<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('actors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('birthdate')->nullable();
            $table->text('bio')->nullable();
            $table->string('photo')->nullable();
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('actors');
    }
}; 