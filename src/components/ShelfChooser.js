import React from 'react';

class ShelfChooser extends React.Component {
  handleChange = event => {
    this.props.changeShelf(this.props.book, event.target.value)
  }

  render() {
    const { book, shelf, books } = this.props;
    //If shelf is truthy let shelfValue = shelf, otherwsie a default value of 'none' is set
    let shelfValue = shelf ? shelf : 'none';

    //If there are books in the user's library, check if any of those books appear in user's search
    if (books && books.length > 0) {
      for (const b of books) {
        //If a book is found, update it's shelfValue to match the value set in the user's library
        if (b.id === book.id) {
          shelfValue = b.shelf;
        }
      }
    }

    return (
      <div>
        <div className="book-shelf-changer">
          <select onChange={this.handleChange} defaultValue={shelfValue}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
    )
  }
}

export default ShelfChooser;