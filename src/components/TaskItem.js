import React, { useEffect } from 'react';
import { useState } from 'react';
import '../App.css';
import editImg from '../images/pen.png';
import deleteImg from '../images/delete.png';
import arrowImg from '../images/down-arrow.png';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DatePicker from "react-datepicker";
import initializeFirebase from '../firebase';
import moment from 'moment';
import { getDatabase, ref, set, get, onValue, push, remove, update } from "firebase/database";

import "/Users/coolkiddo/Desktop/to-do-list/node_modules/react-datepicker/dist/react-datepicker.css";

function TaskItem(props) {
    const [db, setDB] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    let today = new Date();
    useEffect(() => {
        setDB(getDatabase(initializeFirebase()));

    }, [])

    useEffect(() => {
        if (props.data.task) {
            setTask(props.data.task);
        }
        if (props.data.description) {
            setDescription(props.data.description);
        }
        if (props.data.startDate) {
            setStartDate(new Date(props.data.startDate));
        }
    }, [props])


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        heigh: 500,
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        p: 4,
        padding: '20px'
    };
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [openDelete, setOpenDelete] = React.useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const [click, setClick] = useState(false);

    const getClick = () => {
        let x = !click;
        setClick(x);
    };
    const handleEditTask = (e) => setTask(e.target.value);
    const handleEditDescription = (e) => setDescription(e.target.value);

    const updateTask = (taskId) => {
        if (taskId != null) {
            try {
                set(ref(db, 'todos/' + taskId), {
                    task: task,
                    description: description,
                    startDate: moment(startDate).format('MM/DD/YYYY'),
                    finish: false
                });
                handleCloseEdit()
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    const deleteTask = (taskId) => {
        if (taskId != null) {
            try {
                remove(ref(db, 'todos/' + taskId));
                handleCloseDelete();
            } catch (error) {
                console.log(error);
            }
        }
    }

    const completeTask = (taskId)=>{
        try {
            update(ref(db, 'todos/' + taskId), {
                task: task,
                description: description,
                startDate: moment(startDate).format('MM/DD/YYYY'),
                finish: !props.data.finish
            });
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="taskCard">
            <div className="taskPart" >
                <div className="checkDiv">
                    <input type="checkbox" checked={props.data.finish} onChange={()=>completeTask(props.data.id)} className="checkTask"></input>
                    <div className="listBox">
                        <label className="taskName" id={props.data.finish === true ? "complete":""}>{props.data.task}</label>
                        <p className={today.getTime() - new Date(props.data.startDate).getTime() < 0 ?"date":"overdueDate"}>{props.data.startDate}</p>
                    </div>
                </div>
                <div className="functionBox">
                    <button onClick={handleOpenEdit} className="functionButton"><img className="functionImg" src={editImg}></img></button>
                    <Modal
                        open={openEdit}
                        onClose={handleCloseEdit}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div className="editBox">
                                <p className="editTitle">Edit your task</p>
                                <input type="text" placeholder={props.data.task} className="editInputBox" onChange={handleEditTask} value={task} autoFocus></input>
                                <input type="text" placeholder={props.data.description} className="editInputBox" onChange={handleEditDescription} value={description}></input>
                                <div className="editSortByDate">
                                    <label className="editLabelSortDate">Sort by date:</label>
                                    <div className="editSortDateBox">
                                        <DatePicker className="datePicker" value={startDate} selected={startDate} onChange={(date) => setStartDate(date)} />
                                    </div>
                                </div>
                                <div className="buttonRow">
                                    <button className="updateButton" onClick={() => { updateTask(props.data.id) }}>update</button>
                                    <button className="cancleButton" onClick={handleCloseEdit}>cancel</button>
                                </div>
                            </div>
                        </Box>
                    </Modal>
                    <button onClick={handleOpenDelete} className="functionButton"><img className="functionImg" src={deleteImg}></img></button>
                    <Modal
                        open={openDelete}
                        onClose={handleCloseDelete}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div className="editBox">
                                <p className="editTitle">Delete this task?</p>
                                <div className="buttonRow">
                                    <button className="updateButton" onClick={() => deleteTask(props.data.id)}>delete</button>
                                    <button className="cancleButton" onClick={handleCloseDelete}>cancel</button>
                                </div>
                            </div>
                        </Box>
                    </Modal>
                    {props.data.description !== "" ? <button onClick={getClick} className="functionButton"><img className="functionImg" src={arrowImg}></img></button> : null}
                </div>
            </div>
            {click === true && props.data.description !== "" ? <div class="description" className="descriptionPart">
                <p className="descriptionText">{props.data.description}</p>
            </div> : null}
        </div>
    );
}

export default TaskItem