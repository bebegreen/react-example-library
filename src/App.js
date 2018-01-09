import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import moment from 'moment';
import uniqueID from 'shortid';
import AppBar from 'material-ui/AppBar';
import BookList from './components/book-list/BookList';
import FlatButton from 'material-ui/FlatButton';
import EditBookModal from './components/edit-book-modal/EditBookModal';
import DeleteBookModal from './components/delete-book-modal/DeleteBookModal';
import errorMessages from './constants/error-messages';

class App extends Component {
  state = {
    editModalOpen: false,
    deleteModalOpen: false,
    booksData: null,
    currentBook: {
      title: '',
      auther: '',
      date: ''
    },
    bookToDelete: '',
    errors: {
      title: '',
      auther: ''
    }
  }

  async componentDidMount() {
    // try {
    //   const httpResponse = await axios.get(
    //     'http://localhost:8080/MOCK_DATA.json',
    //     {crossdomain: true}
    //   );
    //   this.setState({booksData: httpResponse.data}); 
    
    // } catch (err) {
    //   console.log(err);
    // }
    
    //for deployment
    try {
      const httpResponse = await new Promise(resolve => resolve(mockData))
      this.setState({booksData: httpResponse});
    } catch (err) {
      console.log(err);
    } 
  }

  handleEditbook(book_id) {
    const bookToEdit = this.state.booksData
      .find(book => book.id === book_id);
    
    const {title, auther, date, id} = bookToEdit;

    this.setState({
      currentBook: {
        title,
        auther,
        date,
        id
      },
      editModalOpen: true,
      errors: {
        ...this.state.errors,
        title: '',
        auther: ''
      }
    });
  }

  handleCloseEditModal() {
    this.setState({editModalOpen: false});
  }

  handleBookInfoChanged(e, date) {
    const {currentBook, errors} = this.state;
    // only the date changed (does not send an event)
    console.log(e.target.name); 
    if (!e) {
      this.setState({
        currentBook: {
          ...currentBook,
          date: moment(date).format("DD/MM/YYYY")
        }
      })
    } else {
      this.setState({
        currentBook: {
          ...currentBook,
          [e.target.name]: e.target.value, 
        },
        errors: { 
          ...errors, 
          [e.target.name]: ''
        }
      });
    }
  }

  handleSaveEditedBook(book_id) {
    if (!book_id) {
      this.addBookToBooksData();
    } else {
      this.handleSaveExistingBook(book_id);
    }
  }

  handleSaveExistingBook(book_id) {
    const {
      currentBook: {
        title,
        auther,
        date
      },
      booksData
    } = this.state;

    if (title && auther) {
      const bookToEdit = booksData.find(book => book.id === book_id);
      bookToEdit.title = title;
      bookToEdit.auther = auther;
      bookToEdit.date = date;
      this.setState({editModalOpen: false});

    } else {
      this.handleError();
    }
  }

  handleError() {
    const {
      currentBook: {
        title,
        auther
      },
      errors
    } = this.state;
    if (!title) {
      this.setState({
        errors: {
          ...errors,
          title: errorMessages.title
        }
      })
    }
    if (!auther) {
      this.setState({
        errors: {
          ...errors,
          auther: errorMessages.auther
        }
      })
    }

  }

  addBookToBooksData() {
    let {currentBook, booksData, errors} = this.state;
    const {title, auther} = currentBook;
    if (title && auther) {
      if (booksData.find(book => book.title === title)) {
        // title already exists
        this.setState({
          errors: {
            ...errors,
            title: errorMessages.existingBook
          }
        })
        return;
      }

      currentBook = {
        ...currentBook,
        id: uniqueID.generate(),
        image_url: 'https://picsum.photos/50?random'
      }
      const newData = [...booksData];
      newData.push(currentBook);

      this.setState({booksData: newData, editModalOpen: false})
    
    } else {
      this.handleError();
    }
  }

  handleCancelDelete() {
    this.setState({deleteModalOpen: false});
  }

  deleteBook(book_id) {
    this.setState({deleteModalOpen: true, bookToDelete: book_id});
  }

  handleConfirmDelete() {
    const {booksData, bookToDelete} = this.state;
    const filteredData = booksData.filter(book => book.id !== bookToDelete);
    this.setState({booksData: filteredData, deleteModalOpen: false})
  }

  handleAddBook() {
    this.setState({
      currentBook: {
        title: '',
        auther: '',
        date: moment(new Date()).format("DD/MM/YYYY")
      },
      editModalOpen: true,
      errors: {
        ...this.state.errors,
        title: '',
        auther: ''
      }
    })
  }

  render() {
    const {
      editModalOpen,
      currentBook,
      errors,
      deleteModalOpen,
    } = this.state;

    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="My Library"
            iconElementRight={
              < FlatButton 
                label = "Add a Book!" 
                onClick = {this.handleAddBook.bind(this)} 
              />}
          />

          <BookList
            booksData={this.state.booksData}
            editHandler={this.handleEditbook.bind(this)}
            deleteHandler={this.deleteBook.bind(this)}
          />

          <EditBookModal
            open={editModalOpen}
            onClose={this.handleCloseEditModal.bind(this)}
            data={currentBook}
            onChange={this.handleBookInfoChanged.bind(this)}
            onSave={this.handleSaveEditedBook.bind(this)}
            errorMessage={errors}
          />

          <DeleteBookModal
            open={deleteModalOpen}
            onClose={this.handleCancelDelete.bind(this)}
            onConfirm={this.handleConfirmDelete.bind(this)}
          />

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
