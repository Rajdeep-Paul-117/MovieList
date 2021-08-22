import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles.css'

function Header() {
    const [name, setName] = useState('')

    const nameChange = (e) => {
        setName(e.target.value);
    }
    const submit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand " to='/' >Home</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/favourites' className="nav-link active " aria-current="page" >My Favourites</NavLink>
                            </li>
                        </ul>
                        <form className="d-flex w-75" onSubmit={submit}>
                            <input className="form-control me-3 search" onChange={nameChange} type="search" placeholder="Search" aria-label="Search"></input>
                            <NavLink to={{
                                pathname: "/results",
                                name: name
                            }} className="btn btn-light shadow-none me-3" >Search</NavLink>
                        </form>
                        <ul className="navbar-nav me-right">
                            <li className="nav-item">
                                <NavLink to="#" className="nav-link active" aria-current="page" >Log In</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div >
    )
}

export default Header
