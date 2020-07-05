import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';


class BookShelf extends React.Component {
  render() {
    const { shelf, filteredBooks, changeShelf } = this.props;
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelf.name}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {filteredBooks.map(book => {
                return <li key={book.id}>
                  <Book book={book} changeShelf={changeShelf} shelfType={shelf.type} />
                </li>
              })}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  filteredBooks: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired
}

export default BookShelf;
