import api from './ApiService';
import * as storage from './localStorage';
import { prepareData, makeMovieList } from './movieList';
import { renderPagination } from '../components/pagination';

const refs = {
  searchForm: document.querySelector('.search__form'),
  searchBtn: document.querySelector('.search__btn'),
  input: document.querySelector('.search__input'),
  list: document.querySelector('.movies'),
  error: document.querySelector('.search__fail'),
  spinner: document.querySelector('.spinner'),
};

let inputValue = '';

refs.searchForm.addEventListener('submit', searchFilms);

async function searchFilms(e) {
  e.preventDefault();
  api.resetPage();

  inputValue = refs.input.value.trim();
  api.searchQuery = inputValue;
  if (!inputValue) {
    return;
  }

  await loadMoviesByKeyWord();
  renderPagination();
}

async function loadMoviesByKeyWord() {
  try {
    refs.spinner.classList.remove('visually-hidden');
    const movies = await api.fetchMovieByKeyword();
    if (!movies.results.length) {
      refs.spinner.classList.add('visually-hidden');
      refs.error.textContent = 'Search result not successful. Enter the correct movie name';
      return;
    }

    const moviesDatalist = prepareData(movies.results);
    storage.save('totalPages', movies.total_pages);
    storage.save('moviesData', moviesDatalist);
    refs.list.innerHTML = '';
    refs.error.textContent = '';
    makeMovieList(moviesDatalist);
    refs.spinner.classList.add('visually-hidden');
  } catch (error) {
    console.error(error);
    api.resetPage();
  }
}

export { loadMoviesByKeyWord, inputValue };
