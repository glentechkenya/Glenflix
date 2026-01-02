const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

async function getMovies(query = "batman") {
  try {
    const res = await fetch(
      `https://movieapi.giftedtech.co.ke/api/search/${encodeURIComponent(query)}`
    );

    const data = await res.json();
    const movies = data.results?.items || [];

    displayMovies(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    movieGrid.innerHTML = "<p style='color: #ff5555;'>Failed to load movies.</p>";
  }
}

function displayMovies(list) {
  movieGrid.innerHTML = "";
  if (list.length === 0) {
    movieGrid.innerHTML = "<p>No movies found.</p>";
    return;
  }

  list.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.cover?.url || movie.thumbnail}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
    `;
    movieGrid.appendChild(card);
  });
}

// Search button
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) getMovies(query);
});

getMovies(); // initial load
