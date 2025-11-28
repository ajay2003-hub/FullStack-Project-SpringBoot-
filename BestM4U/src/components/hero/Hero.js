import './Hero.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Hero = ({ movies = [] }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    console.log('Hero movies prop:', movies);
    if (movies && movies.length) setSelected(movies[0]);
  }, [movies]);

  useEffect(() => {
    console.log('Hero selected:', selected);
  }, [selected]);

  // helper to pick poster fields used by your API
  const getPoster = (m) => m?.poster || m?.poster_path || m?.posterUrl || m?.image || m?.thumbnail || '';

  const posterSrc = getPoster(selected) || '/placeholder.png';
  const backdropSrc = (selected?.backdrops && selected.backdrops[0]) || selected?.backdrop || '';

  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }

  function goToTrailer(link) {
    if (!link) return;
    const id = link.substring(link.length - 11);
    navigate(`/Trailer/${id}`);
  }

  return (
    <div className="hero-root">
      <div
        className="hero-main"
        style={{ backgroundImage: backdropSrc ? `url(${backdropSrc})` : undefined }}
      >
        <div className="hero-overlay">
          <div className="hero-left">
            <div className="hero-poster">
              {selected ? (
                <img src={posterSrc} alt={selected.title || 'poster'} onError={(e)=>{e.currentTarget.src='/placeholder.png'}}/>
              ) : (
                <img src="/placeholder.png" alt="placeholder" />
              )}
            </div>
          </div>

          <div className="hero-right">
            <h1 className="hero-title">{selected?.title}</h1>
            <div className="hero-actions">
              <Button variant="light" className="hero-play" onClick={() => goToTrailer(selected?.trailerLink)}>
                <FontAwesomeIcon icon={faCirclePlay} /> Watch Trailer
              </Button>
              <Button variant="info" className="hero-reviews" onClick={() => reviews(selected?.imdbId)}>
                Reviews
              </Button>
            </div>
            <p className="hero-overview">{selected?.overview}</p>
          </div>
        </div>

        {/* centered thumbnails strip - moved inside hero-main so it overlays the background */}
        <div className="hero-thumbs-wrap" aria-hidden={false}>
          <div className="hero-thumbs">
            {movies?.map((m) => {
              const active = selected && selected.imdbId === m.imdbId;
              const thumbSrc = getPoster(m) || '/placeholder.png';
              return (
                <button
                  key={m.imdbId ?? m.id ?? m.title}
                  className={`thumb-btn ${active ? 'active' : ''}`}
                  onClick={() => setSelected(m)}
                  aria-label={`Show ${m.title}`}
                  type="button"
                >
                  <img src={thumbSrc} alt={m.title} onError={(e)=>{e.currentTarget.src='/placeholder.png'}} />
                  
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;