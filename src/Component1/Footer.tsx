import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { FaHome, FaSearch, FaPlus, FaUser, FaUserFriends, FaBuilding   } from 'react-icons/fa';




 

const Home: React.FC = () => {

    return (

            <div className="d-flex flex-column min-vh-100">        

                <footer className="navbar navbar-dark bg-danger fixed-bottom">

                    <div className="container-fluid justify-content-around">

                        <div className="nav-item text-center">

                            <a className="nav-link text-white" href="/home">

                                <FaHome size={24} />

                                <span className="d-block">Home</span>

                            </a>

                        </div>

                        <div className="nav-item text-center">

                            <a className="nav-link text-white" href="/search">

                                <FaSearch size={24} />

                                <span className="d-block">Search</span>

                            </a>

                        </div>

                        <div className="nav-item text-center">

                            <a className="nav-link text-white" href="/create">

                                <FaPlus size={24} />

                                <span className="d-block">Add</span>

                            </a>

                        </div>

                        <div className="nav-item text-center">

                            <a className="nav-link text-white" href="/friends">

                                <FaUserFriends size={24} />

                                <span className="d-block">Invitations</span>

                            </a>

                        </div>

                        <div className="nav-item text-center">

                            <a className="nav-link text-white" href="/sponsered">

                                <FaBuilding size={24} />

                                <span className="d-block">BusinessProfile</span>

                            </a>

                        </div>

                        <div className="nav-item text-center">

                            <a className="nav-link text-white" href="/profile">

                                <FaUser size={24} />

                                <span className="d-block">Profile</span>

                            </a>

                        </div>

                    </div>

                </footer>

            </div>

    );

};


 

export default Home;


 