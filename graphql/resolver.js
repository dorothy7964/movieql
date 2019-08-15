import { movies, getById } from "./db";

const resolvers = {
    Query: {
        movies:() => movies,
        movie: (_, { id }) => getById(id)
    }
};

export default resolvers;