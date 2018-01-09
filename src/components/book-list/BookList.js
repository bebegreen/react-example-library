import React, {Component} from 'react';
import Book from './book/Book';
import {BooksGrid} from './bookList.styled';

export default class BookList extends Component {

  render() {
    const {booksData, editHandler, deleteHandler} = this.props;
    return (
      <div>
        <BooksGrid>
          {
            booksData && booksData.map(book => (<Book
            key={book.id}
            book={book}
            editHandler={editHandler}
            deleteHandler={deleteHandler}/>))
          }
        </BooksGrid>
      </div>
    );
  }
}
