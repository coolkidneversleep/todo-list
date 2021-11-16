import React, { useEffect } from 'react';
import { useState } from 'react';
import '../App.css';

function TaskItem() {

    const [open, setOpen] = useState([]);
    

    const getOpen = () => {
        let x = new Boolean(true);
        setOpen(x);
    };
    useEffect(() => getOpen(), []);

    return (
        <div className="taskCard">
            <button className="taskPart" onClick={getOpen}>
                <input type="checkbox" className="checkTask"></input>

                <label className="taskName">task 1</label>
                <i class="fa fa-angle-down" className="arrowDown"></i>
            </button>
            {Boolean(open) == true ? <div class="description" className="descriptionPart">
                <p className="descriptionText">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div> : null}
        </div>
    );
}

export default TaskItem