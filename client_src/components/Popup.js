import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Popup({
    show,
    onHide,
    isWorkoutModal,
    isEditModal,
    isViewModal,
    isMealModal,
    isMealEditModal,
    isMealViewModal,
    newWorkout,
    newMeal,
    setNewMeal,
    setNewWorkout,
    newExercise,
    meals,
    handleMealsForm,
    handleExerciseForm,
    addFields,
    removeFields,
    handleSubmit,
    handleDelete,
    handleEdit,
}) {
    return (
        <Modal show={show} onHide={onHide} scrollable={true} animation={false} dialogClassName="workoutModal">
            {isWorkoutModal && <Modal.Header closeButton>
                <Modal.Title>Record Workout</Modal.Title>
            </Modal.Header>}
            {isEditModal && <Modal.Header closeButton>
                <Modal.Title>Edit Workout</Modal.Title>
            </Modal.Header>}
            {isViewModal && <Modal.Header closeButton>
                <Modal.Title>View Workout</Modal.Title>
            </Modal.Header>}
            {isMealModal && <Modal.Header closeButton>
                <Modal.Title>Meal Log</Modal.Title>
            </Modal.Header>}
            {isMealEditModal && <Modal.Header closeButton>
                <Modal.Title>Edit Meal Log</Modal.Title>
            </Modal.Header>}
            {isMealViewModal && <Modal.Header closeButton>
                <Modal.Title>View Meal Log</Modal.Title>
            </Modal.Header>}
            {(isMealModal || isMealEditModal) && <Modal.Body>
                <Form>
                    <Container>
                        <Row>
                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>Date:</Form.Label>
                                <Form.Control type="date" value={moment(newMeal.date).format("YYYY-MM-DD")} onChange={(e) => setNewMeal({ ...newMeal, date: e.target.value })} />
                            </Form.Group>
                        </Row>
                        {meals.map((input, index) => {
                            return (
                                <Row key={index}>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" controlId="meal">
                                            <Form.Label>Meal:</Form.Label>
                                            <Form.Control type="text" name="meal" placeholder="Enter meal name eg. lunch..." value={input.meal} onChange={event => handleMealsForm(index, event)} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" controlId="calories">
                                            <Form.Label>Calories Consumed:</Form.Label>
                                            <Form.Control type="text" name="calories" placeholder="Enter calories consumed..." value={input.calories} onChange={event => handleMealsForm(index, event)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            )
                        })}
                        <Row>
                            <Col xs={6}>
                                <ButtonGroup aria-label="mealFormChangeButtons">
                                    <Button variant="primary" onClick={addFields}>Add Meal</Button>
                                    <Button variant="danger" onClick={removeFields}>Remove Meal</Button>
                                </ButtonGroup>
                            </Col>
                            <Col xs={6}>
                                <ButtonGroup className="float-end" aria-label="mealSubmitButtons">
                                    {isMealEditModal && <Button variant="danger" onClick={handleDelete}>Delete Meal Log</Button>}
                                    <Button variant="success" onClick={handleSubmit}>Enter</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Modal.Body>}
            {(isWorkoutModal || isEditModal) && <Modal.Body>
                <Form>
                    <Container>
                        <Row>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Label>Workout name:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter workout name..." value={newWorkout.title} onChange={(e) => setNewWorkout({ ...newWorkout, title: e.target.value })} />
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <Form.Group className="mb-3" controlId="date">
                                    <Form.Label>Date:</Form.Label>
                                    <Form.Control type="date" value={moment(newWorkout.date).format("YYYY-MM-DD")} onChange={(e) => setNewWorkout({ ...newWorkout, date: e.target.value })} />
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <Form.Group className="mb-3" controlId="startTime">
                                    <Form.Label>Start Time:</Form.Label>
                                    <Form.Control type="time" value={newWorkout.startTime} onChange={(e) => setNewWorkout({ ...newWorkout, startTime: e.target.value })} />
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <Form.Group className="mb-3" controlId="endTime">
                                    <Form.Label>End Time:</Form.Label>
                                    <Form.Control type="time" value={newWorkout.endTime} onChange={(e) => setNewWorkout({ ...newWorkout, endTime: e.target.value })} />
                                </Form.Group>
                            </Col>
                        </Row>
                        {newExercise.map((input, index) => {
                            return (
                                <Row key={index}>
                                    <Col xs={3}>
                                        <Form.Group className="mb-3" controlId="exercise">
                                            <Form.Label>Exercise:</Form.Label>
                                            <Form.Control type="text" name="exercise" placeholder="Enter exercise..." value={input.exercise} onChange={event => handleExerciseForm(index, event)} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Group className="mb-3" controlId="sets">
                                            <Form.Label>Sets done:</Form.Label>
                                            <Form.Control type="text" name="sets" placeholder="Enter sets done..." value={input.sets} onChange={event => handleExerciseForm(index, event)} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Group className="mb-3" controlId="reps">
                                            <Form.Label>Reps done:</Form.Label>
                                            <Form.Control type="text" name="reps" placeholder="Enter reps done..." value={input.reps} onChange={event => handleExerciseForm(index, event)} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Group className="mb-3" controlId="weight">
                                            <Form.Label>Weight Used (lbs):</Form.Label>
                                            <Form.Control type="text" name="weight" placeholder="Enter weight used..." value={input.weight} onChange={event => handleExerciseForm(index, event)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            )
                        })}
                        <Row>
                            <Col xs={6}>
                                <ButtonGroup aria-label="formChangeButtons">
                                    <Button variant="primary" onClick={addFields}>Add Exercise</Button>
                                    <Button variant="danger" onClick={removeFields}>Remove Exercise</Button>
                                </ButtonGroup>
                            </Col>
                            <Col xs={6}>
                                <ButtonGroup className="float-end" aria-label="workoutSubmitButtons">
                                    {isEditModal && <Button variant="danger" onClick={handleDelete}>Delete Workout</Button>}
                                    <Button variant="success" onClick={handleSubmit}>Enter</Button>
                                </ButtonGroup>
                                {/* {isEditModal && <Button className="float-end" variant="danger" onClick={handleDelete}>Delete Workout</Button>} */}
                            </Col>
                            {/* <Col xs={1}>
                                <Button className="float-end" variant="success" onClick={handleSubmit}>Enter</Button>
                            </Col> */}
                        </Row>
                    </Container>
                </Form>
            </Modal.Body>}
            {isViewModal && <Modal.Body>
                <Container>
                    <Card>
                        <Card.Header>Workout Information</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={3}>
                                    <strong>Title:</strong> {newWorkout.title}
                                </Col>
                                <Col xs={3}>
                                    <strong>Date:</strong> {newWorkout.date}
                                </Col>
                                <Col xs={3}>
                                    <strong>Start Time:</strong> {newWorkout.startTime}
                                </Col>
                                <Col xs={3}>
                                    <strong>End Time:</strong> {newWorkout.endTime}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <p></p>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Exercise Name</th>
                                <th>Sets</th>
                                <th>Reps</th>
                                <th>Weight Used (lbs)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newExercise.map((exercise) => {
                                return (
                                    <tr>
                                        <td>{exercise.exercise}</td>
                                        <td>{exercise.sets}</td>
                                        <td>{exercise.reps}</td>
                                        <td>{exercise.weight}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Button className="float-end" variant="primary" onClick={handleEdit}>Edit Workout</Button>
                </Container>
            </Modal.Body>}
            {isMealViewModal && <Modal.Body>
                <Container>
                    <Card>
                        <Card.Header>Meal Log Information</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={3}>
                                    <strong>Date:</strong> {newMeal.date}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <p></p>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Meal Name</th>
                                <th>Calories Consumed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meals.map((meal) => {
                                return (
                                    <tr>
                                        <td>{meal.meal}</td>
                                        <td>{meal.calories}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Button className="float-end" variant="primary" onClick={handleEdit}>Edit Meal Log</Button>
                </Container>
            </Modal.Body>}
        </Modal>
    )
}