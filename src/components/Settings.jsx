import "../styles/ipod.css";

import { handleGoogleLogin, handleLogout } from "./Login.jsx";

import { FaToggleOff, FaToggleOn, FaRandom } from 'react-icons/fa';

function Settings({ darkMode, setDarkMode, user, selectedItem, setPreviousScreen, setCurrentScreen, shuffle, setShuffle, handleResetCustomization }) {
    return (
        <div className={darkMode ? "settings dark" : "settings"}>
            <ul className={darkMode ? "settings-list dark" : "settings-list"}>
                <button onClick={() => setDarkMode(!darkMode)} className={selectedItem === "Dark Mode" ? "dark-mode-button active" : "dark-mode-button"}>
                    Dark Mode <span>{darkMode ? <FaToggleOn /> : <FaToggleOff />}</span>
                </button>
                <button onClick={() => setShuffle(!shuffle)} className={selectedItem === "Shuffle" ? "shuffle active" : "shuffle"}>
                    Shuffle <span className="shuffle-icon">{shuffle ? <FaRandom /> : null}</span>
                </button>
                <li className={selectedItem === "Ipod Customization" ? "ipod-customization active" : "ipod-customization"} onClick={() => {
                    setPreviousScreen("Settings");
                    setCurrentScreen("Customization");
                }}>
                    Ipod Customization
                </li>
                <li className={selectedItem === "Reset Settings" ? "reset-settings active" : "reset-settings"} onClick={handleResetCustomization}>
                    Reset Settings
                </li>
                {user ? (
                    <div>
                        <h4 className={selectedItem === "User Name" ? "user-name active" : "user-name"}>User name: {user?.user_metadata?.full_name?.split(" ")[0]}</h4>
                        <button onClick={handleLogout} className={selectedItem === "Logout" ? "logout active" : "logout"}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <button onClick={handleGoogleLogin} className={selectedItem === "Login with Google" ? "login-google active" : "login-google"}>
                        Login with Google
                    </button>
                )}
            </ul>
        </div>
    );
}

export default Settings;