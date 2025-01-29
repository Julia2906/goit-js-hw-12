import axios from 'axios';

export const fetchPhotos = (searchedEl, currentPage) => {
  const params = new URLSearchParams({
    key: '48526932-1f92eeb7aeebeac44c662a956',
    q: searchedEl,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 15,
  });
  return axios.get(`https://pixabay.com/api/?${params}`, params);
};
