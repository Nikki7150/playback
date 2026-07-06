import "../styles/ipod.css";
import ClickWheel from "./ClickWheel.jsx";
import Screen from"./Screen.jsx";
import { useState, useRef, useEffect } from "react";

function IPod() {
    const [currentScreen, setCurrentScreen] = useState("Menu");

    const menuItems = ["Library", "Playlists", "Now Playing", "Settings"];
    
    const [selectedMenu, setSelectedMenu] = useState("Library");

    const [songs, setSongs] = useState([]);

    const [currentSong, setCurrentSong] = useState(null);

    const [ selectedSong, setSelectedSong] = useState(null);

    const [ isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef(null);

    const [ currentTime, setCurrentTime] = useState(0);

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

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
            <div className="ipod">
                <Screen currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} menuItems={menuItems} songs={songs} setSongs={setSongs} currentSong={currentSong} setCurrentSong={setCurrentSong} selectedSong={selectedSong} setSelectedSong={setSelectedSong} currentTime={currentTime} />
                <ClickWheel currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} menuItems={menuItems} selectedSong={selectedSong} setSelectedSong={setSelectedSong} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

                <audio ref={audioRef} src={currentSong?.fileUrl} onTimeUpdate={handleTimeUpdate} />
            </div>
        </div>
    );
}

export default IPod;