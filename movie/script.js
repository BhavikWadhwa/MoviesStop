const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// we are getting the initial api's from here
getMovies(API_URL)


// here we asynchronously fetche movie data from the URL using the Fetch API
async function getMovies(url) {
    const res = await fetch(url)//we make a GET req here 
    const data = await res.json()//we wait for the response to come and then pass it to the json to extract the data

    showMovies(data.results)//stores the data after fetching and mskes ready for display
}



//displaying the data starts from here

function showMovies(movies) {//firstlu we clear the content that is stored in main, then we itertate through the array of movies
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie//array here

        const movieEl = document.createElement('div')//it dynamically creates the html elements such as div and span etc for us
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)// in the end it appends these elemnets in the main conatainer
    })
}

function getClassByRate(vote) {//just for the css of the box containing the rating of movies, to come as red orange or green
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'//the css is in the external file
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value//we retriev what the user enetered in the feild

    if (searchTerm && searchTerm !== '') {//then we call the getmovies function with the search api with the seasrterm being concatinated inside it
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()//if the term is empty the page reloads
    }
})