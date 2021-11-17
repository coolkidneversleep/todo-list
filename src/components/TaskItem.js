import React, { useEffect } from 'react';
import { useState } from 'react';
import '../App.css';
import editImg from '../images/pen.png';
import deleteImg from '../images/delete.png';
import arrowImg from '../images/down-arrow.png';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DatePicker from "react-datepicker";


import "/Users/coolkiddo/Desktop/to-do-list/node_modules/react-datepicker/dist/react-datepicker.css";

function TaskItem(props) {
    // const [tasks, setTask] =useState('');
    // const getTask = () =>{
    //     const task = props.data.task;
    //     setTask(task);
    // };
    // const [descriptions, setDescription] = useState('');
    // const getDescription = () =>{
    //     const description = props.data.description;
    //     setDescription(description);
    // }
    // const [dates, setDate] = useState('');
    // const getDate = () =>{
    //     const date = props.data.date;
    //     setDate(date);
    // }

    const [startDate, setStartDate] = useState(new Date());
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

    return (
        <div className="taskCard">
            <div className="taskPart" >
                <div className="checkDiv">
                    <input type="checkbox" className="checkTask"></input>
                    <div className="listBox">
                        <label className="taskName">{props.data.task}</label>
                        <p className="date">{props.data.startDate}</p>
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
                                <input type="text" placeholder="task" className="editInputBox"></input>
                                <input type="text" placeholder="description" className="editInputBox"></input>
                                <div className="editSortByDate">
                                    <label className="editLabelSortDate">Sort by date:</label>
                                    <div className="editSortDateBox">
                                        <DatePicker className="datePicker" selected={startDate} onChange={(date) => setStartDate(date)} />
                                    </div>
                                </div>
                                <div className="buttonRow">
                                    <button className="updateButton">update</button>
                                    <button className="cancleButton" onClick={handleCloseEdit}>cancle</button>
                                </div>
                            </div>
                        </Box>
                    </Modal>
                    <button onClick={handleOpenDelete}className="functionButton"><img className="functionImg" src={deleteImg}></img></button>
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
                                    <button className="updateButton">delete</button>
                                    <button className="cancleButton" onClick={handleCloseDelete}>cancle</button>
                                </div>
                            </div>
                        </Box>
                    </Modal>
                    <button onClick={getClick} className="functionButton"><img className="functionImg" src={arrowImg}></img></button>
                </div>
            </div>
            {click === true ? <div class="description" className="descriptionPart">
                <p className="descriptionText">{props.data.description}</p>
            </div> : null}
        </div>
    );
}

export default TaskItem