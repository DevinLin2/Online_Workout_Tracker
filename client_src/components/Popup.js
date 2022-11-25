import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';

export default function Popup({ 
    show, 
    onHide, 
    isWorkoutModal, 
    isEditModal,
    isViewModal,
    newWorkout, 
    setNewWorkout, 
    newExercise, 
    handleExerciseForm, 
    addFields, 
    removeFields, 
    handleSubmit,
    handleDelete
}) {
    return (
        <Modal show={show} onHide={onHide} dialogClassName="workoutModal">
            {isWorkoutModal && <Modal.Header closeButton>
                <Modal.Title>Record Workout</Modal.Title>
            </Modal.Header>}
            {isEditModal && <Modal.Header closeButton>
                <Modal.Title>Edit Workout</Modal.Title>
            </Modal.Header>}
            {isViewModal && <Modal.Header closeButton>
                <Modal.Title>View Workout</Modal.Title>
            </Modal.Header>}
            {(isWorkoutModal || isEditModal) && <Modal.Body>
                <Form>
                    <Container>
                        <Row>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Label>Workout name:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter workout name..." value={newWorkout.title} onChange={(e) => setNewWorkout({...newWorkout, title: e.target.value})}/>
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <Form.Group className="mb-3" controlId="date">
                                    <Form.Label>Date:</Form.Label>
                                    <Form.Control type="date" value={moment(newWorkout.date).format("YYYY-MM-DD")} onChange={(e) => setNewWorkout({...newWorkout, date: e.target.value})}/>
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <Form.Group className="mb-3" controlId="startTime">
                                    <Form.Label>Start Time:</Form.Label>
                                    <Form.Control type="time" value={newWorkout.startTime} onChange={(e) => setNewWorkout({...newWorkout, startTime: e.target.value})}/>
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <Form.Group className="mb-3" controlId="endTime">
                                    <Form.Label>End Time:</Form.Label>
                                    <Form.Control type="time" value={newWorkout.endTime} onChange={(e) => setNewWorkout({...newWorkout, endTime: e.target.value})}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        {newExercise.map((input, index) => {
                            return (
                                <Row key={index}>
                                    <Col xs={3}>
                                        <Form.Group className="mb-3" controlId="exercise">
                                            <Form.Label>Exercise:</Form.Label>
                                            <Form.Control type="text" name="exercise" placeholder="Enter exercise..." value={input.exercise} onChange={event => handleExerciseForm(index, event)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Group className="mb-3" controlId="sets">
                                            <Form.Label>Sets done:</Form.Label>
                                            <Form.Control type="text" name="sets" placeholder="Enter sets done..." value={input.sets} onChange={event => handleExerciseForm(index, event)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Group className="mb-3" controlId="reps">
                                            <Form.Label>Reps done:</Form.Label>
                                            <Form.Control type="text" name="reps" placeholder="Enter reps done..." value={input.reps} onChange={event => handleExerciseForm(index, event)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Group className="mb-3" controlId="reps">
                                            <Form.Label>Weight Used:</Form.Label>
                                            <Form.Control type="text" name="weight" placeholder="Enter weight used..." value={input.weight} onChange={event => handleExerciseForm(index, event)}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            )
                        })}
                        <Row>
                            <Col xs={3}>
                                <Button variant="primary" onClick={addFields}>Add exercise</Button>
                            </Col>
                            <Col xs={5}>
                                <Button variant="danger" onClick={removeFields}>Remove exercise</Button>
                            </Col>
                            <Col xs={4}>
                                <Button className="float-end" variant="success" onClick={handleSubmit}>Enter</Button>
                                {isEditModal && <Button className="float-end" variant="danger" onClick={handleDelete}>Delete Workout</Button>}
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Modal.Body>}
            {isViewModal && <Modal.Body>
                <Container>
                    {newWorkout.title}
                    {newExercise[0].weight}
                </Container>
            </Modal.Body>}
        </Modal>
    )
}