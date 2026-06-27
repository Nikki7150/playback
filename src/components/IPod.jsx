import "../styles/ipod.css";
import ClickWheel from "./ClickWheel.jsx";
import Screen from"./Screen.jsx";

function IPod() {
    return (
        <div className="ipod-container">
            <h1>PlayBack</h1>
            <div className="ipod">
                <Screen />
                <ClickWheel />
            </div>
        </div>
    );
}

export default IPod;