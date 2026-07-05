import "../styles/ipod.css";
import { useState } from "react";
import Library from "./Library.jsx";
import Playlists from "./Playlist.jsx";
import Settings from "./Settings.jsx";

function Screen({ currentScreen, setCurrentScreen }) {
    const menuItems = ["Library", "Playlists", "Now Playing", "Settings"];
    
    const [selectedMenu, setSelectedMenu] = useState("Library");

    const [darkMode, setDarkMode] = useState(false);

    const handleMenuClick = (item) => {
        setSelectedMenu(item);
        setCurrentScreen(item);
    };

    return (
        <div className={darkMode ? "screen dark" : "screen"}>
            <div className={darkMode ? "options dark" : "options"}>
                <h3>
                    {currentScreen === "Menu" && "PlayBack"}
                    {currentScreen === "Library" && "Library"}
                    {currentScreen === "Playlists" && "Playlists"}
                    {currentScreen === "Now Playing" && "Now Playing"}
                    {currentScreen === "Settings" && "Settings"}
                </h3>
                {currentScreen === "Menu" && (
                    <ul className="menu-items">
                    {menuItems.map((item) => (
                        <li
                            key={item}
                            onClick={() => handleMenuClick(item)}
                            className={selectedMenu === item ? "active" : ""}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
                )}
                {currentScreen === "Library" && 
                    <Library />
                }

                {currentScreen === "Playlists" && 
                    <Playlists />
                }
                {currentScreen === "Settings" && 
                    <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
                }
            </div>
        </div>
    );
}

export default Screen;