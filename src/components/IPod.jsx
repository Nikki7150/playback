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

    const [selectedItem, setSelectedItem] = useState("Add Song");

    const [ isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef(null);

    const [ currentTime, setCurrentTime] = useState(0);

    const [ playlists, setPlaylists] = useState([]);

    const [ selectedPlaylist, setSelectedPlaylist ] = useState(null);

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

    const skipSong = (direction, wrap = true) => {
        if (!currentSong || songs.length === 0) return;

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
    /*const prevScreenRef = useRef("Menu");

    useEffect(() => {
        setPreviousScreen(prevScreenRef.current); // save old
        prevScreenRef.current = currentScreen; // update to new
    }, [currentScreen]);*/

    return (
        <div className="ipod-container">
            <h1>PlayBack</h1>
            <div className="ipod">
                <Screen currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} menuItems={menuItems} songs={songs} setSongs={setSongs} currentSong={currentSong} setCurrentSong={setCurrentSong} currentTime={currentTime} playlists={playlists} setPlaylists={setPlaylists} selectedItem={selectedItem} setSelectedItem={setSelectedItem} selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist} previousScreen={previousScreen} setPreviousScreen={setPreviousScreen} />
                <ClickWheel currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} menuItems={menuItems} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} skipSong={skipSong} selectedItem={selectedItem} setSelectedItem={setSelectedItem} selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist} playlists={playlists} previousScreen={previousScreen} setPreviousScreen={setPreviousScreen} />

                <audio ref={audioRef} src={currentSong?.fileUrl} onTimeUpdate={handleTimeUpdate} onEnded={() => skipSong(1, false)} />
            </div>
        </div>
    );
}

export default IPod;