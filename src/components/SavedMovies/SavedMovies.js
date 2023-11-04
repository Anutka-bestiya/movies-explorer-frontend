import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies(props) {
  const [filtredSavedMovies, setFiltredSavedMovies] = React.useState([]);

  React.useEffect(() => {
    setFiltredSavedMovies(props.savedMovies);
  }, [props.savedMovies]);

  const handleSetFiltredSavedMovies = movies => {
    setFiltredSavedMovies(movies);
  };

  return (
    <main className='saved-movies movies' aria-label='Галерея фильмов'>
      <SearchForm
        movies={props.savedMovies}
        isShortCheckActive={props.isShortCheckActive}
        handleShortCheck={props.handleShortCheck}
        buttonText={props.buttonText}
        buttonTextProgress={props.buttonTextProgress}
        handleSetIsLoading={props.handleSetIsLoading}
        filtredMovies={filtredSavedMovies}
        handleSetFiltredMovies={handleSetFiltredSavedMovies}
      />
      <span className='movies__span'></span>
      <MoviesCardList
        onMovieLike={props.onMovieLike}
        onMovieDelete={props.onMovieDelete}
        views={props.views}
        movies={filtredSavedMovies}
        savedMovies={props.savedMovies}
        movieButtonClassName={props.movieButtonClassName}
        handleMoreClick={props.handleMoreClick}
        movieSaveButton={props.movieSaveButton}
        movieDislikeButton={props.movieDislikeButton}
      />
    </main>
  );
}

export default SavedMovies;
