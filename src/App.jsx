import React, { Component } from 'react';
import './App.css'
import { callApi, setSession } from "./api.js";

class App extends Component {
    constructor() {
        super();
        this.userRegistration = this.userRegistration.bind(this);
        this.signIn = this.signIn.bind(this);

    }
    showSignin() {
        let popup = document.getElementById("popup");
        popup.style.display = "block";
        let signup = document.getElementById("signup");
        signup.style.display = "none";
        let popupsignin = document.getElementById("popupsignin");
        popupsignin.style.display = "block";
        let popupheader = document.getElementById("popupheader");
        popupheader.innerHTML = "Log In";
    }

    closeSignin(event) {
        if (event.target.id === "popup") {
            let popup = document.getElementById("popup");
            popup.style.display = "none";
        }
    }

    showSignUp() {
        let popup = document.getElementById("popupsignin");
        popupsignin.style.display = "none";
        let signup = document.getElementById("signup");
        signup.style.display = "block";
        let popupheader = document.getElementById("popupheader");
        popupheader.innerHTML = "Create New Account";
    }
    userRegistration() {
        let fullName = document.getElementById("fullname");
        let email = document.getElementById("email");
        let role = document.getElementById("role");
        let signupPassword = document.getElementById("signuPpassword");
        let confirmPassword = document.getElementById("confirmpassword");


        if (fullName.value == "") {
            fullName.style.border = "1px solid red";
            fullName.focus();
            return;
        }
        if (email.value == "") {
            email.style.border = "1px solid red";
            email.focus();
            return;
        }

        if (role.value == "0") {
            role.style.border = "1px solid red";
            role.focus();
            return;
        }

        if (signupPassword.value == "") {
            signupPassword.style.border = "1px solid red";
            signupPassword.focus();
            return;
        }

        if (confirmPassword.value == "") {
            confirmPassword.style.border = "1px solid red";
            confirmPassword.focus();
            return;
        }

        if (signuPpassword.value != confirmPassword.value) {
            signupPassword.style.border = "1px solid red";
            signupPassword.focus();
            alert("Password and confirm password should be same");
            return;
        }



        var data = JSON.stringify({
            fullname: fullName.value,
            email: email.value,
            role: role.value,
            password: signupPassword.value

        });

        callApi("POST", "http://localhost:8070/user/insert", data, this.getResponse)

    }
    getResponse(res) {
        alert(res)
    }


    signIn() {
        let username = document.getElementById("username");

        let password = document.getElementById("password");
        username.style.border = "";
        password.style.border = "";
        let div1 = document.getElementById('div1');

        if (username.value == "") {
            username.style.border = "1px solid red";
            username.focus();
            return;
        }
        if (password.value == "") {
            password.style.border = "1px solid red";
            password.focus();
            return;
        }
        var data = JSON.stringify({
            email: username.value,
            password: password.value
        });

        callApi("POST", "http://localhost:8070/user/signin", data, this.getSigninResponse)
    }
    getSigninResponse(res) {
        let resData = res.split("::");
        if (resData[0] === "200") {
            setSession("csrid", resData[1], 1);
            window.location.replace("/Dashboard");
        } else {
            let div1 = document.getElementById('div1');
            div1.innerHTML = resData[1];
        }
    }
    render() {
        return (
            <div id='container'>

                <div id='popup' onClick={this.closeSignin}>
                    <div id='popupWindow'>
                        <div id='popupheader'>Log IN</div>
                        <div id='popupsignin'>
                            <label htmlFor="" className='usernameLabel'>email*</label>
                            <input type="text" name="" id="username" />
                            <label htmlFor="" className='passwordLabel'>Password*</label>
                            <input type="text" name="" id="password" />
                            <div id='forgotPassword'>Forgot <span>Password?</span></div>
                            <button id='signinButton' onClick={this.signIn} >Sign In</button>
                            <div id='div1'></div>  {/*do u know why we kept this, for future purpose i.e, when we completed  with backend part wh==then it will print the msg saying whether login scucess or failed */}
                            <div id='div2'>Don't have an account? <span onClick={this.showSignUp}>SignUpNow</span></div>
                        </div>


                        {/* signup form */}
                        <div id='signup'>
                            <lable id='fullNameLable'>Full Name</lable>
                            <input id='fullname' type='text'></input>
                            <lable id='emailLable'>Email ID</lable>
                            <input id='email' type='text'></input>
                            <lable id='roleLable'>Select role</lable>
                            <select id='role'>
                                <option value="0"></option>
                                <option value="1">Admin</option>
                                <option value="2">Employer</option>
                                <option value="3">Seeker</option>
                            </select>
                            <br />
                            <lable id='passwordLable'>Password</lable>
                            <input id='signuPpassword' type='text'></input>
                            <lable id='confirmLable'>Confirm Password</lable>
                            <input id='confirmpassword' type='text'></input>
                            <button id='signupButton' onClick={this.userRegistration}>Register</button>
                            <div id='div3'>Already have an Account? <span onClick={this.showSignin}>Log In</span></div>

                        </div>
                    </div>

                </div>
                <div id='header'>
                    <img className='headerlogo' src="/logo.png" alt="" />
                    <div className='headerTitle'><span>Job</span> Portal</div>
                    <img className='signinlogo' src="/user.png" alt="" onClick={this.showSignin} />
                    <div className='signin' onClick={this.showSignin}>Sign In</div>
                </div>
                <div id='content'>
                    <div className='text1'>INDIA'S #1 JOB PLATFORM</div>
                    <div className='text2'>Your Job search ends here</div>
                    <div className='text3'>Discover career opporunites</div>
                    <div id='searchBar'>
                        <input id="searchText" type="text" placeholder='Search jobs by "Skill"' />

                        <input id="searchLocation" type="text" placeholder='Job Location' />

                        <button id='searchButton'>Search jobs</button>
                    </div>
                </div>
                <div id='footer'>
                    <div className='copyrighttext'>Copyright @2025 All rights reserved</div>
                    <div className='socialmedia'>
                        <img src="/linkedin.png" alt="" />
                        <img src="/twitter.png" alt="" />
                        <img src="/facebook.png" alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;