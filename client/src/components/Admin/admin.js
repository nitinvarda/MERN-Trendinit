import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './admin.css';



class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedin: '',
            username: '',
            password: '',
            auth: ''

        }
        this.submitForm = this.submitForm.bind(this);
        this.onChange = this.onChange.bind(this);
    }




    onChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        })
    }


    submitForm(e) {
        e.preventDefault();
        var { username, password } = this.state
        var requests = {
            username: username,
            password: password
        }
        axios.post('/home/admin', requests)
            .then(response => {

                this.setState({
                    isLoggedin: response.data
                })
            })
            .catch(err => { console.log(err) });

    }





    render() {

        if (this.state.isLoggedin === "authenticated") {
            return (
                <Redirect to="/admin-home" />

            );
        }
        else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">

                        </div>
                        <div className=" loginpage col-sm-6">
                            <h3 style={{ textAlign: "center", marginTop: "10px" }}>Admin Login<hr /></h3>

                            <form onSubmit={this.submitForm} className="loginform">
                                <input type="text" name="username" value={this.state.username} className="username" onChange={this.onChange} placeholder="username" />
                                <input type="password" name="password" value={this.state.password} className="password" onChange={this.onChange} placeholder="password" />


                                <input type="Submit" style={{ backgroundColor: "#FF0000" }} value="Login" />
                                <h4>{this.state.isLoggedin}</h4>

                            </form>

                        </div>
                        <div className="col-sm-3">

                        </div>

                    </div>




                </div>

            )

        }





    }
}



export default Admin;