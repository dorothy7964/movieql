const wooami = {
    name:"Wooami",
    age : 27,
    gender: "female"
};

const resolvers = {
    Query: {
        person:() => wooami
    }
};

export default resolvers;