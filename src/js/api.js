// js/api.js

import axios from 'axios';

export async function getPopularFilms(page) {
  const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day';

  const options = {
    params: {
      api_key: '352708f90836dd2b75b209ae082e91df',
      page: page,
    },
  };

  try {
    let { data } = await axios.get(BASE_URL, options);
    return data;
  } catch (error) {
    console.log(error);
  }
}
