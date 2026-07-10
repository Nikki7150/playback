import "../styles/ipod.css";
import { FaAngleRight } from 'react-icons/fa';
import { extractSongData } from "../utils/extractSongsData.jsx";
import { useState } from "react";
import SongList from "./SongList.jsx";

function Playlist({ playlists, setPlaylists, songs, setSongs, setCurrentSong, setCurrentScreen, selectedItem, setSelectedItem, selectedPlaylist, setSelectedPlaylist, setPreviousScreen, currentScreen, user, darkMode }) {
    const handlePlaylistUpload = async (e) => {
        const files = Array.from(e.target.files); // Convert FileList to an array
        if (files.length === 0) return;

        const newSongs = [];
        const songIds = [];

        for (const file of files) {
            const newSong = await extractSongData(file); // let each song be extracted and added to the newSongs array
            newSongs.push(newSong);
            songIds.push(newSong.id);
        }

        const folderName = files[0].webkitRelativePath.split('/')[0];

        const newPlaylist = {
            name: folderName,
            songIds: songIds,
            id: crypto.randomUUID(),
        };

        setSongs([...songs, ...newSongs]);
        setPlaylists([...playlists, newPlaylist]);
    };

    return (
        <div className={darkMode ? "playlist dark" : "playlist"}>
            {selectedPlaylist === null && (
                <><button className={selectedItem === "Add Playlist" ? "add-playlist-button active" : "add-playlist-button"} onClick={() => document.querySelector('.playlist-input').click()}>
                    Add Playlist
                </button>
                <input type="file" webkitdirectory="" className="playlist-input" onChange={handlePlaylistUpload}/>
                <ul className={darkMode ? "playlist-list dark" : "playlist-list"}>
                        {playlists.map((playlist) => (
                            <li
                                className={selectedItem === playlist ? "playlist-item active" : "playlist-item"}
                                key={playlist.id}
                                onClick={() => setSelectedPlaylist(playlist)}
                            >
                                {playlist.name} <span className="arrow"><FaAngleRight /></span>
                            </li>
                        ))}
                    </ul></>
            )}

            {selectedPlaylist !== null && (
                <SongList
                    songs={songs.filter((song) => selectedPlaylist.songIds.includes(song.id))}
                    setCurrentSong={setCurrentSong}
                    setCurrentScreen={setCurrentScreen}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    setPreviousScreen={setPreviousScreen}
                    currentScreen={currentScreen}
                    darkMode={darkMode}
                    user={user}
                />
            )}
        </div>
    );
}

export default Playlist;