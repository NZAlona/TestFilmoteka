const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = '1c67da1e2ce4e2be2e43d73ee3e7d35c';
const IMAGES_BASE_URL = 'https://www.themoviedb.org/t/p/w220_and_h330_face';

const gallery = document.querySelector('.home-gallery');

async function fetchMovie() {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${KEY}`
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw new Error(error.statusText);
  }
}

const result = fetchMovie().then(data => {
  const markup = renderMoviePics(data.results);
  gallery.insertAdjacentHTML('beforeend', markup);
  console.log(markup);
});

function renderMoviePics(results = []) {
  return results
    .map(
      ({
        title,
        genre_ids,
        vote_average,
        poster_path,
        release_date,
      }) => `<div class="movie-card">
  <img src="${
    IMAGES_BASE_URL + poster_path
  }" alt="Film${title}" loading="lazy" width ="395"/>
  <div class="info">
    <p>${title}</p>
    <p>${genre_ids}</p>
   <span>|</span>
    <p>${release_date}</p>
    <p>${vote_average}</p>
  </div>
</div>`
    )
    .join('');
}
