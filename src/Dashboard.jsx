import React, { Component } from 'react';
import './Dashboard.css'
import { getSession, callApi, setSession } from './api.js';
import Menubar from './Menubar.jsx';
import JobPosting from './JobPosting.jsx';
import JobSearch from './JobSearch.jsx';
import Profile from './Profile.jsx';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { fullName: "", activeComponents: "" };
        this.showFullName = this.showFullName.bind(this);
        this.logOut = this.logOut.bind(this);
        this.loadComponents = this.loadComponents.bind(this);
    }
    componentDidMount() {
        let csr = getSession("csrid");
        if (csr === "") {
            this.logOut;
        }
        var data = JSON.stringify({ csrid: csr });


        callApi("POST", "http://localhost:9090/users/getfullname", data, this.showFullName);
    }
    showFullName(res) {
        //ask doubt to sir
        this.setState({ fullName: res });
    }
    logOut() {
        setSession("csrid", "", -1);
        window.location.replace("/");
    }
    loadComponents(mid) {

        let component = {
            "1": <JobPosting></JobPosting>,
            "2": <JobSearch></JobSearch>,
            "3": <Profile></Profile>
        };
        this.setState({ activeComponents: component[mid] });
    }
    render() {
        const { fullName, activeComponents } = this.state;
        return (
            <div className="dashboard">
                {/*now create 3 divisions 1 for header, 1 for menu, 1 for outlet */}
                <div className='header'>
                    <img className='headerlogo' src="/logo.png" alt="" />
                    <div className='headerTitle'><span>Job</span> Portal</div>
                    <img src="/logout.png" alt="" onClick={this.logOut} className="signoutLogo" />
                    <label className="userFullName">{fullName}</label>
                    {/* here {fullName} is the state replace the label as */}
                </div>
                {/* <div className="menu">Menu</div> */}
                <div className="menu"><Menubar onMenuClick={this.loadComponents}></Menubar></div>
                <div className="outlet">{activeComponents}</div>
            </div>
        );
    }
}

export default Dashboard;
