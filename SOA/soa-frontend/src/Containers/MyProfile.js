import React from 'react';
import classes from '../Components/UI/Card.css'
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import AuthContext from "../source/auth-context";

class MyProfile extends React.Component {

    static contextType = AuthContext;

    deleteUser = async (e) => {
        if (e) e.preventDefault();
        await fetch(`http://localhost:3000/saas/soa/esb`,
                {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "url-destination": `saas/soa/users/${this.context.userId}`,
                        'Authorization': 'Bearer ' + `${this.context.jwt}`
                    }
                }).then(this.context.logout());
    }

    render() {
        return (
            <div>
                <br/>
                <h1>My Profile</h1>
                <br/>
                <div class="row">
                    <div class="card" style={{ width: "20rem" }}>
                        <div class="card-body">
                            <h5 class="card-title"> My Questions </h5>
                            <p class="card-text"> Questions you have posted.</p>
                            <a href="/myprofile/myquestions" class="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}>Go!</a>
                        </div>
                    </div>
                    <div class="card" style={{ width: "20rem" }}>
                        <div class="card-body">
                            <h5 class="card-title"> My Answers </h5>
                            <p class="card-text"> See the answers you have provided </p>
                            <a href="/myprofile/myanswers" class="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}>Go!</a>
                        </div>
                    </div>
                    <div class="card" style={{ width: "20rem" }}>
                        <div class="card-body">
                            <h5 class="card-title"> My Contributions per day </h5>
                            <p class="card-text"> Overview of your daily contributions </p>
                            <a href="/myprofile/contrib" class="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}>Go!</a>
                        </div>
                    </div>

                    <div class="card" style={{ width: "20rem" }}>
                        <div class="card-body">
                            <h5 class="card-title"> Edit Profile </h5>
                            <p class="card-text"> Customize your account information </p>
                            <Link class="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}
                            to={{ 
                            pathname: "/myprofile/editprofile", 
                            }}>
                            Edit
                            </Link>
                        </div>
                    </div>
                    
                    <div class="card" style={{ width: "20rem" }}>
                        <div class="card-body">
                            <h5 class="card-title"> Delete Account </h5>
                            <p class="card-text"> Delete your account </p>
                            <button class="btn btn-primary" onClick={this.deleteUser} style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}>Go!</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyProfile;