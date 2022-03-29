import * as storage from '../services/localStorage';
import { isActive, getItems } from '../components/pagination';

function removeMovie(storageKey) {
  let arrayOfMovies = storage.get('moviesData') || [];

  if (isActive('[data-watched-btn]')) {
    arrayOfMovies = storage.get('watched') || [];
  } else if (isActive('[data-queue-btn]')) {
    arrayOfMovies = storage.get('queue') || [];
  }

  const id = Number(document.querySelector('[data-buttons]').id);
  const object = arrayOfMovies.find(movie => movie.id === id);
  const savedMovies = storage.get(storageKey) || [];

  for (const movie of savedMovies) {
    if (movie.id === object.id) {
      const updatedMovies = savedMovies.filter(movie => movie.id !== object.id) || [];
      storage.save(storageKey, updatedMovies);
      return;
    }
  }
}

function saveMovie(storageKey) {
  let arrayOfMovies = storage.get('moviesData') || [];

  if (isActive('[data-watched-btn]')) {
    arrayOfMovies = storage.get('watched') || [];
  } else if (isActive('[data-queue-btn]')) {
    arrayOfMovies = storage.get('queue') || [];
  }

  const id = Number(document.querySelector('[data-buttons]').id);
  const object = arrayOfMovies.find(movie => movie.id === id) || [];
  const savedMovies = storage.get(storageKey) || [];

  for (const movie of savedMovies) {
    if (movie.id === id) {
      return;
    }
  }

  savedMovies.unshift(object);
  storage.save(storageKey, savedMovies);
}

function addToWatched() {
  const watchedRef = document.querySelector('[data-watched]');
  if (watchedRef.classList.contains('current-btn')) {
    watchedRef.textContent = `Remove from watched`;
    watchedRef.classList.toggle('current-btn');
    return;
  }

  watchedRef.textContent = `Add to watched`;
  watchedRef.classList.toggle('current-btn');
}

function addToQueue() {
  const queueRef = document.querySelector('[data-queue]');
  if (queueRef.classList.contains('current-btn')) {
    queueRef.textContent = `Remove from watched`;
    queueRef.classList.toggle('current-btn');
    return;
  }

  queueRef.textContent = `Add to watched`;
  queueRef.classList.toggle('current-btn');
}

export { addToWatched, addToQueue, saveMovie, removeMovie };
