import React from "react";

export default function Loader() {

    return (
        <div className="mt-5">
            <div class="spinner-border mt-5" role="status" style={{width:'100px', height:'100px'}}>
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )
}