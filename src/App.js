import './App.css';
import AddTaskBox from './components/AddTaskBox';
import SearchTask from './components/SearchTask';
import TaskItem from './components/TaskItem';
import initializeFirebase from './firebase';
import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, get, onValue, push } from "firebase/database";

function App() {
  const [db, setDB] = useState(null);
  const [todos, setTodo] = useState([]);
    useEffect(() => {
        setDB(getDatabase(initializeFirebase()));
    }, [])
  useEffect(() => {
    if(db) {
      getTodo();
    }
  }, [db])
  const getTodo = () =>{
    onValue(ref(db, 'todos'), (snapshot) => {
      const data = snapshot.val();
      let todos = [];
      for(let key in data) {
        todos.push({
          id: key,
          ...data[key]
        });
      }
      console.log(todos);
      setTodo(todos);
  });

  }
  return (
    <div className="App">
      <p className="title">To-do list.</p>
      <p className="greeting">What needs to be done?</p>
      <AddTaskBox></AddTaskBox>
      <SearchTask></SearchTask>
      
      {todos.map(todo => <TaskItem data={todo}/>)}
      
    </div>
  );
}

export default App;
