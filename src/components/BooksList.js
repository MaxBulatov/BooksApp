import React, { Component } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import BookItem from './BookItem';
import './BookList.css';

export class BooksList extends Component {
    constructor(props){
        super(props);
        this.state = {
            bookParam: "harrypotter",
            booksArray: [],
            hasError: false,
            loading: false
        }
    }

    fetchData = (searchParam) =>{
        this.setState({loading: true})
        const promise = axios.get('https://www.googleapis.com/books/v1/volumes?q=' + searchParam);
        promise
          .then((response) => {
            // Successful response
            console.log('SUCCESS!', response.data.items);
            this.setState({ booksArray: response.data.items, loading: false });
          })
          .catch((error) => {
            // Error
            this.setState({ hasError: true });
            console.log(this.state.hasError);
          });
    }

    componentDidMount() {
        this.fetchData(this.state.bookParam);
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log("submitted value" + this.state.bookParam);

        this.fetchData(this.state.bookParam);
        
    }

    handleChange = (e) =>{
        this.setState({ bookParam: e.target.value });
        console.log(this.state.bookParam);
    }

    spinner = () =>{
       
    }

    render() {
        console.log(this.state.bookParam);
        return (
            <div id="mainContainer">
                <div id="searchContainer">
                    <h1>Search for books in the input below.</h1>
                    <form onSubmit={this.handleSubmit}>
                        <span>Which Book?</span>
                        <input
                            name="bookParam"
                            value={this.state.bookParam}
                            onChange={this.handleChange}
                        />

                        <button type="submit">Search</button>
                    </form>
                    
                    {this.state.loading ? (<Spinner/>) : <p></p>}
                </div>

                {this.state.booksArray == null ? <h1>Nothing found for {this.state.bookParam}.</h1> 
                :
                (<div>
                    <h1>Here are the results.</h1>
                    <ul>
                        {this.state.booksArray.map((book) => {
                            return (
                            <div key={book.id}>
                                
                                <BookItem 
                                    link={book.volumeInfo.infoLink}
                                    name={book.volumeInfo.title}
                                    description={book.volumeInfo.description}
                                    category={book.volumeInfo.categories}
                                    image={book.volumeInfo.imageLinks}
                                    thumbnail={book.volumeInfo.imageLinks.thumbnail}
                                />
                            </div>
                            );
                        })}
                    </ul>
                </div>)
                } 

            </div>
        )
    }
}

export default BooksList
