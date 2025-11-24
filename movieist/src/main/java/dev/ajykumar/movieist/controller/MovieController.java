package dev.ajykumar.movieist.controller;

import dev.ajykumar.movieist.service.MovieService;
import dev.ajykumar.movieist.utility.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1/movies")
public class MovieController {
    @Autowired
    private MovieService movieService;

    @GetMapping
    public ResponseEntity<List<Movie>> getMovies() {
        List<Movie> movies = movieService.getAllMovies();
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Movie> getSingleMovie(@PathVariable ObjectId id){
//        Movie movie= movieService.getMovieById(id);
//        if(movie==null){
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        return new ResponseEntity<>(movie, HttpStatus.OK);
//    }

    @GetMapping("/{imdbId}")
    public ResponseEntity<Movie> getMovieByImdbId(@PathVariable String imdbId){
        Optional<Movie> movie = movieService.getSingleMovieByImdbId(imdbId);
        return movie.map(m -> new ResponseEntity<>(m, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));

    }
}
