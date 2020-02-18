import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  routeToUpdate = e => {
    e.persist();
    e.preventDefault();
    this.props.history.push(`/update-movie/${this.state.movie.id}`);
  };

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        this.props.history.push('/');
      });
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className='save-wrapper'>
        <MovieCard movie={this.state.movie} />
        <div className='save-button' onClick={this.saveMovie}>
          Save
        </div>
        <button onClick={this.routeToUpdate}>Edit Movie</button>
        <button onClick={this.deleteMovie}>Delete Movie</button>
      </div>
    );
  }
}
