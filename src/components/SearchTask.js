import '../App.css';
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "/Users/coolkiddo/Desktop/to-do-list/node_modules/react-datepicker/dist/react-datepicker.css";

function SearchTask(props) {
  const [startDate, setStartDate] = useState(new Date());
  const filterByDate = (date) =>{
    setStartDate(date);
    props.filterTodo(date);
  }
  return (
    <div className="searchTask">
      <p className="topic">- Tasks</p>
      <button className="allTaskButton" onClick={props.clearFilter}>All tasks</button>
      <div className="sortByDate">
        <label className="labelSortDate">Filter by date : </label>
        <div className="sortDateBox">
          <DatePicker className="datePicker" selected={startDate} onChange={filterByDate} />
        </div>
      </div>
    </div>
  );
}

export default SearchTask