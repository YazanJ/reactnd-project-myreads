import React from 'react';
import BookShelf from '../components/BookShelf';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Home = props => {
  const { books, changeShelf } = props;
  //An array of n 'shelfTypes' to map n shelves
  const shelfTypes = [
    { type: 'currentlyReading', name: 'Currently Reading' },
    { type: 'wantToRead', name: 'Want to Read' },
    { type: 'read', name: 'Read' }
  ];

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {/* Map each 'shelfType' to a BookShelf component */}
          {shelfTypes.map((shelf, index) => {
            const filteredBooks = books.filter(book => book.shelf === shelf.type)
            return <BookShelf
              key={index}
              shelf={shelf}
              filteredBooks={filteredBooks}
              changeShelf={changeShelf}
            />
          })}
        </div>
        {/* Link tag to Search page '/search' */}
        <Link to='/search'>
          <div className="open-search">
            <button>Add a book</button>
          </div>
        </Link>
      </div>
        )}
    </div>
  )
}

Home.propTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
}

export default Home;