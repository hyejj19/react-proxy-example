import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import BookTable from './components/BookTable';
import DisplayBoard from './components/DisplayBoard';
import CreateBook from './components/CreateBook';
import { getAllTodos, createTodo } from './services/Todos';
import Footer from './components/Footer';

function TodoPage () {

  const [todoList, setTodoList] = useState({});
  const [todo, setTodos] = useState([]);
  const [numberOfTodos, setNumberTodos] = useState(0);

  const handleSubmit = () => {
    createTodo(todoList)
        .then(() => {
            setNumberTodos(numberOfTodos+1);
      });
  }

  const getAllTodo = () => {
    getAllTodos()
      .then(data => {
        setTodos(data);
        setNumberTodos(data.length);
      });
  }

  const handleOnChangeForm = (e) => {
      let inputData = todoList;
      if (e.target.name === 'book') {
        todoList.todo = e.target.value;
      } else if (e.target.name === 'category') {
        todoList.category = e.target.value;
      } else if (e.target.name === 'author') {
        todoList.author = e.target.value;
      }
      setTodoList(inputData);
  }



  
  return (
    <div className="main-wrapper">
      <div className="main">
        <h1>TodoList</h1>
        <Header />
        <CreateBook 
          bookShelf={todoList}
          onChangeForm={handleOnChangeForm}
          handleSubmit={handleSubmit}
        />
        <DisplayBoard 
          numberOfBooks={numberOfTodos} 
          getAllBook={getAllTodo} 
        />
        <BookTable books={todo} />
        <Footer />
      </div>
    </div>
  );
}

export default TodoPage;
