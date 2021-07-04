import React from 'react';
import classes from '../Components/UI/Card.css'

class MyProfile extends React.Component {
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
                </div>
            </div>
        )
    }
}

export default MyProfile;