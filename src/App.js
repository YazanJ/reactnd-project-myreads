import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Home from './views/Home';
import Search from './views/Search';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  //The 'books' array will be used to store all books that are in the user's library 
  state = {
    books: [],
  }

  //Fetch all books from BooksAPI then update state with books
  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({
          books
        });
      });
  };

  //Update new book via BooksAPI and add updated book to state 
  changeShelf = (updatedBook, shelf) => {
    BooksAPI.update(updatedBook, shelf)
      .then(responseData => {
        // Assign book to the correct shelf value
        updatedBook.shelf = shelf;
        //Remove book with outdated shelf value from books[] and add the updated book
        this.setState(curState => ({
          books: curState.books.filter(book => book.id !== updatedBook.id).concat(updatedBook)
        }));
      });
  };

  render() {
    return (
      <div>
        {/* 2 Routes: 1 for home page '/' and 1 for search '/search' */}
        <Route exact path='/' render={() => (
          <div>
            <Home
              books={this.state.books} changeShelf={this.changeShelf}
            />
          </div>
        )} />
        <Route exact path='/search' render={() => (
          <Search
            changeShelf={this.changeShelf}
            books={this.state.books}
          />)}
        />
      </div>
    );
  }
}

export default BooksApp;