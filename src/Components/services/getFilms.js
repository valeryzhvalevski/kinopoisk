export async function getFilms() {
    const resp = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1', {
        method: 'GET',
        headers: {
            'X-API-KEY': 'db642015-a328-4ea4-a9ef-fd75eeeba383',
            'Content-Type': 'application/json',
        },
    })
    const films = await resp.json();
    return films;
  }