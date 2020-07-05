import React from 'react';
import ShelfChooser from './ShelfChooser';
import PropTypes from 'prop-types';
import defaultBookImage from '../images/default_book_cover.jpg';

const Book = props => {
  const { book, changeShelf, shelfType, books } = props;
  const imageLinks = book.imageLinks;
  //If an imageLink property exists then use it, otherwsie use the default image 
  const image = (imageLinks && imageLinks.smallThumbnail) ? `url(${imageLinks.smallThumbnail})` : `url(${defaultBookImage})`;
  
  return (
    <div>
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: image }}>
          </div>
          <ShelfChooser
            book={book}
            changeShelf={changeShelf}
            shelf={shelfType}
            books={books}
          />
        </div>
        <div className="book-title"><b>{book.title}</b></div>
        <div className="book-authors">
          {book.authors ?
            book.authors.map(author =>
              <div key={author}>
                {author}
              </div>)
            : <div>No Author Provided</div>
          }
        </div>
      </div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  changeShelf: PropTypes.func.isRequired,
}

export default Book;