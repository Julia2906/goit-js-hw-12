import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchPhotos } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a');

const searchSubmit = event => {
  const loader = document.querySelector('.loader');
  event.preventDefault();

  const searchedEl = searchFormEl.elements[0].value.trim();

  if (searchedEl === '') {
    iziToast.error({
      title: '',
      message: 'Please enter your request',
      messageColor: '#fafafb',
      position: 'topRight',
      backgroundColor: '#ef4040',
    });

    return;
  }

  document.querySelector('.loader').classList.add('show-loader');

  fetchPhotos(searchedEl)
    .then(data => {
      if (data.total === 0) {
        iziToast.error({
          title: '',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#fafafb',
          position: 'topRight',
          backgroundColor: '#ef4040',
        });

        galleryEl.innerHTML = '';

        searchFormEl.reset();

        return;
      }

      const galleryTemplate = data.hits
        .map(el => createGalleryCardTemplate(el))
        .join('');

      galleryEl.innerHTML = galleryTemplate;
      lightbox.refresh();
    })

    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      loader.classList.remove('show-loader');
    });
};

searchFormEl.addEventListener('submit', searchSubmit);
