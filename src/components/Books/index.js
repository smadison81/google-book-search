import React, { Component } from "react";
import BookList from "../BookList";
import SearchBox from "../SearchBox";
import request from "superagent";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchField: "",
      sort: ""
    };
  }
  componentDidMount() {
    request
      .get("https://www.googleapis.com/books/v1/volumes")
      .query({ q: this.state.searchField })
      .then(data => {
        this.setState({ books: [...data.body.items] });
      });
  }

  handleSubmit = e => {
    if(e === null) {
      return null
    }
    e.preventDefault();
    request
      .get("https://www.googleapis.com/books/v1/volumes")
      .query({ q: this.state.searchField })
      .then(data => {
        console.log(data);
        this.setState({ books: [...data.body.items] });
      });
  };

  handleChange = e => {
    this.setState({ searchField: e.target.value });
  };

  handleSort = e => {
    this.setState({ sort: e.target.value });
  };

  render() {
    const filteredBooks = this.state.books.sort((a, b) => {
      if (this.state.sort == "Newest") {
        console.log("in newest");
        return (
          parseInt(b.volumeInfo.publishedDate.substring(0, 4)) -
          parseInt(a.volumeInfo.publishedDate.substring(0, 4))
        );
      } else if (this.state.sort == "Oldest") {
        return (
          parseInt(a.volumeInfo.publishedDate.substring(0, 4)) -
          parseInt(b.volumeInfo.publishedDate.substring(0, 4))
        );
      }

      return;
    });

    return (
      <div className="wrapper">
        <SearchBox
          data={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleSort={this.handleSort}
        />
        <BookList books={filteredBooks} />
      </div>
    );
  }
}

export default Books;
