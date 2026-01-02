const movieGrid = document.getElementById('movieGrid');
const searchInput = document.getElementById('search');
const categoryButtons = document.querySelectorAll('.categories button');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalImg = document.getElementById('modalImg');
const modalDesc = document.getElementById('modalDesc');
const modalTrailer = document.getElementById('modalTrailer');
const closeModal = document.getElementById('closeModal');

let movies = [];

// Fetch movies (static fallback version)
async function fetchMovies(category="all") {
    // Static movies
    movies = [
        {title:"Cyber Realm", img:"https://images.unsplash.com/photo-1610088679715-9dcf35c7a237?auto=format&fit=crop&w=800&q=80", desc:"Futuristic sci-fi adventure.", trailer:"#", category:"sci-fi"},
        {title:"Neon Chase", img:"https://images.unsplash.com/photo-1610088679715-9dcf35c7a237?auto=format&fit=crop&w=800&q=80", desc:"High-speed action in neon city.", trailer:"#", category:"action"},
        {title:"Future Wars", img:"https://images.unsplash.com/photo-1610088679715-9dcf35c7a237?auto=format&fit=crop&w=800&q=80", desc:"Epic battles in the future.", trailer:"#", category:"action"},
        {title:"Holo Dreams", img:"https://images.unsplash.com/photo-1610088679715-9dcf35c7a237?auto=format&fit=crop&w=800&q=80", desc:"Virtual reality adventures.", trailer:"#", category:"sci-fi"},
        {title:"Laugh Track", img:"https://images.unsplash.com/photo-1610088679715-9dcf35c7a237?auto=format&fit=crop&w=800&q=80", desc:"Futuristic comedy movie.", trailer:"#", category:"comedy"}
    ];

    if(category !== "all") movies = movies.filter(m => m.category === category);
    displayMovies(movies);
}

function displayMovies(list){
    movieGrid.innerHTML = "";
    list.forEach(movie=>{
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `<img src="${movie.img}" alt="${movie.title}"><h3>${movie.title}</h3>`;
        card.addEventListener('click', ()=>openModal(movie));
        movieGrid.appendChild(card);
    });
}

// Modal
function openModal(movie){
    modal.style.display="flex";
    modalTitle.textContent=movie.title;
    modalImg.src=movie.img;
    modalDesc.textContent=movie.desc;
    modalTrailer.href=movie.trailer;
}
closeModal.addEventListener('click', ()=>modal.style.display="none");
window.addEventListener('click', e=>{if(e.target===modal) modal.style.display="none";});

// Search
searchInput.addEventListener('input', ()=>{
    const query = searchInput.value.toLowerCase();
    const filtered = movies.filter(m => m.title.toLowerCase().includes(query));
    displayMovies(filtered);
});

// Category filter
categoryButtons.forEach(btn => btn.addEventListener('click', ()=>fetchMovies(btn.dataset.category)));

// Particles background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
class Particle{
    constructor(){this.x=Math.random()*canvas.width;this.y=Math.random()*canvas.height;this.size=Math.random()*2+1;this.speedX=Math.random()*0.5-0.25;this.speedY=Math.random()*0.5-0.25;}
    update(){this.x+=this.speedX;this.y+=this.speedY;if(this.x>canvas.width)this.x=0;if(this.x<0)this.x=canvas.width;if(this.y>canvas.height)this.y=0;if(this.y<0)this.y=canvas.height;}
    draw(){ctx.fillStyle="#00ffea";ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fill();}
}
for(let i=0;i<150;i++)particlesArray.push(new Particle());
function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);particlesArray.forEach(p=>{p.update();p.draw();});requestAnimationFrame(animate);}
animate();

// Initial load
fetchMovies();
