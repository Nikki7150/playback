import "../styles/ipod.css";
import { extractSongData } from "../utils/extractSongsData";
import { saveSongToSupabase } from "../utils/saveToSupabase";
import SongList from "./SongList.jsx";

import { useState } from 'react';
import { supabase } from "../utils/supabaseClient.js";

function Library({ songs, setSongs, currentSong, setCurrentSong, setCurrentScreen, selectedItem, setSelectedItem, setPreviousScreen, currentScreen, darkMode, user }) {
    const [isUploading, setIsUploading] = useState(false);

    const handleSongUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsUploading(true);
        const newSong = await extractSongData(file);
        if (user) {
            const savedSong = await saveSongToSupabase(newSong, file, user.id);
            if (savedSong) {
                setSongs([...songs, savedSong]);
            } else {
                console.error("Failed to save song to Supabase");
            }
        } else {
            setSongs([...songs, newSong]);
        }
        setIsUploading(false);
    };

    return (
        <div className="library">
            <div className="loading" style={{ display: isUploading ? "block" : "none" }}>
                Uploading...
            </div>
            <button className={selectedItem === "Add Song" ? "add-song-button active" : "add-song-button"} onClick={() => document.querySelector('.song-input').click()}>
                Add Song
            </button>
            <input type="file" accept="audio/*,.mp3,.m4a,.wav" className="song-input" onChange={handleSongUpload} />
            <SongList 
                songs={songs} 
                setCurrentSong={setCurrentSong} 
                setCurrentScreen={setCurrentScreen} 
                selectedItem={selectedItem} 
                setSelectedItem={setSelectedItem}
                setPreviousScreen={setPreviousScreen}
                currentScreen={currentScreen}
                darkMode={darkMode}
                user={user}
            />
        </div>
    );
}

export default Library;