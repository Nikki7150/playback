import "../styles/ipod.css";
import { useState } from "react";
import Library from "./Library.jsx";
import Playlists from "./Playlist.jsx";
import Settings from "./Settings.jsx";
import NowPlaying from "./NowPlaying.jsx";

function Screen({ currentScreen, setCurrentScreen, selectedMenu, setSelectedMenu, menuItems, songs, setSongs, currentSong, setCurrentSong, selectedSong, setSelectedSong, currentTime }) {
    const [darkMode, setDarkMode] = useState(false);

    const handleMenuClick = (item) => {
        setSelectedMenu(item);
        setCurrentScreen(item);
    };

    let optionsClass = "options";
    if (darkMode) optionsClass += " dark";
    if (currentScreen === "Now Playing") optionsClass += " full";

    return (
        <div className={darkMode ? "screen dark" : "screen"}>
            <div className={optionsClass}>
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
                    <Library songs={songs} setSongs={setSongs} currentSong={currentSong} setCurrentSong={setCurrentSong} setCurrentScreen={setCurrentScreen} selectedSong={selectedSong} setSelectedSong={setSelectedSong} />
                }

                {currentScreen === "Playlists" && 
                    <Playlists />
                }

                {currentScreen === "Now Playing" && 
                    <NowPlaying currentSong={currentSong} setCurrentSong={setCurrentSong} songs={songs} currentTime={currentTime} />
                }

                {currentScreen === "Settings" && 
                    <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
                }
            </div>
        </div>
    );
}

export default Screen;