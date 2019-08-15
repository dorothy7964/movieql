export let movies = [
    {
        id: 0,
        name: "Star Wars",
        score: 26
    },{
        id: 1,
        name: "Avengers",
        score: 99
    },{
        id: 2,
        name: "The Godfater I",
        score: 47
    },{
        id: 3,
        name: "Logan",
        score: 5
    
    }
];

export const getById = id => {
    const filteredMovie = movies.filter(movie => movie.id === id);
    return filteredMovie[0];
}

export const deleteMovie = id => {
    const CleanedMovies = movies.filter(movie => movie.id !== id);
    
    //같은 id를 가지지 않은 movie의 배열을 만들기
    if(movies.length > CleanedMovies.length){
        movies = CleanedMovies;
      return true;
    } else {
      return false;
    }
}

export const addMovie = (name, score) => {
    const newMovie = {
        id: `${movies.length + 1}`,
        name,
        score
    };
    movies.push(newMovie);
    return newMovie;
}