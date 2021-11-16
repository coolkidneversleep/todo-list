import '../App.css';

function SearchTask(){
    return(
        <div className="searchTask">
        <p className="topic">- Tasks</p>
        <button className="allTaskButton">all tasks</button>
        <button className="allTaskButton">sort by date</button>
      </div>
    );
}

export default SearchTask