import React from "react";
import "../styles/button.css";
function Button({ initialText = "Login", onClick }) {
    return (
        <button type="button" className="button" onClick={onClick}>
            {initialText}
        </button>
    );
}
export default Button;
