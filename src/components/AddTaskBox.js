import '../App.css';
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "/Users/coolkiddo/Desktop/to-do-list/node_modules/react-datepicker/dist/react-datepicker.css";

function AddTaskBox(){
    const [startDate, setStartDate] = useState(new Date());
    return(
        <div className="addTaskBox">
            <input type="text" placeholder="task" className="inputBox"></input>
            <input type="text" placeholder="description" className="inputBox"></input>
            <label className="labelDate">date:</label>
            <div className="dateBox">
                <DatePicker className="datePicker"selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <button className="addButton">add</button>
        </div>
    );
}

export default AddTaskBox