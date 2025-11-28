import {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react'

const Reviews = ({getMovieData,movie,reviews = [],setReviews = () => {}}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(()=>{
        getMovieData(movieId);
    },[movieId])

    const addReview = async (e) =>{
        e.preventDefault();

        const rev = revText.current;
        if(!rev || !rev.value){
            return;
        }

        const endpoint = "/api/v1/reviews";
        const payload = { reviewBody: rev.value, imdbId: movieId };

        const token = localStorage.getItem('authToken');
        try {
            const response = await api.post(endpoint, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const base = Array.isArray(reviews) ? reviews : [];
            const updatedReviews = [...base, { body: rev.value }];

            rev.value = "";

            setReviews(updatedReviews);
        } catch (err) {
            // Log error for debugging review submission failures
            // eslint-disable-next-line no-console
            console.error('Review submit error:', err?.response?.data || err?.message || err);
        }
    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <React.Fragment>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </React.Fragment>
                }
                {
                    reviews?.map((r, idx) => {
                        const key = r.id ?? `${r.body}-${idx}`;
                        return(
                            <React.Fragment key={key}>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </React.Fragment>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

export default Reviews