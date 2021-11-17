import '../App.css';

function SearchTask(){
    return(
        <div className="searchTask">
        <p className="topic">- Tasks</p>
        <button className="allTaskButton">All tasks</button>
        <button className="allTaskButton">Sort by date</button>
      </div>
    );
}

export default SearchTask