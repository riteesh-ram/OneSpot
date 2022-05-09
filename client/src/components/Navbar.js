import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/userActions";

export default function Navbar() {

    const cartReducer = useSelector((state) => state.cartReducer);
    const { cartItems } = cartReducer;
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const dispatch = useDispatch()

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/">One Spot</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"><i class="fas fa-bars" style={{color:'white'}}></i></span>
                </button>


                <div className="collapse navbar-collapse" id="navbarNav">

                    <div className="navbar-nav ml-auto">
                        {currentUser ? (<div class="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i style={{color:'white'}} className="fa fa-user" aria-hidden="true"></i> {currentUser.name}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="/profile">Profile</a>
                                <a className="dropdown-item" href="/orders">Orders</a>
                                <li className="dropdown-item" onClick={()=>{dispatch(logoutUser())}}>Logout <i class="fa fa-sign-out" aria-hidden="true"></i> </li>
                            </div>
                        </div>) : (<li className="nav-item">
                            <a className="nav-link" href="/login">Login</a>
                        </li>)}

                        <li className="nav-item">
                            <a className="nav-link" href="/cart">
                                <i class="fa-solid fa-cart-shopping"></i> {cartItems.length}
                            </a>
                        </li>

                    </div>
                    
                </div>
            </nav>
        </div>
    )
}