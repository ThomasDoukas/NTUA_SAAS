import React from 'react'
import Footer from '../Components/Footer'
import NavBar from '../Components/Navbar'

const Layout = (props) => {
    return (
        <div style={{ position: "relative", minHeight: "100vh" }}>
            <NavBar />
            <main style={{minHeight: "75vh"}}>
                {props.children}
            </main>
            <Footer />
        </div>
        // <div style={{ position: "relative", minHeight: "100vh" }}>
        //     <NavBar />
        //     <main style={{paddingBottom: "25vh"}}>
        //         {props.children}
        //     </main>
        //     <Footer />
        // </div>
    )
}

export default Layout;