const data = [
  {
    id: 1,
    title: 'The Lord of the Rings',
    publicationDate: '1954-07-29',
    author: 'J. R. R. Tolkien',
    genres: [
      'fantasy',
      'high-fantasy',
      'adventure',
      'fiction',
      'novels',
      'literature',
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: 'El señor de los anillos',
      chinese: '魔戒',
      french: 'Le Seigneur des anneaux',
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: 'The Cyberiad',
    publicationDate: '1965-01-01',
    author: 'Stanislaw Lem',
    genres: [
      'science fiction',
      'humor',
      'speculative fiction',
      'short stories',
      'fantasy',
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: 'Dune',
    publicationDate: '1965-01-01',
    author: 'Frank Herbert',
    genres: ['science fiction', 'novel', 'adventure'],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: '',
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: '1997-06-26',
    author: 'J. K. Rowling',
    genres: ['fantasy', 'adventure'],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: 'Harry Potter y la piedra filosofal',
      korean: '해리 포터와 마법사의 돌',
      bengali: 'হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন',
      portuguese: 'Harry Potter e a Pedra Filosofal',
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: 'A Game of Thrones',
    publicationDate: '1996-08-01',
    author: 'George R. R. Martin',
    genres: ['fantasy', 'high-fantasy', 'novel', 'fantasy fiction'],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: '왕좌의 게임',
      polish: 'Gra o tron',
      portuguese: 'A Guerra dos Tronos',
      spanish: 'Juego de tronos',
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

/*
///////////////////////////////////////////////
// Destructuring
const books = getBook(2);
books;

// using objects
// variable name should be equal to property name
const { author, title, genres, pages, publicationDate, hasMovieAdaptation } =
  books;
console.log(author, title, genres, pages, publicationDate, hasMovieAdaptation);

// arrays
const [primaryGenre, secondaryGenre] = genres;
console.log(primaryGenre, secondaryGenre);

//rest operator
//return value for the rest operator is an array
const [popularGenre, localGenre, ...otherGenre] = genres;
console.log(popularGenre, localGenre, otherGenre);

///////////////////////////////////////////////////
// spread operator
// for array
const newGenre = [...genres, 'gothic'];
newGenre;

// for objects
const updatedBook = {
  // if we want to get all the properties inside the object, we need to spread the object at first,
  // so it will be overwritten from our desired properties
  ...books,
  moviePublicationDate: '2001-12-12',
  pages: 1210,
};
updatedBook;

///////////////////////////////////////////////////
////Template literals
const summary = `${title}, a ${pages}-page long book, was written by ${author} and published in ${
  publicationDate.split('-')[0]
}. The book has ${hasMovieAdaptation ? '' : 'not'} been adapted as a movie.`;
summary;

///////////////////////////////////////////////////
////Ternary Operator
const pagesRange = pages > 1000 ? 'over a thousand' : 'less than 1000';
pagesRange;

///////////////////////////////////////////////////
////Arrow Functions

// function declaration
function getYear(str) {
  return str.split('-')[0];
}

// arrow function
const getYearArrow = (str) => str.split('-')[0];

console.log(getYear(publicationDate));
console.log(getYearArrow(publicationDate));

///////////////////////////////////////////////////
////Short circuiting
// in certain conditions, the operator will immediately return the first value and will not continue to next value
// in &&, if the first value is false, it will return and will not continue further
console.log(true && 'Some string');
console.log(false && 'Some string');

console.log(hasMovieAdaptation && 'This book has a movie');

// falsy" 0, '', null, undefined
console.log('jonas' && 'Some string');
console.log(0 && 'Some string');

// usualy we use || in setting as default value
console.log(books.translations.spanish);

const spanishTranslation = books.translations.spanish || 'Not Translated';
console.log(spanishTranslation);

// nullish
const count = books.reviews.librarything.reviewsCount ?? 'no data';
count;

///////////////////////////////////////////////////
////Optional chaining
// if we are unsure with chaining might not exist, we can always check using optional chaining
// then we can also set default value using nullish

function getTotalReviewCount(book) {
  // checking if reviews exist? then checking goodreads exist?
  const goodreads = book.reviews?.goodreads?.reviewsCount;

  // checking if reviews exist? then checking goodreads exist? then setting all to default value of 0 once its undefined
  const librarything = book.reviews?.librarything?.reviewsCount ?? 0;

  return goodreads + librarything;
}

console.log(getTotalReviewCount(books));

*/

///////////////////////////////////////////////////
// 3 major functional arrays
// dont mutate the original arrays, but creates new array

// map method
const books = getBooks();
books;

const x = [1, 2, 3, 4, 5, 6, 7, 8].map((el) => el * 2);
console.log(x);

const titles = books.map((book) => book.title);
titles;
