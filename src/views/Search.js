import React from 'react';
import * as BooksAPI from '../BooksAPI';
import Book from '../components/Book';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  state = {
    query: '',
    booksFound: [],
    NoResults: false,
  }

  //Hanldle's user search input
  handleChange = event => {
    const query = event.target.value;
    this.setState({
      query,
    })

    //If user entered query, search BooksAPI with same query 
    if (query) {
      BooksAPI.search(query)
        .then(booksArr => (
          booksArr.length > 0 ?
            this.setState({ booksFound: booksArr, NoResults: false }) :
            this.setState({ booksFound: [], NoResults: true })
        ))
    }
    //If no query then reset to default state values
    else {
      this.setState({ booksFound: [], NoResults: false });
    }
  }

  render() {
    const { changeShelf, books } = this.props;
    const { query, booksFound, NoResults } = this.state;
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to='/'>Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="search-books-results">
            {/* If no results are returned, display error message */}
            {NoResults ?
              <div className='book-cover-title'>
                <p>The search <b>'{this.state.query}'</b> returned no results. Try a different search!</p>
              </div>
              : query !== '' ?
                <div className='book-cover-title'>
                  <p><b>{booksFound.length}</b> books found</p>
                </div>
                : ''
            }
            <ol className="books-grid">
              {/* If the booksFound array recieved any books then display books */}
              {(booksFound.length > 0 && query !== '') && booksFound.map(book => {
                return (
                  <li key={book.id}>
                    <Book
                      book={book}
                      changeShelf={changeShelf}
                      books={books}
                    />
                  </li>)
              })}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default Search;

