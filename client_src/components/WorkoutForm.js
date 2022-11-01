import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
// import styled from "styled-components";

function WorkoutForm({ show, onClose, children, title }) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);
    
    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    }

    const workoutFormContent = show ? (
        <div id="StyledModalOverlay">
            <div id="StyledModal">
                <div id="StyledModalHeader">
                    <a href="#" onClick={handleCloseClick}>x</a>
                </div>
                {title && <div id="StyledModalTitle">{title}</div>}
                <div id="StyledModalBody">{children}</div>
            </div>
        </div>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            workoutFormContent,
            document.getElementById("workout-form-root")
        );
    } else {
        return null;
    }
};

export default WorkoutForm;