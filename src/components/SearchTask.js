import '../App.css';
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "/Users/coolkiddo/Desktop/to-do-list/node_modules/react-datepicker/dist/react-datepicker.css";

function SearchTask() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="searchTask">
      <p className="topic">- Tasks</p>
      <button className="allTaskButton">All tasks</button>
      <div className="sortByDate">
        <label className="labelSortDate">Sort by date:</label>
        <div className="sortDateBox">
          <DatePicker className="datePicker" selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
      </div>
    </div>
  );
}

export default SearchTask