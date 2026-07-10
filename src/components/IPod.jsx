import "../styles/ipod.css";
import ClickWheel from "./ClickWheel.jsx";
import Screen from"./Screen.jsx";
import { useState, useRef, useEffect } from "react";
import flowerWallpaper from "../assets/wallpapers/flower wallpaper.jpeg";

import { supabase } from "../utils/supabaseClient.js";
import { handleGoogleLogin, handleLogout } from "./Login.jsx";

function IPod({ customization, setCustomization, handleResetCustomization, shuffle, setShuffle, darkMode, setDarkMode, user, setUser }) {
    const [currentScreen, setCurrentScreen] = useState("Menu");

    const menuItems = ["Library", "Playlists", "Now Playing", "Settings"];

    const [selectedMenu, setSelectedMenu] = useState("Library");

    const [songs, setSongs] = useState([]);

    const [currentSong, setCurrentSong] = useState(null);

    const [selectedItem, setSelectedItem] = useState("Add Song");

    const [ isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef(null);

    const [ currentTime, setCurrentTime] = useState(0);

    const [ playlists, setPlaylists] = useState([]);

    const [ selectedPlaylist, setSelectedPlaylist ] = useState(null);

    const customizationItems = ["App Theme", "iPod Background", "Font Type", "Font Color", "Accent Color", "Ipod Color"];

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const skipSong = (direction, wrap = true) => {
        if (!currentSong || songs.length === 0) return;
        if (shuffle) {
            const randomIndex = Math.floor(Math.random() * songs.length);
            setCurrentSong(songs[randomIndex]);
            setSelectedItem(songs[randomIndex]);
            setIsPlaying(true);
            return;
        }
        const currentIndex = songs.indexOf(currentSong);
        let newIndex = currentIndex + direction;
        if (newIndex < 0) newIndex = wrap ? songs.length - 1 : 0;
        if (newIndex >= songs.length) {
            if (wrap) newIndex = 0;
            else {
                setIsPlaying(false);
                return;
            }
        }
        setCurrentSong(songs[newIndex]);
        setSelectedItem(songs[newIndex]);
        setIsPlaying(true); // Automatically play the new song
    };

    const [previousScreen, setPreviousScreen] = useState("Menu");

    const fontOptions = ["Unica One", "Indie Flower", "Handjet", "Sue Ellen Fransico", "Oxanium"];

    useEffect(() => {
        // function to run
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentSong]); // thing to watch for change
    // the array is a dependency array - if the value in the array changes, the function will run again

    useEffect(() => {
        setCurrentTime(0);
    }, [currentSong]);

    return (
        <div className="ipod-container">
            <h1>PlayBack</h1>
            <div className="ipod" style={{ "--ipod-color": customization.ipodColor, "--font-color": customization.fontColor, "--accent-color": customization.accentColor, "--ipod-background": `url(${customization.ipodBackground})`, "--font-family": customization.fontFamily }}>
                <Screen currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} menuItems={menuItems} songs={songs} setSongs={setSongs} currentSong={currentSong} setCurrentSong={setCurrentSong} currentTime={currentTime} playlists={playlists} setPlaylists={setPlaylists} selectedItem={selectedItem} setSelectedItem={setSelectedItem} selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist} previousScreen={previousScreen} setPreviousScreen={setPreviousScreen} user={user} customization={customization} setCustomization={setCustomization} shuffle={shuffle} setShuffle={setShuffle} handleResetCustomization={handleResetCustomization} fontOptions={fontOptions} darkMode={darkMode} setDarkMode={setDarkMode} customizationItems={customizationItems} />
                <ClickWheel currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} menuItems={menuItems} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} skipSong={skipSong} selectedItem={selectedItem} setSelectedItem={setSelectedItem} selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist} playlists={playlists} previousScreen={previousScreen} setPreviousScreen={setPreviousScreen} user={user} shuffle={shuffle} setShuffle={setShuffle} handleResetCustomization={handleResetCustomization} fontOptions={fontOptions} customization={customization} setCustomization={setCustomization} customizationItems={customizationItems} />
                <audio ref={audioRef} src={currentSong?.fileUrl} onTimeUpdate={handleTimeUpdate} onEnded={() => skipSong(1, false)} />
            </div>
        </div>
    );
}

export default IPod;