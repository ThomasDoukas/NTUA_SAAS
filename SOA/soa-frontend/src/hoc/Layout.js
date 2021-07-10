import React from 'react'
import Footer from '../Components/Footer'
import NavBar from '../Components/Navbar'

const Layout = (props) => {
    return (
        <div style={{ position: "relative", minHeight: "100vh" }}>
            <NavBar />
            <div className="container" style={{ minHeight: "65vh"}}>
                <br/>
                <br/>
                <br/>
                {props.children}
                <br/>
                <br/>
                <br/>
            </div>
            <Footer />
        </div>
    )
}

export default Layout;