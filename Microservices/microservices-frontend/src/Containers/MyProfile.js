import React from 'react';
import { Link } from 'react-router-dom';
import AuthContext from "../source/auth-context";

class MyProfile extends React.Component {

    static contextType = AuthContext;

    deleteUser = async (e) => {
        if (e) e.preventDefault();
        await fetch(`https://saas21-team47-ms-auth.herokuapp.com/saas/microservices/authentication/${this.context.userId}`,
                {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${this.context.jwt}`
                    }
                }).then(this.context.logout());
    }

    render() {
        return (
            <div>
                <br/>
                <h1>My Profile</h1>
                <br/>
                <div className="row">
                    <div className="card" style={{ width: "20rem" }}>
                        <div className="card-body">
                            <h5 className="card-title"> My Questions </h5>
                            <p className="card-text"> Questions you have posted.</p>
                            <a href="/myprofile/myquestions" className="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}>Go!</a>
                        </div>
                    </div>
                    <div className="card" style={{ width: "20rem" }}>
                        <div className="card-body">
                            <h5 className="card-title"> My Answers </h5>
                            <p className="card-text"> See the answers you have provided </p>
                            <a href="/myprofile/myanswers" className="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}>Go!</a>
                        </div>
                    </div>
                    <div className="card" style={{ width: "20rem" }}>
                        <div className="card-body">
                            <h5 className="card-title"> My Contributions per day </h5>
                            <p className="card-text"> Overview of your daily contributions </p>
                            <a href="/myprofile/contrib" className="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}>Go!</a>
                        </div>
                    </div>

                    <div className="card" style={{ width: "20rem" }}>
                        <div className="card-body">
                            <h5 className="card-title"> Edit Profile </h5>
                            <p className="card-text"> Customize your account information </p>
                            <Link className="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}
                            to={{ 
                            pathname: "/myprofile/editprofile", 
                            }}>
                            Edit
                            </Link>
                        </div>
                    </div>
                    
                    <div className="card" style={{ width: "20rem" }}>
                        <div className="card-body">
                            <h5 className="card-title"> Delete Account </h5>
                            <p className="card-text"> Delete your account </p>
                            <button className="btn btn-primary" onClick={this.deleteUser} style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}>Go!</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyProfile;