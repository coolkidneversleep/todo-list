import '../App.css';
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from 'moment';
import initializeFirebase from '../firebase';
import { getDatabase, ref, set, get, onValue, push } from "firebase/database";

import "/Users/coolkiddo/Desktop/to-do-list/node_modules/react-datepicker/dist/react-datepicker.css";

function AddTaskBox() {
    const [startDate, setStartDate] = useState(new Date());
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [db, setDB] = useState(null);

    useEffect(() => {
        setDB(getDatabase(initializeFirebase()));

    }, [])

    useEffect(() => {
        if (db != null) {
            console.log(db);
            try {
                onValue(ref(db, 'todos'), (snapshot) => {
                    const data = snapshot.val();
                    console.log(data)
                });
            } catch (error) {
                console.log(error);
            }
        }
    }, [db])
    const handleTaskOnchange = (e) => {
        setTask(e.target.value);
    }
    const handleDescriptionOnchange = (e) => {
        setDescription(e.target.value)
    }
    const createTodo = () => {
        if (task && description && startDate) {
            try {
                push(ref(db, 'todos'), {
                    task,
                    description,
                    startDate: moment(startDate).format('MM/DD/YYYY'),
                    finish: false
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="addTaskBox">
            <input type="text" placeholder="task" onChange={handleTaskOnchange} value={task} className="inputBox"></input>
            <input type="text" placeholder="description" onChange={handleDescriptionOnchange} value={description} className="inputBox"></input>
            <label className="labelDate">date:</label>
            <div className="dateBox">
                <DatePicker className="datePicker" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <button className="addButton" onClick={createTodo}>Add</button>
        </div>
    );
}

export default AddTaskBox