import "../styles/ipod.css";
import ClickWheel from "./ClickWheel.jsx";
import Screen from"./Screen.jsx";
import { useState } from "react";

function IPod() {
    const [currentScreen, setCurrentScreen] = useState("Menu");

    return (
        <div className="ipod-container">
            <h1>PlayBack</h1>
            <div className="ipod">
                <Screen currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
                <ClickWheel currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
            </div>
        </div>
    );
}

export default IPod;