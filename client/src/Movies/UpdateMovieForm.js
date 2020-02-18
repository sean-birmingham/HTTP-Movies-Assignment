import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const UpdateMovieForm = props => {
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        setMovie(res.data);
      })
      .catch(err => console.log(err));
  }, [props.match.params.id]);

  const handleChange = e => {
    e.persist();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const movieUpdate = {
      ...movie,
      stars: movie.stars.split(', ')
    };
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movieUpdate)
      .then(res => {
        props.history.push(`/movies/${movie.id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <h1>Update Movie</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type='text'
          name='title'
          onChange={handleChange}
          value={movie.title}
        />
        <label>Director:</label>
        <input
          type='text'
          name='director'
          onChange={handleChange}
          value={movie.director}
        />
        <label>Metascore:</label>
        <input
          type='text'
          name='metascore'
          onChange={handleChange}
          value={movie.metascore}
        />
        <label>Actors:</label>
        <input
          type='text'
          name='stars'
          onChange={handleChange}
          value={movie.stars}
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

export default UpdateMovieForm;
