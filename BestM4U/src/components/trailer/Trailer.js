import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Trailer.css';

const Trailer = () => {
  const { ytTrailerId: key } = useParams();

  const watchUrl = key ? `https://www.youtube.com/watch?v=${key}` : null;
  const thumbnail = key ? `https://img.youtube.com/vi/${key}/hqdefault.jpg` : null;

  const openOnYouTube = () => {
    if (!watchUrl) return;
    try {
      window.open(watchUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      // fallback: navigate in same tab
      window.location.href = watchUrl;
    }
  };
  const [showPlayer, setShowPlayer] = useState(false);
  const openEmbeddedPlayer = () => setShowPlayer(true);

  return (
    <Container className="trailer-page">
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-sm trailer-card">
            <Card.Body>
              <div className="trailer-header">
                <h2 className="mb-1">Trailer</h2>
                <p className="text-muted">Watch the trailer on YouTube</p>
              </div>

              <div className="trailer-hero">
                {thumbnail && <div className="bg-image" style={{backgroundImage: `url(${thumbnail})`}} />}
                <div className="hero-content">
                  <div className="thumbnail-card">
                    <div className="thumbnail-wrap" onClick={openEmbeddedPlayer} role="button" aria-label="Play trailer">
                      {thumbnail ? (
                        <img className="thumbnail-img" src={thumbnail} alt="trailer thumbnail" />
                      ) : (
                        <div className="thumbnail-placeholder" />
                      )}
                      <div className="play-overlay" aria-hidden>▶</div>
                    </div>
                  </div>

                  
              {showPlayer && (
                <div className="embed-area mt-4">
                  <div className="video-embed">
                    <iframe
                      title="YouTube trailer"
                      src={`https://www.youtube.com/embed/${key}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Trailer;