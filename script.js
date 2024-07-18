document.addEventListener('DOMContentLoaded', () => {
    const filmsList = document.getElementById('films');
    const movieDetails = document.getElementById('movie-details');
    const buyTicketButton = document.getElementById('buy-ticket');

    let currentMovie;
    let movies = [];

    function fetchMovies() {
        fetch('db.json')
            .then(response => response.json())
            .then(data => {
                movies = data.films;
                populateMovieList();
            })
            .catch(error => console.error('Error fetching movies:', error));
    }

    function populateMovieList() {
        movies.forEach(movie => {
            const li = document.createElement('li');
            li.textContent = movie.title;
            li.classList.add('film', 'item');
            li.addEventListener('click', () => loadMovieDetails(movie.id));
            filmsList.appendChild(li);
        });
        // Load the first movie by default
        loadMovieDetails(movies[0].id);
    }

    function loadMovieDetails(id) {
        currentMovie = movies.find(movie => movie.id === id);
        updateMovieDetails();
    }

    function updateMovieDetails() {
        const availableTickets = currentMovie.capacity - currentMovie.tickets_sold;

        document.getElementById('poster').src = currentMovie.poster;
        document.getElementById('poster').alt = `${currentMovie.title} Poster`;
        document.getElementById('title').textContent = currentMovie.title;
        document.getElementById('runtime').textContent = `Runtime: ${currentMovie.runtime} minutes`;
        document.getElementById('showtime').textContent = `Showtime: ${currentMovie.showtime}`;
        document.getElementById('available-tickets').textContent = `Available Tickets: ${availableTickets}`;
        document.getElementById('description').textContent = currentMovie.description;

        buyTicketButton.disabled = availableTickets === 0;
        buyTicketButton.textContent = availableTickets === 0 ? 'Sold Out' : 'Buy Ticket';
    }

    buyTicketButton.addEventListener('click', () => {
        if (currentMovie.tickets_sold < currentMovie.capacity) {
            currentMovie.tickets_sold++;
            updateMovieDetails();
        }
    });

    // Initialize the app
    fetchMovies();
});