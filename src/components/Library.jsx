import "../styles/ipod.css";
import { extractSongData } from "../utils/extractSongsData";
import SongList from "./SongList.jsx";

import { useState } from 'react';
import { supabase } from "../utils/supabaseClient.js";

function Library({ songs, setSongs, currentSong, setCurrentSong, setCurrentScreen, selectedItem, setSelectedItem, setPreviousScreen, currentScreen, darkMode, user }) {
    const handleSongUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const newSong = await extractSongData(file);
        setSongs([...songs, newSong]);
    };

    const saveSongToSupabase = async (song, file, userId) => {
        // upload the audio file to user-audio bucket
        const { data, error } = await supabase.storage
            .from("user-audio")
            .upload(`${user.id}/${song.id}`, file, { upsert: true });
        if (error) { 
            console.error("Error uploading song:", error); 
            return; 
        }
        // upload album art if it exists
        if (song.albumArt) {
            const { data: albumArtData, error: albumArtError } = await supabase.storage
                .from("user-images")
                .upload(`${user.id}/${song.id}-album-art`, song.albumArt, { upsert: true });
            if (albumArtError) { 
                console.error("Error uploading album art:", albumArtError); 
                return; 
            }
        }
        // get public URLs for both
        const { data: audioUrlData } = supabase.storage
            .from("user-audio")
            .getPublicUrl(`${user.id}/${song.id}`);
        const audioPublicUrl = audioUrlData.publicUrl;

        let albumArtPublicUrl = null;
        if (song.albumArt) {
            const { data: albumArtUrlData } = supabase.storage
                .from("user-images")
                .getPublicUrl(`${user.id}/${song.id}-album-art`);
            albumArtPublicUrl = albumArtUrlData.publicUrl;
        }

        // insert a row into the songs table
        const { data: songData, error: songError } = await supabase
            .from("songs")
            .insert([
                {
                    id: song.id,
                    title: song.title,
                    artist: song.artist,
                    duration: song.duration,
                    audioUrl: audioPublicUrl,
                    albumArtUrl: albumArtPublicUrl,
                    userId: userId
                }
            ]);
        if (songError) { 
            console.error("Error inserting song into database:", songError); 
            return; 
        }
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
                darkMode={darkMode}
                user={user}
            />
        </div>
    );
}

export default Library;