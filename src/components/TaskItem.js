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

function TaskItem() {
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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                        <label className="taskName">task 1</label>
                        <p className="date">11/17/2021</p>
                    </div>
                </div>
                <div className="functionBox">
                    <button onClick={handleOpen} className="functionButton"><img className="functionImg" src={editImg}></img></button>
                    <Modal
                        open={open}
                        onClose={handleClose}
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
                                    <button className="cancleButton" onClick={handleClose}>cancle</button>
                                </div>
                            </div>
                        </Box>
                    </Modal>
                    <button className="functionButton"><img className="functionImg" src={deleteImg}></img></button>
                    <button onClick={getClick} className="functionButton"><img className="functionImg" src={arrowImg}></img></button>
                </div>
            </div>
            {click === true ? <div class="description" className="descriptionPart">
                <p className="descriptionText">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div> : null}
        </div>
    );
}

export default TaskItem