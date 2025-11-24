package dev.ajykumar.movieist.controller;

import dev.ajykumar.movieist.service.ReviewService;
import dev.ajykumar.movieist.utility.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping()
    public ResponseEntity<Review> giveReview(@RequestBody Map<String,String> payload){
        String reviewBody= payload.get("reviewBody");
        String imdbId= payload.get("imdbId");
        Review review= reviewService.createReview(reviewBody,imdbId);
        return new ResponseEntity<>(review, HttpStatus.CREATED);

    }
}
