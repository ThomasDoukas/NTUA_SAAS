import classes from './Footer.css';
import React from 'react';

import { FaGithub, FaFacebook, FaInstagram, FaSpotify } from 'react-icons/fa';

const Footer = () => {
    return (

        <footer class="bg-dark text-center text-white" className={classes.Footer}>
            <div class="container p-4">

                <section class="mb-4">
                    <a class="btn btn-white btn-floating m-1" onClick={()=> window.open("https://github.com/ThomasDoukas/Saas_2021_ntua", "_blank")} role="button">
                        <FaGithub style={{color: "#06eeaa"}}/>
                    </a>
                    <a class="btn btn-white btn-floating m-1" href="#!" role="button">
                        <FaFacebook style={{color: "#06eeaa"}}/>
                    </a>
                    <a class="btn btn-white btn-floating m-1" href="#!" role="button">
                        <FaInstagram style={{color: "#06eeaa"}}/>
                    </a>
                    <a class="btn btn-white btn-floating m-1" onClick={()=> window.open("https://open.spotify.com/track/2sxi3UJLbsIs6p281rARgi?si=415467acb1c148d4", "_blank")} role="button">
                        <FaSpotify style={{color: "#06eeaa"}}/>
                    </a>
                </section>

                <div class="row" style={{ color: "#06eeaa" }}>
                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 class="text-uppercase">About</h5>

                        <div>
                            A front end implementation for Saas 2021 AskMeAnything project.
                        </div>

                    </div>

                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 class="text-uppercase">Contact us</h5>

                        <ul class="list-unstyled mb-0">
                            <li>
                                <div style={{ border: "2px solid" }}> Giannis Psarras giannispsarr@gmail.com  </div>
                            </li>
                            <div style={{ marginTop: "5px" }} />
                            <li>
                                <div style={{ border: "2px solid" }}> Thomas Doukas tom.doukas7@gmail.com </div>
                            </li>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 class="text-uppercase">Documentation</h5>

                        <ul class="list-unstyled mb-0">
                            <li>
                                <a href="#!" class="text" style={{ color: "#06eeaa" }}>YouTrack</a>
                            </li>
                            <li>
                                <a href="#!" class="text" style={{ color: "#06eeaa" }}>UpSource</a>
                            </li>
                            <li>
                                <a href="https://github.com/ThomasDoukas/Saas_2021_ntua" class="text" style={{ color: "#06eeaa" }}>GitHub</a>
                            </li>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 class="text-uppercase">Course Materials</h5>

                        <ul class="list-unstyled mb-0">
                            <li>
                                <a href="https://reactjs.org/" class="text" style={{ color: "#06eeaa" }}>ReactJS</a>
                            </li>
                            <li>
                                <a href="https://getbootstrap.com/" class="text" style={{ color: "#06eeaa" }}>Bootstrap</a>
                            </li>
                            <li>
                                <a href="https://nestjs.com/" class="text" style={{ color: "#06eeaa" }}>NestJS</a>
                            </li>
                            <li>
                                <a href="https://typeorm.io/#/" class="text" style={{ color: "#06eeaa" }}>TypeORM</a>
                            </li>
                            <li>
                                <a href="https://www.postgresql.org/" class="text" style={{ color: "#06eeaa" }}>PostgreSQL</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            <div class="text-center text-dark p-3" style={{ backgroundColor: "#06eeaa" }}>
                © 2021 Copyright: Software As A Service - NTUA
            </div>

        </footer>

    )
}
{/* <footer class="text-center text-lg-start bg-light text-muted" style={{ position: "absolute", bottom: "0%", width: "100%" }}>

     <section class="" >
         <div class="container text-center text-md-start mt-5">

             <div class="row mt-3">
                 <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                     <h6 class="text-uppercase fw-bold mb-4">
                         About
                     </h6>
                     <p>
                         Saas Front end implementation in ReactJS from THE team.
                     </p>
                 </div>

                 <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                     <h6 class="text-uppercase fw-bold mb-4">
                         Contact Us
                     </h6>
                     <p>
                         Contact Info
                     </p>
                 </div>

                 <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                     <h6 class="text-uppercase fw-bold mb-4">
                         Project Documentation
                     </h6>
                 </div>

                 <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                     <h6 class="text-uppercase fw-bold mb-4">
                         Contact
                     </h6>
                 </div>

                 <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                     <h6 class="text-uppercase fw-bold mb-4">
                         Link on GitHub
                     </h6>
                 </div>

                 <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                     <h6 class="text-uppercase fw-bold mb-4">
                         Course Materials
                     </h6>
                     <p>React JS</p>
                     <p>NestJS</p>
                     <p>TypeORM</p>
                 </div>

             </div>

         </div>
     </section>

     <div class="text-center p-4" style={{ backgroundColor: "#06eeaa" }}>
         © 2021 Copyright: Software As A Service - NTUA
         </div>
 </footer > */}

export default Footer;