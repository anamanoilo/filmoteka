import * as storage from '../services/localStorage';
import { isActive, getItems } from '../components/pagination';

function saveMovie(storageKey, e) {
  const arrayOfMovies = storage.get('moviesData');
  const id = Number(document.querySelector('[data-buttons]').id);
  const object = arrayOfMovies.find(movie => movie.id === id);
  const savedMovies = storage.get(storageKey) || [];

  for (const movie of savedMovies) {
    if (movie.id === object.id) {
      const updatedMovies = savedMovies.filter(movie => movie.id !== object.id);
      storage.save(storageKey, updatedMovies);
      e.target.textContent = `Add to ${storageKey}`;
      return;
    }
  }

  savedMovies.unshift(object);
  storage.save(storageKey, savedMovies);
  e.target.textContent = `Remove from ${storageKey}`;
}

function addToWatched(e) {
  saveMovie('watched', e);
  e.target.classList.toggle('current-btn');

  if (isActive('[data-watched-btn]')) {
    getItems('watched');
  }
}

function addToQueue(e) {
  saveMovie('queue', e);
  e.target.classList.toggle('current-btn');

  if (isActive('[data-queue-btn]')) {
    getItems('queue');
  }
}

export { addToWatched, addToQueue };
