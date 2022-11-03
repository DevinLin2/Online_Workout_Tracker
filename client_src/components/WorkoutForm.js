import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function WorkoutForm({ children }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Create Workout
            </Button>
            <Modal show={show} onHide={handleClose} dialogClassName="workoutModal">
                <Modal.Header closeButton>
                    <Modal.Title>Today's Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
            </Modal>
        </div>
    )
};

export default WorkoutForm;