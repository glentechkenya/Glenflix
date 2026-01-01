const movieGrid = document.getElementById('movieGrid');
const searchInput = document.getElementById('search');
const categoryButtons = document.querySelectorAll('.categories button');

let movies = [];

// Simulated Gifted API call
async function fetchMovies(category = "all") {
    // Here you would fetch from Gifted API
    // Example: const response = await fetch(`YOUR_GIFTED_API_URL?category=${category}`);
    // movies = await response.json();

    // Simulated data
    movies = [
        { title: "Cyber Realm", img: "https://images.unsplash.com/photo-1610088679715-9dcf35c7a237?auto=format&fit=crop&w=800&q=80", category: "sci-fi" },
        { title: "Neon Chase", img: "https://images.unsplash.com/photo-1610088679715-9dcf35c7a237?auto=format&fit=crop&w=800&q=80", category: "action" },
        { title: "Future Wars", img: "https://images.unsplash.com/photo-1610088679715-9dcf35c7a237?auto=format&fit=crop&w=800&q=80", category: "action" },
        { title: "Holo Dreams", img: "https://images.unsplash.com/photo-1610088679715-9dcf35c7a237?auto=format&fit=crop&w=800&q=80", category: "sci-fi" },
        { title: "Laugh Track", img: "https://images.unsplash.com/photo-1610088679715-9dcf35c7a237?auto=format&fit=crop&w=800&q=80", category: "comedy" }
    ];

    if (category !== "all") {
        movies = movies.filter(movie => movie.category === category);
    }

    displayMovies(movies);
}

function displayMovies(list) {
    movieGrid.innerHTML = "";
    list.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
            <img src="${movie.img}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;
        movieGrid.appendChild(card);
    });
}

// Search movies
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = movies.filter(movie => movie.title.toLowerCase().includes(query));
    displayMovies(filtered);
});

// Category buttons
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        fetchMovies(btn.dataset.category);
    });
});

// Initial load
fetchMovies();
