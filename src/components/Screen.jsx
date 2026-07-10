import "../styles/ipod.css";
import { useState, useEffect } from "react";
import Library from "./Library.jsx";
import Playlists from "./Playlist.jsx";
import Settings from "./Settings.jsx";
import NowPlaying from "./NowPlaying.jsx";
import Customization from "./Customization.jsx";

function Screen({ currentScreen, setCurrentScreen, selectedMenu, setSelectedMenu, menuItems, songs, setSongs, currentSong, setCurrentSong, currentTime, playlists, setPlaylists, selectedItem, setSelectedItem, selectedPlaylist, setSelectedPlaylist, previousScreen, setPreviousScreen, user, customization, setCustomization, shuffle, setShuffle, handleResetCustomization, fontOptions, darkMode, setDarkMode, customizationItems }) {

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
                    {currentScreen === "Customization" && "Customization"}
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
                    <Library songs={songs} setSongs={setSongs} currentSong={currentSong} setCurrentSong={setCurrentSong} setCurrentScreen={setCurrentScreen} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setPreviousScreen={setPreviousScreen} currentScreen={currentScreen} darkMode={darkMode} user={user} />
                }

                {currentScreen === "Playlists" && 
                    <Playlists playlists={playlists} setPlaylists={setPlaylists} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} setCurrentScreen={setCurrentScreen} selectedItem={selectedItem} setSelectedItem={setSelectedItem} selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist} setPreviousScreen={setPreviousScreen} currentScreen={currentScreen} darkMode={darkMode} user={user} />
                }

                {currentScreen === "Now Playing" && 
                    <NowPlaying currentSong={currentSong} setCurrentSong={setCurrentSong} songs={songs} currentTime={currentTime} />
                }

                {currentScreen === "Settings" && 
                    <Settings darkMode={darkMode} setDarkMode={setDarkMode} user={user} selectedItem={selectedItem} setPreviousScreen={setPreviousScreen} setCurrentScreen={setCurrentScreen} shuffle={shuffle} setShuffle={setShuffle} handleResetCustomization={handleResetCustomization} />
                }

                {currentScreen === "Customization" && 
                    <Customization darkMode={darkMode} setDarkMode={setDarkMode} user={user} selectedItem={selectedItem} customization={customization} setCustomization={setCustomization} fontOptions={fontOptions} customizationItems={customizationItems} />
                }
            </div>
        </div>
    );
}

export default Screen;