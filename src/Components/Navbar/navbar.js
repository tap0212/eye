import React from 'react'
import Logo from '../../logo512.png'
import './navbar.scss'
const Navbar = (props) => {
    return (
        <div className="nav">
            <img onClick={() => props.history.push("/")} src={Logo} alt=""/>
        </div>
    )
}
export default  Navbar