<?php

namespace App\Notifications;

use App\Models\Review;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewReview extends Notification implements ShouldQueue
{
    use Queueable;

    protected $review;

    public function __construct(Review $review)
    {
        $this->review = $review;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('New Review on Your Movie')
            ->line('You have received a new review on your movie: ' . $this->review->movie->title)
            ->line('Rating: ' . $this->review->rating . '/5')
            ->line('Review: ' . $this->review->content)
            ->action('View Review', url('/movies/' . $this->review->movie_id . '#review-' . $this->review->id))
            ->line('Thank you for using our application!');
    }

    public function toArray($notifiable)
    {
        return [
            'review_id' => $this->review->id,
            'movie_id' => $this->review->movie_id,
            'movie_title' => $this->review->movie->title,
            'user_name' => $this->review->user->name,
            'rating' => $this->review->rating,
            'content' => $this->review->content
        ];
    }
} 