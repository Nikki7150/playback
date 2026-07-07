import "../styles/ipod.css";
import { extractSongData } from "../utils/extractSongsData";
import SongList from "./SongList.jsx";

import { useState } from 'react';

function Library({ songs, setSongs, currentSong, setCurrentSong, setCurrentScreen, selectedItem, setSelectedItem, setPreviousScreen, currentScreen }) {
    const handleSongUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const newSong = await extractSongData(file);
        setSongs([...songs, newSong]);
    };

    return (
        <div className="library">
            <button className={selectedItem === "Add Song" ? "add-song-button active" : "add-song-button"} onClick={() => document.querySelector('.song-input').click()}>
                Add Song
            </button>
            <input type="file" accept="audio/*" className="song-input" onChange={handleSongUpload} />
            <SongList 
                songs={songs} 
                setCurrentSong={setCurrentSong} 
                setCurrentScreen={setCurrentScreen} 
                selectedItem={selectedItem} 
                setSelectedItem={setSelectedItem}
                setPreviousScreen={setPreviousScreen}
                currentScreen={currentScreen}
            />
        </div>
    );
}

export default Library;