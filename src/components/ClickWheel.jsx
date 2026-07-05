import "../styles/ipod.css";

import { FaBars } from 'react-icons/fa'; // Font Awesome
import { FiMenu } from 'react-icons/fi'; // Feather Icons
import { HiMenu } from 'react-icons/hi'; // Heroicons

function ClickWheel({ currentScreen, setCurrentScreen }) {
    return (
        <div className="click-wheel">
            <div className="menu-button-container">
                <button onClick={() => setCurrentScreen("Menu")} className="menu-button">
                    <FiMenu size={34} />
                </button>
            </div>
            <div className="center-button"></div>
        </div>
    );
}

export default ClickWheel;