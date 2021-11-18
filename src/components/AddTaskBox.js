import '../App.css';
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from 'moment';
import initializeFirebase from '../firebase';
import { getDatabase, ref, set, get, onValue, push, remove } from "firebase/database";
import "/Users/coolkiddo/Desktop/to-do-list/node_modules/react-datepicker/dist/react-datepicker.css";
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function AddTaskBox() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

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
            if (task && startDate) {
                try {
                    push(ref(db, 'todos'), {
                        task,
                        description,
                        startDate: moment(startDate).format('MM/DD/YYYY'),
                        finish: false
                    });
                    setTask('');
                    setDescription('');
                    setStartDate(new Date());

                } catch (error) {
                    console.log(error);
                }
            }
        }



        return (
            <div className="addTaskBox">
                <input required type="text" placeholder="task *" onChange={handleTaskOnchange} value={task} className="inputBox" autoFocus ></input>
                <input type="text" placeholder="description" onChange={handleDescriptionOnchange} value={description} className="inputBox"></input>

                <label className="labelDate">date * :</label>
                <div className="dateBox">
                    <DatePicker className="datePicker" selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <button className="addButton" onClick={task !== "" ? createTodo : handleClickOpen}> Add</button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please fill in your tasks 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
}

export default AddTaskBox