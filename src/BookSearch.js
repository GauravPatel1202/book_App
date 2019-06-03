import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import Book from './Book'
import { DebounceInput } from 'react-debounce-input';


class BookSearch extends React.Component {


  state = {
    query: '',
  }

  updateQuery = query => {
  	this.setState({ query: query.trim() })
  }

	render () {
	    const { searchedBooks, submitQuery, changeShelf } = this.props
	    const { query } = this.state
		return (
			<div>
	   			<div className="search-books">
		            <div className="search-books-bar">
		            	<Link to="/" className="close-search">Close</Link>
		            	
			            	<form className="search-books-input-wrapper" onChange={(event) => submitQuery(event.target.value)} >
								<DebounceInput
									debounceTimeout={70}
									type="text" 
									placeholder="Search by title or author"
									value={query}
									onChange={(event) => this.updateQuery(event.target.value)}
								/>
				         		
			              	</form>
		              	
		            </div>
		            <div className="search-books-results">
		            	<ol className="books-grid"></ol>
		            </div>
	          	</div>

	         
	         
	          	<div className="bookshelf">
	                  <div className="bookshelf-books">
	                    <ol className="books-grid">
		                	{searchedBooks.map((book) => 
		                		<Book key={book.id} book={book} changeShelf={changeShelf} />
		                	)}
	                    </ol>
	                  </div>
	                </div>
	            
	            </div>

       )
	}
}

export default BookSearch

