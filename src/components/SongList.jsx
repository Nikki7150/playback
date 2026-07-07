import "../styles/ipod.css";
import { useState, useRef, useEffect } from "react";

function SongList({ songs, setCurrentSong, setCurrentScreen, selectedItem, setSelectedItem, setPreviousScreen, currentScreen }) {
    const itemRefs = useRef([]);

    useEffect(() => {
        const index = songs.indexOf(selectedItem);
        itemRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, [selectedItem]);

    return (
        <ul className="song-list">
            {songs.map((song, index) => (
                <li 
                    key={song.id}
                    ref={(el) => (itemRefs.current[index] = el)}
                    className={selectedItem === song ? "song-item active" : "song-item"}
                    onClick={() => {
                        setPreviousScreen(currentScreen);
                        setCurrentSong(song);
                        setCurrentScreen("Now Playing");
                    }}
                >
                    {song.albumArt && <img src={song.albumArt} alt="Album Art" className="album-art" />}
                    {song.title} - {song.artist}  
                    {song.duration && <span className="song-duration">{Math.floor(song.duration / 60)}:{String(Math.floor(song.duration % 60)).padStart(2, '0')}</span>}
                </li>
            ))}
        </ul>
    )
}

export default SongList;