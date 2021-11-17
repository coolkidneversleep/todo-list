import React, { useEffect } from 'react';
import { useState } from 'react';
import '../App.css';
import editImg from '../images/pen.png';
import deleteImg from '../images/delete.png';
import arrowImg from '../images/down-arrow.png';

function TaskItem() {

    const [open,setOpen] = useState(false);
    

    const getOpen = () => {
        let x = !open;
        setOpen(x);
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
                  <button className="functionButton"><img className="functionImg" src={editImg}></img></button>
                  <button className="functionButton"><img className="functionImg" src={deleteImg}></img></button>
                  <button onClick={getOpen} className="functionButton"><img className="functionImg" src={arrowImg}></img></button>  
                </div>
            </div>
            {open === true ? <div class="description" className="descriptionPart">
                <p className="descriptionText">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div> : null}
        </div>
    );
}

export default TaskItem