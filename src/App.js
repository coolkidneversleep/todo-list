import './App.css';
import AddTaskBox from './components/AddTaskBox';
import SearchTask from './components/SearchTask';
import TaskItem from './components/TaskItem';

function App() {
  return (
    <div className="App">
      <p className="title">to-do list.</p>
      <p className="greeting">what needs to be done?</p>
      <AddTaskBox></AddTaskBox>
      <SearchTask></SearchTask>
      <TaskItem></TaskItem>
    </div>
  );
}

export default App;
