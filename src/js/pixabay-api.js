export const fetchPhotos = searchedQuery => {
  const params = new URLSearchParams({
    key: '48526932-1f92eeb7aeebeac44c662a956',
    q: searchedQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return fetch(`https://pixabay.com/api/?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
