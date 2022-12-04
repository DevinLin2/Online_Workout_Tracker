import React, { useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

export default function Register() {
    const [state, setState] = useState({ username: "", password: "", passwordMatch: "" });
    const router = useRouter();

    function handleRegister(e) {
        e.preventDefault();
        if (state.username == "") {
            alert("Please enter the username");
        } else if (state.password == "") {
            alert("Please enter the password");
        } else if (state.passwordMatch == "") {
            alert("Please Re-enter the password");
        } else if (state.passwordMatch != state.password) {
            alert("The password is different from the Re-enter the password");
        }
        //need to be connected with the router
        else {
            sendData(state);
            router.replace("/login");
        }

    }

    return (
        <div>
            <Head>
                <title>Workout Tracker</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <FontAwesomeIcon icon={faDumbbell} /> Workout Tracker
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <div className="login">
                <h1>Workout Tracker Register</h1>
                <form className="form">
                    <p>Username:</p>
                    <div className="formItem">
                        <input
                            label="Username"
                            type="text"
                            placeholder="Enter Username"
                            value={state.username}
                            onChange={(e) => {
                                setState({ ...state, username: e.target.value })
                            }}
                        />
                    </div>

                    <p>Password:</p>
                    <div className="formItem">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={state.password}
                            onChange={(e) => {
                                setState({ ...state, password: e.target.value })
                            }}
                        />
                    </div>

                    <p>Re-Enter Password:</p>
                    <div className="formItem">
                        <input
                            type="password"
                            placeholder="Re-Enter Password"
                            value={state.passwordMatch}
                            onChange={(e) => {
                                setState({ ...state, passwordMatch: e.target.value })
                            }}
                        />
                    </div>

                    <div className="formItemBtn">
                        <button className="loginBtn" onClick={(e) => { handleRegister(e); }}>Register</button>
                    </div>
                    <div className="float-end">
                        <Link href="/login">Back to login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

function sendData(state) {
    fetch('http://localhost:3000/api/loginRegisterHandler', {
        method: 'POST',

        body: JSON.stringify(state)
    });
    // console.log(state.password);
}