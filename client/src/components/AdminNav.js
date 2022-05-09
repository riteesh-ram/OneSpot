import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminNav() {

    const dispatch = useDispatch()

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/">One Spot</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"><i class="fas fa-bars" style={{color:'white'}}></i></span>
                </button>
            </nav>
        </div>
    )
}