# movieql

Movie API with GraphQL

<br/>

## movieql 프로젝트만들기

movieql 폴더 생성 후 시작

```javascript
yarn init
```

name(movieql):(Enter)  
version:(Enter)  
description:Movie API with Graphql  
계속...(Enter)

<br/>

## yarn Install

### graphql-yoga 설치

```javascript
yarn add graphql-yoga
```

[graphql-yoga](https://github.com/prisma/graphql-yoga)는 create-react-app 명령어랑 비슷한데 GraphQL 프로젝트를 빠르게 시작할 수 있다.

<br/>

### nodemo 설치

```javascript
yarn global add nodemon
```

nodemon은 파일을 수정할 때마다 서버를 재시작 해준다.

<br/>

**package.json**

```javascript
"scripts": {
    "start": "nodemon"
}
```

package.json 파일에 위 내용 추가하기  
modemon이 index.js 파일을 주시하게 된다.


<br/>

## babel Install

```javascript
yarn global add babel-cli --ignore-engines
yarn add babel-cli babel-preset-env babel-preset-stage-3 --dev
```

**package.json**

```javascript
"scripts": {
    "start": "nodemon --exec babel-node index.js"
}
```

scripts 부분의 코드를 수정해준다.

**.babelrc**

```javascript
{
    "presets": ["env", "stage-3"]
}
```

**index.js**

```javascript
import { GraphQLServer } from "graphql-yoga";

console.log("hi");
```

`yarn start`   
console 내용을 수정할 때마다 서버를 재시작 되는지 테스트 해보기

<br/>

# GraphQL Server with GraphQL  yoga

**index.js**

```javascript
import { GraphQLServer } from "graphql-yoga";

const server = new GraphQLServer({

})

server.start(() => console.log("Graphql Server Running"))
```
이렇게 server 라는 변수에 새로운 GraphQLServer를 만들어서 안쪽에 환경설정을 넣으면 끝이다.  

결과는 schema 오류가 나오지만 괜찮다.   
지금은 graph-yoga를 이용해서 얼마나 쉽게 서버를 구동시킬수 있는지 보기 위한것이기 때문이다.   

이건 create-react-app과 같이 정말 간단하게 서버를 시작할 수 있게 해준다.

<br/>

## schema란 무엇인가?

필드를 쿼리할 때 GraphQL 서비스가 항상 값을 반환한다는 것을 의미합니다.   
타입 언어에서는 이것을 느낌표로 나타냅니다. [Episode]! 는 Episode 객체의 배열(array) 을 나타냅니다.

이 schema는 Node.js나 Database를 위한것이 아니라 단지 Graphql을 위한것이고 그저 무엇을 받을지 무엇을 줄지에 대한 설명이다.

## schema.graphql

우리의 디렉토리에 graphql 이라는 폴더를 생성하고 그 안에 shcema.graphql라는 이름의 파일을 만들자.  
이 파일에서는 사용자가 뭘 할지에 대해서 정의할것이다. 

그 중 하나는 **Database로부터 정보를 얻는것이다 우리는 이것을 Query** 라고 부른다.  
즉, **Query는 단지 우리가 정보를 받아올때만 쓰는것이다.** 
 
또 다른 할 것은 정보를 Database로 보내는것이다.  
Mutation(변형)은 우리가 정보를 변경할때 우리의 서버에서 혹은 Database에서,  
메모리에서 정보를 바꾸는 작업을 할 때 하는것을 Mutation(변형)이라고 한다. 

이제 우리가 GraphQL 서버에 할일은 어떤 Mutation과 어떤 Query들을 우리가 가지고 있는지 알려주는것이다.


**graphql/schema.graphql**

```javascript
type Query {
  name: String!
  // name에 대한 답으로 String을 준다. 그리고 필수로 해놓았다.
}
```
사용자에게 정보를 주는 모든 Query들을 넣는다.

어떤 사용자가 Query에 이름을 보내면 String을 보낸다는 설명을 작성 한 것

Query는 우리의 Database에게는 알수 없는 문제같은 것이다.  
그래서 우리는 이 Query를 어떤 방식으로 resolve(해결)해야 한다. 

이 과정을 위해 같은 디렉토리에 resolver.js라는 파일을 생성하자.

**graphql/resolver.js**

```javascript
const resolvers = {
    Query: {
        name:() => "ami"
    }
}

export default resolvers;
```

어떤 사용자가 name Query를 보내면 “ami” 을 반환하는 함수로 답하는 resolver이다. 

우리가 한것을 다시 살펴보면 Query를 설명하고, Resolvers를 프로그래밍 한것이다. 

보다시피 GraphQL에는 Query와 Resolvers만 있을 뿐 View나 URL 같은것은 보이지 않는다. 

그리고 Resolvers를 우리가 원하는대로 프로그래밍 할 수 있다.   
Database로 갈 수도 있고 다른 Database로 갈 수도 있고 혹은 메모리, 혹은 다른 API로 접근이 가능하다.

이제 만든 resolvers를 index에 import시키자.

**index.js**

```javascript
import { GraphQLServer } from "graphql-yoga"
import resolvers from "./graphql/resolver"

const server = new GraphQLServer({
    typeDefs: "graphql/schema.graphql",  //typeDefs는 모든 type들에 대한 정의
    resolvers 
    // resolvers: resolvers 로도 표현이 가능하지만
    // 최신 자바스크립트는 resolvers 만 써도 같은 의미이다.
})

server.start(() => console.log("Graphql Server Running"))
```

이렇게 서버가 구동된다면 성공!
이제 http://localhost:4000/ 로 이동해보자

이동하면 GraphQL PlayGround가 나온다.   
이 페이지는 GraphQL yoga 안에 있는 것이다. 

이제 이 PlayGround에서 왼쪽 에디터에 우리가 만들었던 query를 입력해보자.

**PlayGround ( Ctrl+Enter = 실행 )**

```javascript
query {
    name
}
```

기본적으로 우리가 Query안에 보내고 그안에는 name이 있었다.   
그리고 GraphQL이 우리의 서버에서 이 Query에 맞는 Resolvers를 찾는것이다.   
만약에 Resolvers에서 name을 myName으로 변경하면 Query.myName이 schema에 없고 Resolvers에 정의되어있다는 오류가 발생한다.  

또한 schema.graphql 에서 String이 아닌 Int로 하게되면?   
Int는 숫자로 반환하라는 뜻이므로 당연히 에러가 발생할 것이다. 
 
이렇게 data의 type을 미리 적어놓는것이 매우 안전하다.

그렇다면 이제는 추측할 수 있다 과연 이 playground는 무엇일까?  
바로 우리의 Database를 안전하게 테스트하게 해주는 놀이터이다.


<br/>

# Extending the Schema

**graphql/resolver.js**

```javascript
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
```

**graphql/schema.graphql**

```javascript
type Wooami {
  name: String!
  age: Int!
  gender: String!
}

type Query {
  person: Wooami!
}
```

위에서 설명했었듯이 Query는 설명, Resolvers는 프로그래밍이다.

Query(schema.graphql)에서 새로운 wooami이라는 type을 설명했다   
여기서 name, age, gender를 따로 받을수 있게된다.   
그리고 type Query에서 person은 Wooami를 반환한다고 설명해놨다.

그리고 Resolvers(resolver.js)에서 wooami란 변수의 name, age, gender를 정해놓았다. 

resolvers 변수에서 Query의 person은 위에서 미리 설명한 wooami변수를 반환해야한다.

자이제 서버를 재시작하고 우리의 Playground를 새로고침하자.   
http://localhost:4000/ 로 이동 후 확인해보기    
오른쪽 SCHEMA 버튼을 눌러보기


**PlayGround ( Ctrl+Enter = 실행 )**

```javascript
query{
  person{
    age
    name
  }
}
```

위에서 볼수 있듯이 우리의 쿼리에 대한 설명을 모두 볼 수 있다.   
이것은 API나 프로젝트를 익히는 개발자들에게는 매우 유용한 부분이다!   
API를 여러개 불러오거나 할땐 정말로 기억하기 힘들어진다.   
이제 우리의 Database를 이해할 수 있는 도구가 생긴것이다

위처럼 우리가 원하는 정보만 빼올 수 있게 되는것이다.  
age 뿐만 아니라 name, gender 등 필요한 정보만 Database에서 선택사항으로 받아올 수 있게 되었다.

<br/>

# Extending the Schema part Two

**graphql/schema.graphql**

```javascript
type Person {
  id: Int!
  name: String!
  age: Int!
  gender: String!
}

type Query {
  people: [Person]!
  person(id: Int!): Person
}
```

위에서 people이 보내는것은 [Person] 이다.   
여기서 people은 오직 하나의 Person만 보내지 않고 다수의 Person을 보낸다. 

다시말해 Person이 array라는 것이다.   
우리는 다수의 Person을 보낼것이고 이건 필수 사항이라는 뜻이다.   
여기서 필수사항이라는 말이 조금 복잡한데 선택적으로 받아올수는 있지만 null 일수 없다는 뜻이다.

그리고 오직 하나의 Person만 받아오고 싶을땐 ID가 필요하다.   
id를 넣은 person은 Person을 받아오게된다.   
여기서는 필수사항 표시를 넣지 않았는데 그 이유는 해당 id의 Person을 찾지 못할 수 도 있기 때문이다.

간략하게 정리하면 people은 Person type의 배열이고,   
person은 id를 가진 하나의 Person type 이다.

**graphql/resolver.js**

```javascript
const people = [
{
    id: 1,
    name: "Ami",
    age: 26,
    gender: "male"
  },
  {
    id: 2,
    name: "AAA",
    age: 20,
    gender: "female"
  },
  {
    id: 3,
    name: "BBB",
    age: 30,
    gender: "male"
  },
  {
    id: 4,
    name: "CCC",
    age: 40,
    gender: "female"
  },
  {
    id: 5,
    name: "DDD",
    age: 50,
    gender: "male"
  }
]


const resolvers = {
  Query: {
    people: () => people
  }
}

export default resolvers;
```

people을 배열로 만들고 사용자도 5명까지 추가하고 각각 id도 부여하였다.  

Query에 의해 설명된것을 보면 people은 people을 반환하는데 이것을 설명하는  
위의 schema에 따르면 people은 Person type으로 작성된 배열이나,   
혹은 Person type으로 작성되고 id가 일치하는 하나의 people을 가져오게 되는것이다.  

말로 설명하니 정말 복잡한데 놀이터의 SCHEMA로 보면 조금 더 직관적이다.

자이제 서버를 재시작하고 우리의 Playground를 새로고침하자.   
http://localhost:4000/ 로 이동 후 확인해보기    

**PlayGround ( Ctrl+Enter = 실행 )**

```javascript
query{
  people {
    name
  }
}
```

위처럼 필요한 부분만 GraphQL을 통해서 받게 되는것이다.

<br/>

## DB 분리

우리의 데이터가 꽤 커졌으니 따로 관리하는게 좋을것 같다.

**graphql/db.js**

```javascript
export const people = [
    {
        id: 1,
        name: "Ami",
        age: 26,
        gender: "female"
    },{
        id: 2,
        name: "AAA",
        age: 20,
        gender: "female"
    },{
        id: 3,
        name: "BBB",
        age: 30,
        gender: "male"
    },{
        id: 4,
        name: "CCC",
        age: 40,
        gender: "female"
    },{
        id: 5,
        name: "DDD",
        age: 50,
        gender: "male"
    }
];
```

**graphql/resolvers.js**

```javascript
import { people } from "./db";

(...)
```

graphql 폴더에 그대로 db.js라는 파일을 생성하고   
resolver.js 파일에 있는 데이터를 옮긴 후 export 하고   
resolver.js에서 import 했다. 

<br/>

## db.js에서 함수 만들기

db.js에서 함수를 만들수도 있다.

**graphql/db.js**

```javascript
export const people = [
  ...
]

export const getById = id => {
  const filteredPeople = people.filter(person => person.id === id);
  return filteredPeople[0];
};
```

**graphql/resolver.js**

```javascript
import { people, getById } from "./db";

const resolvers = {
    Query: {
        people: () => people,
        person: (_, { id }) => getById(id)
    }
}

export default resolvers;
```

이 함수는 지정 id에 대응하는 대상을 getById로 찾아내는 기능이다.  

서버를 재시작하고 우리의 Playground를 새로고침하자.   
http://localhost:4000/ 로 이동 후 확인해보기    

**PlayGround ( Ctrl+Enter = 실행 )**

```javascript
query {
  person(id: 1) {
    name
    age
  }
}
```

GraphQL에 대해 다시 한번 간략하게 정리하자면,  
Operation(schema.graphql)에서 우리가 우리의 data가 어떻게 보일지 정의하고  

그 Operation(질문)을 resolve(해결)하는 함수를 만드는것이다

(resolver.js). 우리가 원하거나 좋아하는 어떤종류의 Backend든 다 가질수 있다.

<br/>

# Movie Schema 

**graphql/db.js**

※ 이전 데이터 수정

```javascript
// const 로 하면 읽기전용이 된다
export let movies = [
  {
    id: 0,
    name: "Star Wars - The new one",
    score: 10
  },{
    id: 1,
    name: "Avengers - The new one",
    score: 90
  },{
    id: 2,
    name: "The Godfater I",
    score: 7
  },{
    id: 3,
    name: "Logan",
    score: 2
  }
];

export const getById = id => {
  const filteredMovies = movies.filter(movie => movie.id === id);
  return filteredMovies[0];
}

```

**graphql/schema.graphql**

※ 이전 데이터 수정

```javascript
type Movie {
  id: Int!
  name: String!
  score: Int!
}

type Query {
  movies: [Movie]!
  movie(id: Int!): Movie
}
```

**graphql/resolver.js**

※ 이전 데이터 수정

```javascript
import { movies, getById } from "./db";

const resolvers = {
  Query: {
    movies:() => movies,
    movie: (_, { id }) => getById(id)
  }
};

export default resolvers;
```

서버를 재시작하고 우리의 Playground를 새로고침하자.   
http://localhost:4000/ 로 이동 후 확인해보기    

**PlayGround ( Ctrl+Enter = 실행 )**

```javascript
query {
  movies {
    name  
  }
}
```

```javascript
query {
  movie(id:1){
    name
  }
}
```

<br/>

## Defining Mutations

(change of state)Mutation은 Database 상태가 변할 때 사용되는 것이다.  

**graphql/schema.graphql**

```javascript
(...)
type Mutation {
  addMovie(name: String!, score: Int!): Movie!
}
```

Mutation 를 추가해준다.

GraphQL이 내 Mutation 이나 Query를 요청하길 원한다면  
type Query와 Mutation에 넣야야 한다.

<br/>

**graphql/db.js**

```javascript
(...)

export const addMovie = (name, score) => {
  const newMovie = {
    id: `${movies.length + 1}`,
    name,
    score
  };
  movies.push(newMovie);
  return newMovie;
}
```

<br/>

**graphql/resolver.js**

```javascript
import { movies, getById, addMovie } from "./db";

const resolvers = {
    Query: {
        movies:() => movies,
        movie: (_, { id }) => getById(id)
    },
    Mutation: {
        addMovie: (_, {name, score}) => addMovie(name,score)
    }
};

export default resolvers;
```

addMovie 를 import 해준다.

<br/>

서버를 재시작하고 우리의 Playground를 새로고침하자.   
http://localhost:4000/ 로 이동 후   
addMovie함수를 사용해 영화 추가 해보기

**PlayGround ( Ctrl+Enter = 실행 )**

```javascript
mutation {
 addMovie(name: "Batman: Hush", score: 36){
    name  //하위영역
  }
}
```

schema.graphql 에서 Movie! 를 필수사항으로 설정해 놨기 때문에  
하위영역 중 어떤 것을 선택할지 묻는다.

```javascript
query {
  movies {
    id
    name
  }
}
```
영화를 추가해보고 잘 들어갔는지 확인하기

<br/>

# Delete Mutation

**graphql/db.js**

```javascript
(...)

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
```

`deleteMovie` 함수는 `true` or `false` 만 `return` 한다.

<br/>

**graphql/schema.graphql**

```javascript
(...)

type Mutation {
  addMovie(name: String!, score: Int!): Movie!
  deleteMovie(id: Int!): Boolean!
}
```

**graphql/db.js**에 `deleteMovie` 함수는 `true` or `false` 만 `return` 한다.

해당하는 movie가 삭제되었는지 여부를 의미하기 때문에
`Boolean형`이어야 한다.

<br/>

**graphql/resolver.js**


```javascript
import { movies, getById, addMovie, deleteMovie } from "./db";

const resolvers = {
    Query: {
        movies:() => movies,
        movie: (_, { id }) => getById(id)
    },
    Mutation: {
        addMovie: (_, {name, score}) => addMovie(name,score),
        deleteMovie: (_, {id}) => deleteMovie(id)
    }
};

export default resolvers;
```

deleteMovie를 import 하기

<br/>

서버를 재시작하고 우리의 Playground를 새로고침하자.   
http://localhost:4000/ 로 이동 후   
deleteMovie함수를 사용해 영화 삭제 해보기

**PlayGround ( Ctrl+Enter = 실행 )**

```javascript
query {
  movies {
    id
    name
  }
}
```

영화를 조회 해보기

```javascript
mutation {
 deleteMovie(id: 1)
}
```

deleteMovie 사용해 삭제하기

하위영역으 Boolean 이라는 걸 알고 있기 때문에   
addMovie 함수처럼 물어보지 않는다.


**`영화 정보를 받을 때 Query를 했고`**  
**`Database의 상태를 바꾸기 위해서 Mutation을 한다.`**

<br/>

# Wrapping a REST API with GraphQL Part One

[JSONView 구글 확장 프로그램](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=ko) 을 설치하면 JSON을 깔끔하게 보여준다.


먼저 우리의 db에 사용하려는 API를 불러올것이다.   
이번에 사용할 영화 API는 [YTS API](https://yts.lt/api)  에서 제공하는 API를 사용할 것 이다.  
API key도 따로 필요 없으면서 많은 영화의 db를 자주 업데이트되는 API를 제공한다. 

[list-movie](https://yts.lt/api#list_movies)
API의 양을 결정하는 필터가 있다.  
양을 제한 할 수 있고, 분류도 할 수 있다.

[전체 list_movies.json](https://yts.lt/api/v2/list_movies.json)

[list_movies.json?limit=50](https://yts.lt/api/v2/list_movies.json?limit=50)
주소 옆에 ?limit=50 을 추가하면 숫자만큼 양을 제한할 수 있다.

[list_movies.json?limit=50&minimum_rating=9](https://yts.lt/api/v2/list_movies.json?limit=50&minimum_rating=9) &minimum_rating=9 추가적으로 적어주면 최소평점을 사용해서 9점 이상만 받을 수 있다.

<br/>



## yarn Install

### node-fetch 설치

이제 Graph QL로 REST API를 감싸볼 것이다. 코드 작성 전에 설치해야 할 패키지가 있다.

```javascript
yarn add node-fetch
```

fetch를 위한 패키지 설치이다. 그리고 코드를 수정하자.

<br/>

## YTS API 데이터로 바꾸기

**graphql/db.js**

※ 이전 데이터는 모두 지우고 시작했다.

```javascript
import fetch from "node-fetch";
const API_URL = "https://yts.am/api/v2/list_movies.json"

export const getMovies = (limit, rating) => fetch(`${API_URL}`)
  .then(res => res.json())
  .then(json => json.data.movies);
```

db.js에서는 우리가 가져올 api주소를 fetch하였다. 
그리고 이어서 json파일로 변환했다.

파라미터로 가져온 limit와 rating은 추후에 사용할 갯수제한과 rating 순서대로 정렬을 위해 미리 적어놓았다. 

이 파라미터들은 위에서 언급한 yts.am에서 제공하는 옵션이다.

<br/>

**graphql/resolver.js**

※ 이전 데이터는 모두 지우고 시작했다.

```javascript
import { getMovies } from "./db";

const resolvers = {
  Query: {
    movies: () => getMovies()
  }
}

export default resolvers;
```

resolvers에서는 당장 우리가 필요한 기능인 영화를 불러오는 기능만 구현

<br/>

**graphql/schema.graphql**

```javascript
type Movie {
  id: Int!
  title: String!
  rating: Float!
  summary: String!
  language: String!
  medium_cover_image: String!
}

type Query {
  movies: [Movie]!
}
```

schema에서는 API에서 불러올 영화의 필수정보들을 정의

<br/>

**PlayGround ( Ctrl+Enter = 실행 )**

서버를 재시작하고 우리의 Playground를 새로고침하자.   
http://localhost:4000/ 로 이동 후 확인해보기    

```javascript
query {
  movies {
    id
    title
    rating
  }
}
```
