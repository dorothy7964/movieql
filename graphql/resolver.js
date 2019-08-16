import { getMovies, getById, addMovie, deleteMovie } from './db';

const resolvers = {
    Query: {
        movies:(_, {limit, rating}) => getMovies(limit, rating),
        movie: (_, {id}) => {
            return getById(id);
        }
    },
    Mutation: {
        addMovie: (_, {name, score}) => {
          return addMovie(name, score);
        },
        deleteMovie: (_ ,{id}) => deleteMovie(id),
    }
};

export default resolvers;