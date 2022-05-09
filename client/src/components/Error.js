import React from "react";

export default function Loader({error}) {

    return (
        <div className="mt-5">
            <div class="alert alert-danger" role="alert">
                {error}
            </div>
        </div>
    )
}