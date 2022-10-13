import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import BookTable from './components/BookTable';
import DisplayBoard from './components/DisplayBoard';
import CreateBook from './components/CreateBook';
import { getAllBooks, createBook } from './services/BookService';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoPage from './TodoPage';

function App () {

  const [bookShelf, setBookShelf] = useState({});
  const [books, setBooks] = useState([]);
  const [numberOfBooks, setNumberBooks] = useState(0);

  const handleSubmit = () => {
      createBook(bookShelf)
        .then(() => {
          setNumberBooks(numberOfBooks+1);
      });
  }

  const getAllBook = () => {
    getAllBooks()
      .then(data => {
        setBooks(data);
        setNumberBooks(data.length);
      });
  }

  const handleOnChangeForm = (e) => {
      let inputData = bookShelf;
      if (e.target.name === 'book') {
        bookShelf.book = e.target.value;
      } else if (e.target.name === 'category') {
        bookShelf.category = e.target.value;
      } else if (e.target.name === 'author') {
        bookShelf.author = e.target.value;
      }
      setBookShelf(inputData);
  }

  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<div className="main-wrapper">
        <div className="main">
          <Header />
          <CreateBook 
            bookShelf={bookShelf}
            onChangeForm={handleOnChangeForm}
            handleSubmit={handleSubmit}
          />
          <DisplayBoard 
            numberOfBooks={numberOfBooks} 
            getAllBook={getAllBook} 
          />
          <BookTable books={books} />
          <Footer />
        </div>
      </div>}/>
      <Route path='/todos' element={<TodoPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
