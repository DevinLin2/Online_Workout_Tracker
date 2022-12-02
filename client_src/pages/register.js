import React from "react";

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            Reenterpassword: ""
        };
    }

    handleRegister() {
        if (this.state.username=="") {
          alert("Please enter the username");
        } else if(this.state.password==""){
          alert("Please enter the password");
        } else if(this.state.Reenterpassword==""){
          alert("Please Re-enter the password");
        } else if(this.state.Reenterpassword!=this.state.password){
          alert("The password is different from the Re-enter the password");
        } 
        //need to be connected with the router
        else{
          sendData(this.state);
     }

    }


    

    render() {
        return(
        <div className="login">
            <h1>Online Workout Tracker Register</h1>
            <form className="form">
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

                <p>Re-Enter Password</p>
                <div className="formItem">
                    <input 
                        type="text" 
                        placeholder="Re-Enter Password" 
                        value={this.state.Reenterpassword}
                        onChange={(e)=>{
                            this.setState({Reenterpassword: e.target.value})
                        }}
                    />
                </div>

                <div className="formItemBtn">
                    <button className="loginBtn" onClick={() => {this.handleRegister();}}>Register</button>
                </div>

            </form>
        </div>
        );
    }
}

function sendData(state) {
    fetch('http://localhost:3000/api/loginRegisterHandler', {
        method: 'POST',
        
        body: JSON.stringify(state)
    });
    console.log(state.password);
}

export default Register;