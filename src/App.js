import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import BookSearch from './BookSearch'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
    filteredBooks: [],
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  changeShelf = (book, shelf) => {

  

    BooksAPI.update(book, shelf).then(response => {
      book.shelf = shelf
      this.setState((state) => ({
        books: this.state.books.filter((b) => b.id !== book.id).concat([ book ])
      }))
    })
  }

  submitQuery = (query, searchedBooks) => {
    if (query !== '') {
      this.setState({ query: query })
      const { books } = this.state

      BooksAPI.search(query, 100).then(searchedBooks => {
        if (searchedBooks.error) {
          this.setState({searchedBooks: []});
        } else {
          searchedBooks.map((filteredBooks) => {
            let bookOnShelf = books.find((b) => b.id === filteredBooks.id);
          
            if (bookOnShelf) {
               filteredBooks.shelf = bookOnShelf.shelf;
            } else {
               filteredBooks.shelf = 'none';
            }
         })
         this.setState({ searchedBooks: searchedBooks })
       }
      }).catch(e => {this.setState({ searchedBooks: [] })
      })
    }
  }

  render() {
    
    return (

      <div className="app">

          <Route exact path="/" render={({ history }) => (
            <BookList books={this.state.books} 
                      changeShelf={this.changeShelf}
                      /> )} />
                      

          <Route exact path="/search" render={({ history }) => (
            <BookSearch searchedBooks={this.state.searchedBooks}
                        changeShelf={this.changeShelf}
                        submitQuery={this.submitQuery}
                        /> )} />
          
      </div>
    )
  }
}

export default BooksApp
