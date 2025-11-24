package dev.ajykumar.movieist.service;

import dev.ajykumar.movieist.repo.MovieRepository;
import dev.ajykumar.movieist.utility.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies(){
        return movieRepository.findAll();
    }

//    public Movie getMovieById(ObjectId id){
//        return movieRepository.findById(id).orElse(null);
//    }

    public Optional<Movie> getSingleMovieByImdbId(String imdbId){
        return movieRepository.findByImdbId(imdbId);

    }
}
