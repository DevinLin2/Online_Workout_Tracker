import React, { useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'
import { useRouter } from 'next/router'

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/loginRegisterHandler');
    const props = await res.json();
    return {
        props: {
            props,
        },
    }
}

export default function Login({ props }) {
    const [state, setState] = useState({ username: "", password: "" });
    const router = useRouter();
    const importedProps = Object.entries(props);
    // console.log(importedProps);
    function handleLogin() {
        if (state.username && state.password) {
            for (let i = 0; i < props.length; i++) {
                if (state.username == importedProps[i][1].username && state.password == importedProps[i][1].password) {
                    console.log("pass");
                }
            }
        } else {
            alert("Please enter a username and password");
        }
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <FontAwesomeIcon icon={faDumbbell} /> Workout Tracker
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <div className="login">
                <h1>Workout Tracker Login</h1>
                <form className="form">
                    <p>Username:</p>
                    <div className="formItem">
                        <input
                            label="Username"
                            type="text"
                            placeholder="Enter Username"
                            value={state.username}
                            onChange={(e) => {
                                setState({ username: e.target.value })
                            }}
                        />
                    </div>

                    <p>Password:</p>
                    <div className="formItem">
                        <input
                            type="text"
                            placeholder="Enter Password"
                            value={state.password}
                            onChange={(e) => {
                                setState({ password: e.target.value })
                            }}
                        />
                    </div>

                    <div className="formItemBtn">
                        <button className="loginBtn" onClick={() => { handleLogin(); }}>Login</button>
                    </div>
                    <Link href="/register">Register</Link>
                    <div className="float-end">
                        <Link href="/homepage">Continue as guest</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}