import "../styles/ipod.css";
import { FaAngleRight } from 'react-icons/fa';
import { extractSongData } from "../utils/extractSongsData.jsx";
import { saveSongToSupabase } from "../utils/saveToSupabase.jsx";
import { savePlaylistToSupabase } from "../utils/saveToSupabase.jsx";
import { useState } from "react";
import SongList from "./SongList.jsx";

function Playlist({ playlists, setPlaylists, songs, setSongs, setCurrentSong, setCurrentScreen, selectedItem, setSelectedItem, selectedPlaylist, setSelectedPlaylist, setPreviousScreen, currentScreen, user, darkMode }) {
    const [isUploading, setIsUploading] = useState(false);

    const handlePlaylistUpload = async (e) => {
        const files = Array.from(e.target.files); 
        if (files.length === 0) return;
        setIsUploading(true);
        const newSongs = [];
        const songIds = [];
        for (const file of files) {
            const newSong = await extractSongData(file);
            if (user) {
                const savedSong = await saveSongToSupabase(newSong, file, user.id);
                if (savedSong) {
                    newSongs.push(savedSong);
                }
            } else {
                newSongs.push(newSong);
            }
            songIds.push(newSong.id);
        }
        const folderName = files[0].webkitRelativePath.split('/')[0];
        const newPlaylist = {
            name: folderName,
            songIds: songIds,
            id: crypto.randomUUID(),
        };
        if (user) {
            await savePlaylistToSupabase(newPlaylist, user.id);
        }
        setSongs([...songs, ...newSongs]);
        setPlaylists([...playlists, newPlaylist]);
        setIsUploading(false);
    };

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const handleMobilePlaylistUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        const playlistName = window.prompt("Name your playlist:");
        if (!playlistName) return;
        setIsUploading(true);
        const newSongs = [];
        const songIds = [];
        for (const file of files) {
            const newSong = await extractSongData(file);
            if (user) {
                const savedSong = await saveSongToSupabase(newSong, file, user.id);
                if (savedSong) newSongs.push(savedSong);
            } else {
                newSongs.push(newSong);
            }
            songIds.push(newSong.id);
        }
        const newPlaylist = {
            name: playlistName,
            songIds: songIds,
            id: crypto.randomUUID(),
        };
        if (user) {
            await savePlaylistToSupabase(newPlaylist, user.id);
        }
        setSongs([...songs, ...newSongs]);
        setPlaylists([...playlists, newPlaylist]);
        setIsUploading(false);
    };

    return (
        <div className={darkMode ? "playlist dark" : "playlist"}>
            <div className="loading" style={{ display: isUploading ? "block" : "none" }}>
                Uploading...
            </div>
            {selectedPlaylist === null && (
                <><button className={selectedItem === "Add Playlist" ? "add-playlist-button active" : "add-playlist-button"} onClick={() => document.querySelector('.playlist-input').click()}>
                    Add Playlist
                </button>
                {isMobile ? (
                    <input 
                        type="file" 
                        accept="audio/*,.mp3,.m4a,.wav" 
                        multiple 
                        className="playlist-input" 
                        onChange={handleMobilePlaylistUpload} 
                    />
                ) : (
                    <input 
                        type="file" 
                        webkitdirectory="" 
                        className="playlist-input" 
                        onChange={handlePlaylistUpload} 
                    />
                )}
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