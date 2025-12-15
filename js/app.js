// // // let getMovies = (search) =>{
// // //     let searchApiUrl;
// // //     if(search){
// // //         searchApiUrl = `https://www.omdbapi.com/?apikey=56c0ac04&s=${search}`;
// // //     }
// // //     else{
// // //         searchApiUrl = `https://www.omdbapi.com/?apikey=56c0ac04&s=avengers`;
// // //     }
// // //     fetch(searchApiUrl)
// // //     .then(res => res.json())
// // //     .then(finalRes => {
// // //         showMovies(finalRes.Search);
// // //         console.log(finalRes);
        
// // //     });
// // // }
// // function getMovies(search) {
// //     const url = search
// //         ? `https://www.omdbapi.com/?apikey=56c0ac04&s=${search}`
// //         : `https://www.omdbapi.com/?apikey=56c0ac04&s=avengers`;

// //     fetch(url)
// //         .then(res => res.json())
// //         .then(data => {
// //             console.log("OMDB RESPONSE:", data);

// //             if (data.Response === "True") {
// //                 showMovies(data.Search);
// //             } else {
// //                 console.log("No movies found:", data.Error);
// //             }
// //         })
// //         .catch(err => console.error("Fetch error:", err));
// // }
// // getMovies();
// // function showMovies(movies) {
// //     const container = document.getElementById("movies__container");
// //     container.innerHTML = ""; // clear placeholder

// //     movies.forEach(movie => {
// //         container.innerHTML += `
// //             <div class="movie_card">
// //                 <div class="movie__poster">
// //                     <img 
// //                         src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}" 
// //                         alt="${movie.Title}"
// //                     >
// //                 </div>
// //                 <div class="movie__info">
// //                     <h2 class="movie__title">${movie.Title}</h2>
// //                     <span class="movie__rating">${movie.Year}</span>
// //                 </div>
// //             </div>
// //         `;
// //     });
// // }
// // const form = document.getElementById("search__form");
// // const input = document.getElementById("search__input");

// // form.addEventListener("keyup", (e) => {
// //     e.preventDefault();
// //     const query = input.value.trim();
// //     if (query) {
// //         getMovies(query);
// //     }
// // });
// // =====================
// // GLOBAL STATE
// // =====================
// let currentPage = 1;
// let currentSearch = "batman";

// // =====================
// // FETCH MOVIES
// // =====================
// function getMovies(search = currentSearch, page = currentPage) {
//     currentSearch = search;
//     currentPage = page;

//     const url = `https://www.omdbapi.com/?apikey=56c0ac04&s=${search}&page=${page}`;

//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             console.log("OMDB RESPONSE:", data);

//             if (data.Response === "True") {
//                 showMovies(data.Search);
//                 updatePageNumber(page);
//                 toggleButtons(data.totalResults);
//             } else {
//                 clearMovies();
//                 console.log("No movies found:", data.Error);
//             }
//         })
//         .catch(err => console.error("Fetch error:", err));
// }

// // =====================
// // RENDER MOVIES
// // =====================
// function showMovies(movies) {
//     const container = document.getElementById("movies__container");
//     container.innerHTML = "";

//     movies.forEach(movie => {
//         container.innerHTML += `
//             <div class="movie_card">
//                 <div class="movie__poster">
//                     <img 
//                         src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}" 
//                         alt="${movie.Title}"
//                     >
//                 </div>
//                 <div class="movie__info">
//                     <h2 class="movie__title">${movie.Title}</h2>
//                     <span class="movie__rating">${movie.Year}</span>
//                 </div>
//             </div>
//         `;
//     });
// }

// // =====================
// // CLEAR MOVIES
// // =====================
// function clearMovies() {
//     document.getElementById("movies__container").innerHTML = "";
// }

// // =====================
// // PAGE NUMBER
// // =====================
// function updatePageNumber(page) {
//     document.getElementById("page__number").textContent = page;
// }

// // =====================
// // PAGINATION BUTTON STATE
// // =====================
// function toggleButtons(totalResults) {
//     const prevBtn = document.getElementById("prev__btn");
//     const nextBtn = document.getElementById("next__btn");

//     const totalPages = Math.ceil(totalResults / 10);

//     prevBtn.disabled = currentPage === 1;
//     nextBtn.disabled = currentPage >= totalPages;
// }

// // =====================
// // EVENTS
// // =====================
// document.getElementById("prev__btn").addEventListener("click", () => {
//     if (currentPage > 1) {
//         getMovies(currentSearch, currentPage - 1);
//     }
// });

// document.getElementById("next__btn").addEventListener("click", () => {
//     getMovies(currentSearch, currentPage + 1);
// });

// document.getElementById("search__form").addEventListener("submit", (e) => {
//     e.preventDefault();
//     const query = document.getElementById("search__input").value.trim();
//     if (query) {
//         currentPage = 1;
//         getMovies(query, 1);
//     }
// });

// // =====================
// // INITIAL LOAD
// // =====================
// getMovies();
// =====================
// GLOBAL STATE
// =====================
let currentPage = 1;
let currentSearch = "";
const CURRENT_YEAR = new Date().getFullYear();
const API_KEY = "56c0ac04";

// =====================
// FETCH MOVIES
// =====================
function getMovies(search = currentSearch, page = currentPage) {
    currentSearch = search;
    currentPage = page;

    let url;

    // FIRST LOAD → recent movies by year
    if (!search) {
        url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=movie&y=${CURRENT_YEAR}&page=${page}`;
    } 
    // SEARCH MODE
    else {
        url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log("OMDB RESPONSE:", data);

            if (data.Response === "True") {
                showMovies(data.Search);
                updatePageNumber(page);
                toggleButtons(data.totalResults);
            } else {
                clearMovies();
                updatePageNumber(page);
                toggleButtons(0);
                console.log("No movies found:", data.Error);
            }
        })
        .catch(err => console.error("Fetch error:", err));
}

// =====================
// RENDER MOVIES
// =====================
function showMovies(movies) {
    const container = document.getElementById("movies__container");
    container.innerHTML = "";

    movies.forEach(movie => {
        container.innerHTML += `
            <div class="movie__card">
                <div class="movie__poster">
                    <img 
                        src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}" 
                        alt="${movie.Title}"
                    >
                </div>
                <div class="movie__info">
                    <h2 class="movie__title">${movie.Title}</h2>
                    <span class="movie__rating">${movie.Year}</span>
                </div>
            </div>
        `;
    });
}

// =====================
// CLEAR MOVIES
// =====================
function clearMovies() {
    document.getElementById("movies__container").innerHTML = "";
}

// =====================
// PAGE NUMBER
// =====================
function updatePageNumber(page) {
    document.getElementById("page__number").textContent = page;
}

// =====================
// PAGINATION BUTTON STATE
// =====================
function toggleButtons(totalResults) {
    const prevBtn = document.getElementById("prev__btn");
    const nextBtn = document.getElementById("next__btn");

    const totalPages = Math.ceil(totalResults / 10);

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage >= totalPages || totalPages === 0;
}

// =====================
// EVENTS
// =====================
document.getElementById("prev__btn").addEventListener("click", () => {
    if (currentPage > 1) {
        getMovies(currentSearch, currentPage - 1);
    }
});

document.getElementById("next__btn").addEventListener("click", () => {
    getMovies(currentSearch, currentPage + 1);
});

document.getElementById("search__form").addEventListener("keyup", (e) => {
    e.preventDefault();
    const query = document.getElementById("search__input").value.trim();
    currentPage = 1;
    getMovies(query, 1);
});

// =====================
// INITIAL LOAD
// =====================
getMovies();
