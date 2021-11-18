import './App.css';
import AddTaskBox from './components/AddTaskBox';
import SearchTask from './components/SearchTask';
import TaskItem from './components/TaskItem';
import initializeFirebase from './firebase';
import moment from 'moment';
import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, get, onValue, push } from "firebase/database";

function App() {
  const [db, setDB] = useState(null);
  const [showData, setShowData] = useState([]);
  const [todos, setTodo] = useState([]);
  useEffect(() => {
    setDB(getDatabase(initializeFirebase()));
  }, [])
  useEffect(() => {
    if (db) {
      getTodo();
    }
  }, [db])
  const clearFilter = () => {
    setShowData(todos);
  }
  const filterTodo = (date) => {
    const todoFiltered = todos.filter(todo => todo.startDate === moment(date).format('MM/DD/YYYY'))
    setShowData(todoFiltered);
  }
  const getTodo = () => {
    onValue(ref(db, 'todos'), (snapshot) => {
      const data = snapshot.val();
      let todos = [];
      for (let key in data) {
        todos.push({
          id: key,
          ...data[key]
        });
      }
      todos = todos.sort((a, b) => {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      })
      console.log(todos);
      setTodo(todos);
      setShowData(todos);
    });

  }
  return (
    <div className="App">
      <p className="title">To-do list.</p>
      <p className="greeting">What needs to be done?</p>
      <AddTaskBox></AddTaskBox>
      <SearchTask filterTodo={filterTodo} clearFilter={clearFilter}></SearchTask>

      {showData.map(todo => <TaskItem data={todo} key={todo.id} />)}

    </div>
  );
}

export default App;
