import api from './ApiService';
import notFoundImg from '../img/not_found_ver.jpg';
import * as storage from './localStorage';
import { renderPagination } from '../components/pagination';
import openModal from '../components/modal-movie';

const refs = {
  list: document.querySelector('.movies'),
  spinner: document.querySelector('.spinner'),
};

onLoading().then(renderPagination);

async function onLoading() {
  try {
    refs.spinner.classList.remove('visually-hidden');
    api.searchQuery = '';
    const movies = await api.fetchTrendingMovies();
    storage.save('totalPages', movies.total_pages);
    const moviesDatalist = prepareData(movies.results);

    storage.save('moviesData', moviesDatalist);
    makeMovieList(moviesDatalist);
    refs.spinner.classList.add('visually-hidden');
    refs.list.addEventListener('click', openModal);
  } catch (error) {
    handleError(error);
  }
}

function handleError(error) {
  resetView();
  console.log(error.message);
}

function resetView() {
  api.resetPage();
  refs.list.innerHTML = '';
}

function prepareData(moviesList) {
  const allGenres = storage.get('genres');
  return moviesList.map(res => {
    const {
      id,
      title,
      original_title,
      poster_path,
      genre_ids,
      name,
      first_air_date,
      release_date,
      vote_average,
      vote_count,
      overview,
      popularity,
    } = res;
    const genres =
      genre_ids
        ?.filter(id => allGenres[id])
        .map(id => allGenres[id])
        .join(', ') || 'Genres are not specified';
    const filmTitle = title || name;
    const year = new Date(release_date || first_air_date).getFullYear() || '';
    const poster = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : notFoundImg;
    let rating = '0.0';
    if (vote_average) {
      rating = vote_average === 10 ? '10.0' : String(vote_average).padEnd(3, '.0');
    }

    return {
      id,
      filmTitle,
      original_title,
      poster,
      genres,
      year,
      rating,
      overview,
      vote_count,
      popularity,
    };
  });
}

function makeMovieList(array) {
  const markup = array
    .map(movieData => {
      return renderCard(movieData);
    })
    .join('');
  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', markup);
}

function renderCard({ filmTitle, poster, genres, year, rating, id }) {
  return ` <li id='${id}' class="movies__item">
      <a href="" class="movies__link">
        <img class="movies__img" src="${poster}" alt="${filmTitle}">
        <div class="movies__wrapper">
          <h2 class="movies__name">${filmTitle}</h2>
          <div class="movies__wrapper--data">
            <span class="movies__genre">${genres}</span>
            <span class="movies__year">${year}</span>
            <span class="movies__rating">${rating}</span>
          </div>
        </div>
      </a>
    </li>
  `;
}

export { onLoading, makeMovieList, resetView, prepareData, renderCard };
