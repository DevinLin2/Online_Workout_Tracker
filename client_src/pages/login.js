import React from "react";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    handleLogin() {
        if (this.state.username && this.state.password) {
          alert("Welcome");
          //need to be connected with the backend
          //need to be connected with the router
        } else {
          alert("Please enter the username and password");
        }
    }

    render() {
        return(
        <div className="login">
            <h1>Online Workout Tracker</h1>
            <form className="form">s
                <p>Username</p>
                <div className="formItem">
                    <input
                        label="Username" 
                        type="text" 
                        placeholder="Enter Username"
                        value={this.state.username}
                        onChange={(e)=>{
                            this.setState({username: e.target.value})
                        }}
                    />
                </div>

                <p>Password</p>
                <div className="formItem">
                    <input 
                        type="text" 
                        placeholder="Enter Password" 
                        value={this.state.password}
                        onChange={(e)=>{
                            this.setState({password: e.target.value})
                        }}
                    />
                </div>

                <div className="formItemBtn">
                    <button className="loginBtn" onClick={() => {this.handleLogin();}}>Login</button>
                </div>

            </form>
        </div>
        );
    }
}

export default Login;