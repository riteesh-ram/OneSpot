import React from "react";

export default function Success({success}) {

    return (
        <div className="mt-5">
            <div class="alert alert-success" role="alert">
                {success}
            </div>
        </div>
    )
}