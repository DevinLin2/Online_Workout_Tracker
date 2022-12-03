import { useEffect, useState, useRef, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import moment from 'moment';
import Popup from "../components/Popup";
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast, ToastContainer } from 'react-nextjs-toast'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDumbbell,
} from "@fortawesome/free-solid-svg-icons";

const locales = {
    "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const events = [];
let oldDate;
let oldStartTime;
let oldEndTime;
let oldTitle;
let isDuplicateWorkout;
let emptyName;
let emptyDate;
let emptyTime;
let emptyExercises;
let oldMealDate;

export async function getStaticProps() {
    const workoutRes = await fetch('http://localhost:3000/api/workoutHandler');
    const workoutProps = await workoutRes.json();
    const mealRes = await fetch('http://localhost:3000/api/mealHandler');
    const mealProps = await mealRes.json();
    const props = { workoutProps, mealProps }
    return {
        props: {
            props,
        },
    }
}

export default function Homepage({ props }) {

    useEffect(() => {
        const events = [];
        const workoutProps = Object.entries(props.workoutProps);
        const mealProps = Object.entries(props.mealProps);
        for (let i = 0; i < workoutProps.length; i++) {
            const data = {};
            data.title = workoutProps[i][1].title;
            data.startDate = moment(workoutProps[i][1].date + " " + workoutProps[i][1].startTime).toDate();
            data.endDate = moment(workoutProps[i][1].date + " " + workoutProps[i][1].endTime).toDate();
            data.exercises = workoutProps[i][1].exercises;
            events.push(data);
        }
        for (let i = 0; i < mealProps.length; i++) {
            const data = {};
            data.title = "Meal";
            data.startDate = moment(mealProps[i][1].date).toDate();
            data.endDate = moment(mealProps[i][1].date).toDate();
            data.meals = mealProps[i][1].meals;
            events.push(data);
        }
        setAllEvents(events);
    }, []);

    useEffect(() => {
        return () => {
            window.clearTimeout(clickRef?.current)
        }
    }, [])

    const [newWorkout, setNewWorkout] = useState({ title: "", date: "", startTime: "", endTime: "", exercises: [] });
    const [newExercise, setNewExercise] = useState([
        { exercise: "", sets: "", reps: "", weight: "" }
    ]);
    const [newMeal, setNewMeal] = useState({ title: "Meal", date: "", meals: [] });
    const [meals, setMeals] = useState([
        { meal: "", calories: "" }
    ]);
    const [allEvents, setAllEvents] = useState(events);
    const [showWorkoutForm, setShowWorkoutForm] = useState(false);
    const [showWorkoutEditForm, setShowWorkoutEditForm] = useState(false);
    const [showWorkoutView, setShowWorkoutView] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showMealDeleteConfirmation, setShowMealDeleteConfirmation] = useState(false);
    const [showMealForm, setShowMealForm] = useState(false);
    const [showMealEditForm, setShowMealEditForm] = useState(false);
    const [showMealViewForm, setShowMealViewForm] = useState(false);
    const clickRef = useRef(null)

    const handleWorkoutFormShow = () => setShowWorkoutForm(true);

    const handleWorkoutEditFormShow = () => setShowWorkoutEditForm(true);

    const handleWorkoutViewShow = () => setShowWorkoutView(true);

    const handleMealFormShow = () => setShowMealForm(true);

    const handleMealEditFormShow = () => setShowMealEditForm(true);

    const handleMealViewFormShow = () => setShowMealViewForm(true);

    const handleMealFormClose = () => {
        setShowMealForm(false);
        setNewMeal({ title: "Meal", date: "", meals: [] });
        setMeals([
            { meal: "", calories: "" }
        ]);
    }

    const handleMealEditFormClose = () => {
        setShowMealEditForm(false);
        setNewMeal({ title: "Meal", date: "", meals: [] });
        setMeals([
            { meal: "", calories: "" }
        ]);
    }

    const handleMealViewFormClose = () => {
        setShowMealViewForm(false);
        setNewMeal({ title: "Meal", date: "", meals: [] });
        setMeals([
            { meal: "", calories: "" }
        ]);
    }

    const handleWorkoutViewClose = () => {
        setShowWorkoutView(false);
        setNewExercise([{ exercise: "", sets: "", reps: "", weight: "" }]);
        setNewWorkout({ title: "", date: "", startTime: "", endTime: "", exercises: [] });
    }

    const handleWorkoutEditFormClose = () => {
        setShowWorkoutEditForm(false);
        setNewExercise([{ exercise: "", sets: "", reps: "", weight: "" }]);
        setNewWorkout({ title: "", date: "", startTime: "", endTime: "", exercises: [] });
    }

    const handleWorkoutFormClose = () => {
        setShowWorkoutForm(false);
        setNewExercise([{ exercise: "", sets: "", reps: "", weight: "" }]);
        setNewWorkout({ title: "", date: "", startTime: "", endTime: "", exercises: [] });
    }

    function sendWorkoutData() {
        newWorkout.username = "admin";
        fetch('http://localhost:3000/api/workoutHandler', {
            method: 'POST',
            body: JSON.stringify(newWorkout)
        });
    }

    function updateWorkoutData() {
        newWorkout.username = "admin";
        newWorkout.oldStartTime = oldStartTime;
        newWorkout.oldEndTime = oldEndTime;
        newWorkout.oldDate = oldDate;
        newWorkout.oldTitle = oldTitle;
        fetch('http://localhost:3000/api/workoutHandler', {
            method: 'PUT',
            body: JSON.stringify(newWorkout)
        });
    }

    function deleteWorkoutData() {
        newWorkout.username = "admin";
        newWorkout.oldStartTime = oldStartTime;
        newWorkout.oldEndTime = oldEndTime;
        newWorkout.oldDate = oldDate;
        newWorkout.oldTitle = oldTitle;
        fetch('http://localhost:3000/api/workoutHandler', {
            method: 'DELETE',
            body: JSON.stringify(newWorkout)
        });
    }

    function checkForDuplicateWorkout() {
        let date = newWorkout.date;
        newWorkout.date = moment(date).format("YYYY/MM/DD");
        for (let i = 0; i < allEvents.length; i++) {
            if (newWorkout.title == allEvents[i].title && newWorkout.date == moment(allEvents[i].startDate).format("YYYY/MM/DD")) {
                isDuplicateWorkout = true;
                break;
            }
        }
    }

    function checkForEmptyInputs() {
        newWorkout.exercises = newExercise;
        console.log(newWorkout.exercises);
        if (newWorkout.title == "") emptyName = true;
        if (newWorkout.date == "Invalid date") emptyDate = true;
        if (newWorkout.startTime == "" || newWorkout.endTime == "") emptyTime = true;
        if (newWorkout.exercises.length == 0) {
            emptyExercises = true;
        } else {
            for (let i = 0; i < newWorkout.exercises.length; i++) {
                if (newWorkout.exercises[i].exercise == null) {
                    emptyExercises = true;
                    break;
                }
            }
        }
    }

    function handleNewWorkout(e) {
        e.preventDefault();
        checkForDuplicateWorkout();
        checkForEmptyInputs();
        if (isDuplicateWorkout) {
            toast.notify('Please enter a workout with a unique title and date.', {
                duration: 3,
                type: "error"
            });
            isDuplicateWorkout = false;
        } else if (emptyName) {
            toast.notify('Please enter a name for the workout.', {
                duration: 3,
                type: "error"
            });
            emptyName = false;
        } else if (emptyDate) {
            toast.notify('Please enter a date for the workout.', {
                duration: 3,
                type: "error"
            });
            emptyDate = false;
        } else if (emptyTime) {
            toast.notify('Please enter a start and end time for the workout.', {
                duration: 3,
                type: "error"
            });
            emptyTime = false;
        } else if (emptyExercises) {
            toast.notify('Please enter at least one exercise for the workout.', {
                duration: 3,
                type: "error"
            });
            emptyExercises = false;
        } else {
            // newWorkout.exercises = newExercise;
            const calendarDisplayWorkout = {
                title: newWorkout.title,
                startDate: moment(newWorkout.date + " " + newWorkout.startTime).toDate(),
                endDate: moment(newWorkout.date + " " + newWorkout.endTime).toDate(),
                exercises: newWorkout.exercises
            };
            setAllEvents([...allEvents, calendarDisplayWorkout]);
            sendWorkoutData();
            handleWorkoutFormClose();
            toast.notify('Workout added.', {
                duration: 3,
                type: "success"
            });
        }
    }

    function handleUpdateWorkout(e) {
        e.preventDefault();
        checkForDuplicateWorkout();
        checkForEmptyInputs();
        if (isDuplicateWorkout) {
            toast.notify('Please enter a workout with a unique title and date.', {
                duration: 3,
                type: "error"
            });
            isDuplicateWorkout = false;
        } else if (emptyName) {
            toast.notify('Please enter a name for the workout.', {
                duration: 3,
                type: "error"
            });
            emptyName = false;
        } else if (emptyDate) {
            toast.notify('Please enter a date for the workout.', {
                duration: 3,
                type: "error"
            });
            emptyDate = false;
        } else if (emptyTime) {
            toast.notify('Please enter a start and end time for the workout.', {
                duration: 3,
                type: "error"
            });
            emptyTime = false;
        } else if (emptyExercises) {
            toast.notify('Please enter at least one exercise for the workout.', {
                duration: 3,
                type: "error"
            });
            emptyExercises = false;
        } else {
            // newWorkout.exercises = newExercise;
            deleteSelectedWorkout();
            const calendarDisplayWorkout = {
                title: newWorkout.title,
                startDate: moment(newWorkout.date + " " + newWorkout.startTime).toDate(),
                endDate: moment(newWorkout.date + " " + newWorkout.endTime).toDate(),
                exercises: newWorkout.exercises
            };
            setAllEvents([...allEvents, calendarDisplayWorkout]);
            updateWorkoutData();
            handleWorkoutEditFormClose();
            toast.notify('Workout updated.', {
                duration: 3,
                type: "success"
            });
        }
    }

    function handleDeleteWorkout() {
        setShowWorkoutEditForm(false);
        setShowConfirmation(true);
    }

    function handleCloseConfirmation() {
        setShowConfirmation(false);
        setShowWorkoutEditForm(true);
    }

    function handleDeleteMeal() {
        setShowMealEditForm(false);
        setShowMealDeleteConfirmation(true);
    }

    function handleCloseMealConfirmation() {
        setShowMealDeleteConfirmation(false);
        setShowMealEditForm(true);
    }

    function deleteSelectedWorkout() {
        for (let i = 0; i < allEvents.length; i++) {
            if (allEvents[i].title == oldTitle && moment(allEvents[i].startDate).format("YYYY/MM/DD") == oldDate && moment(allEvents[i].startDate).format("HH:mm") == oldStartTime && moment(allEvents[i].endDate).format("HH:mm") == oldEndTime) {
                allEvents.splice(i, 1);
                break;
            }
        }
    }

    function handleExerciseForm(index, event) {
        let data = [...newExercise];
        data[index][event.target.name] = event.target.value;
        setNewExercise(data);
    }

    function addFields() {
        let newField = { exercise: "", sets: "", reps: "", weight: "" };
        setNewExercise([...newExercise, newField]);
    }

    function removeFields() {
        let data = [...newExercise];
        data.pop();
        setNewExercise(data);
    }

    const onDoubleClickEvent = useCallback((e) => {
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            if (e.title == "Meal") {
                handleMealEditFormShow();
                e.date = moment(e.startDate).format("YYYY/MM/DD");
                setNewMeal(e);
                setMeals(e.meals);
                oldMealDate = moment(e.startDate).format("YYYY-MM-DD");
            } else {
                handleWorkoutEditFormShow();
                e.date = moment(e.startDate).format("YYYY/MM/DD");
                e.startTime = moment(e.startDate).format("HH:mm");
                e.endTime = moment(e.endDate).format("HH:mm");
                setNewWorkout(e);
                setNewExercise(e.exercises);
                oldDate = moment(e.startDate).format("YYYY/MM/DD");
                oldTitle = e.title;
                oldStartTime = moment(e.startDate).format("HH:mm");
                oldEndTime = moment(e.endDate).format("HH:mm");
            }
        }, 250)
    }, [])

    const onSelectEvent = useCallback((e) => {
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            if (e.title == "Meal") {
                handleMealViewFormShow();
                e.date = moment(e.startDate).format("YYYY/MM/DD");
                setNewMeal(e);
                setMeals(e.meals);
            } else {
                handleWorkoutViewShow();
                e.date = moment(e.startDate).format("YYYY/MM/DD");
                e.startTime = moment(e.startDate).format("hh:mm a");
                e.endTime = moment(e.endDate).format("hh:mm a");
                setNewWorkout(e);
                setNewExercise(e.exercises);
            }
        }, 250)
    }, [])

    function handleEditClick() {
        oldDate = newWorkout.date;
        oldTitle = newWorkout.title;
        oldStartTime = moment(newWorkout.startDate).format("HH:mm");
        oldEndTime = moment(newWorkout.endDate).format("HH:mm");
        newWorkout.startTime = moment(newWorkout.startDate).format("HH:mm");
        newWorkout.endTime = moment(newWorkout.endDate).format("HH:mm");
        setShowWorkoutView(false);
        handleWorkoutEditFormShow();
    }

    function handleMealEditClick() {
        oldMealDate = moment(newMeal.date).format("YYYY-MM-DD");
        setShowMealViewForm(false);
        handleMealEditFormShow();
    }

    function onConfirmdeleteWorkoutData() {
        deleteSelectedWorkout();
        deleteWorkoutData();
        handleWorkoutEditFormClose();
        setShowConfirmation(false);
        toast.notify('Workout deleted.', {
            duration: 3,
            type: "success"
        });
    }

    function onConfirmDeleteMeal() {
        deleteCalendarMeals();
        deleteMealData();
        handleMealEditFormClose();
        setShowMealDeleteConfirmation(false);
        toast.notify('Meal log deleted.', {
            duration: 3,
            type: "success"
        });
    }

    function handleMealsForm(index, event) {
        let data = [...meals];
        data[index][event.target.name] = event.target.value;
        setMeals(data);
    }

    function addMealFields() {
        let newField = { meal: "", calories: "" };
        setMeals([...meals, newField]);
    }

    function removeMealFields() {
        let data = [...meals];
        data.pop();
        setMeals(data);
    }

    function sendMealData() {
        newMeal.username = "admin";
        fetch('http://localhost:3000/api/mealHandler', {
            method: 'POST',
            body: JSON.stringify(newMeal)
        });
    }

    function updateMealData() {
        newMeal.username = "admin"
        newMeal.oldDate = oldMealDate;
        fetch('http://localhost:3000/api/mealHandler', {
            method: 'PUT',
            body: JSON.stringify(newMeal)
        });
    }

    function deleteMealData() {
        newMeal.username = "admin"
        newMeal.oldDate = oldMealDate;
        fetch('http://localhost:3000/api/mealHandler', {
            method: 'DELETE',
            body: JSON.stringify(newMeal)
        });
    }

    function handleNewMeal(e) {
        e.preventDefault();
        newMeal.meals = meals;
        const calendarDisplayMeal = {
            title: newMeal.title,
            startDate: moment(newMeal.date).toDate(),
            endDate: moment(newMeal.date).toDate(),
            meals: newMeal.meals,
        };
        setAllEvents([...allEvents, calendarDisplayMeal]);
        sendMealData();
        handleMealFormClose();
        toast.notify('Meal log added.', {
            duration: 3,
            type: "success"
        });
    }

    function deleteCalendarMeals() {
        for (let i = 0; i < allEvents.length; i++) {
            if (allEvents[i].title == "Meal" && moment(allEvents[i].startDate).format("YYYY-MM-DD") == oldMealDate) {
                allEvents.splice(i, 1);
                // break;
            }
        }
    }

    function handleUpdateMeal(e) {
        e.preventDefault();
        newMeal.meals = meals;
        deleteCalendarMeals();
        const calendarDisplayMeal = {
            title: newMeal.title,
            startDate: moment(newMeal.date).toDate(),
            endDate: moment(newMeal.date).toDate(),
            meals: newMeal.meals,
        };
        setAllEvents([...allEvents, calendarDisplayMeal]);
        updateMealData();
        handleMealEditFormClose();
        toast.notify('Meal log updated.', {
            duration: 3,
            type: "success"
        });
    }

    return (
        <div className="homepage">
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <FontAwesomeIcon icon={faDumbbell} /> Workout Tracker
                    </Navbar.Brand>
                    <ButtonGroup aria-label="formButtoms">
                        <Button variant="info" onClick={handleMealFormShow}>
                            Create Meal Log
                        </Button>
                        <Button variant="primary" onClick={handleWorkoutFormShow}>
                            Create Workout
                        </Button>
                    </ButtonGroup>
                </Container>
            </Navbar>
            <ToastContainer align={"right"} />
            <Modal show={showConfirmation} onHide={handleCloseConfirmation} animation={false} dialogClassName="confirmation">
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Are you sure you want to delete this workout? This action cannot be undone.
                    </p>
                    <Row>
                        <Col xs={6}>
                            <Button variant="danger" onClick={handleCloseConfirmation}>No</Button>
                        </Col>
                        <Col xs={6}>
                            <Button className="float-end" variant="success" onClick={onConfirmdeleteWorkoutData}>Yes</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
            <Modal show={showMealDeleteConfirmation} onHide={handleCloseMealConfirmation} animation={false} dialogClassName="mealDeleteConfirmation">
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Are you sure you want to delete this meal log? This action cannot be undone.
                    </p>
                    <Row>
                        <Col xs={6}>
                            <Button variant="danger" onClick={handleCloseMealConfirmation}>No</Button>
                        </Col>
                        <Col xs={6}>
                            <Button className="float-end" variant="success" onClick={onConfirmDeleteMeal}>Yes</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
            <Popup
                show={showWorkoutForm}
                onHide={handleWorkoutFormClose}
                isWorkoutModal={true}
                newWorkout={newWorkout}
                setNewWorkout={setNewWorkout}
                newExercise={newExercise}
                handleExerciseForm={handleExerciseForm}
                addFields={addFields}
                removeFields={removeFields}
                handleSubmit={handleNewWorkout}
            />
            <Popup
                show={showWorkoutEditForm}
                onHide={handleWorkoutEditFormClose}
                isEditModal={true}
                newWorkout={newWorkout}
                setNewWorkout={setNewWorkout}
                newExercise={newExercise}
                handleExerciseForm={handleExerciseForm}
                addFields={addFields}
                removeFields={removeFields}
                handleSubmit={handleUpdateWorkout}
                handleDelete={handleDeleteWorkout}
            />
            <Popup
                show={showWorkoutView}
                onHide={handleWorkoutViewClose}
                isViewModal={true}
                newWorkout={newWorkout}
                newExercise={newExercise}
                handleEdit={handleEditClick}
            />
            <Popup
                show={showMealForm}
                onHide={handleMealFormClose}
                isMealModal={true}
                newMeal={newMeal}
                setNewMeal={setNewMeal}
                meals={meals}
                handleMealsForm={handleMealsForm}
                addFields={addMealFields}
                removeFields={removeMealFields}
                handleSubmit={handleNewMeal}
            />
            <Popup
                show={showMealEditForm}
                onHide={handleMealEditFormClose}
                isMealEditModal={true}
                newMeal={newMeal}
                setNewMeal={setNewMeal}
                meals={meals}
                handleMealsForm={handleMealsForm}
                addFields={addMealFields}
                removeFields={removeMealFields}
                handleSubmit={handleUpdateMeal}
                handleDelete={handleDeleteMeal}
            />
            <Popup
                show={showMealViewForm}
                onHide={handleMealViewFormClose}
                isMealViewModal={true}
                newMeal={newMeal}
                meals={meals}
                handleEdit={handleMealEditClick}
            />
            <Calendar
                localizer={localizer}
                events={allEvents}
                titleAccessor="title"
                startAccessor="startDate"
                endAccessor="endDate"
                onSelectEvent={(e) => onSelectEvent(e)}
                onDoubleClickEvent={(e) => onDoubleClickEvent(e)}
                style={{ height: 500, margin: "50px", "z-index": -1 }}
            />
        </div>
    );
}
