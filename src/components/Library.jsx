import "../styles/ipod.css";

import { useState } from 'react';
import jsmediatags from 'jsmediatags';

function Library({ songs, setSongs, currentSong, setCurrentSong, setCurrentScreen, selectedSong, setSelectedSong }) {
    const handleSongUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        jsmediatags.read(file, {
            onSuccess: (tag) => {
                const { title, artist, picture, album } = tag.tags;
                
                let albumArt = null;
                if (picture) {
                    const base64String = picture.data
                    .map((byte) => String.fromCharCode(byte))
                    .join("");
                    albumArt = `data:${picture.format};base64,${btoa(base64String)}`;
                }

                const audio = new Audio(URL.createObjectURL(file));
                // Wait for the audio metadata to load to get the duration
                audio.addEventListener('loadedmetadata', () => {
                    const newSong = {
                        title: title || file.name,
                        artist: artist || "Unknown Artist",
                        duration: audio.duration,
                        album: album || "Unknown Album",
                        albumArt,
                        fileUrl: URL.createObjectURL(file),
                    };
                    // creates fresh array reference which react can detect and rerender
                    setSongs([...songs, newSong]);
                });
            },
            onError: (error) => {
                console.error('Error reading tags:', error);
            }
        });
    };

    return (
        <div className="library">
            <button className="add-song-button">Add Song</button>
            <input type="file" accept="audio/*" className="song-input" onChange={handleSongUpload} />
            <ul className="song-list">
                {songs.map((song, index) => (
                    <li 
                        key={index}
                        className={selectedSong === song ? "song-item active" : "song-item"}
                        onClick={() => {
                            setCurrentSong(song);
                            setCurrentScreen("Now Playing");
                            //const audio = new Audio(song.fileUrl);
                            //audio.play();
                        }}
                    >
                        {song.albumArt && <img src={song.albumArt} alt="Album Art" className="album-art" />}
                        {song.title} - {song.artist}  {song.duration && <span className="song-duration">{Math.floor(song.duration / 60)}:{String(Math.floor(song.duration % 60)).padStart(2, '0')}</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Library;