import "../styles/ipod.css";

function NowPlaying({ currentSong, setCurrentSong, songs, currentTime, playlists, selectedPlaylist, previousScreen }) {
    let trackNumber = 0;
    let totalTracks = 0;

    if (previousScreen === "Playlists" && selectedPlaylist) {
        const playlistSongs = songs.filter((song) => selectedPlaylist.songIds.includes(song.id));
        trackNumber = playlistSongs.indexOf(currentSong) + 1;
        totalTracks = playlistSongs.length;
    } else if (previousScreen === "Library") {
        trackNumber = songs.indexOf(currentSong) + 1;
        totalTracks = songs.length;
    }

    const ellapsedTime = currentTime;
    const totalTime = currentSong?.duration || 0;
    const progress = totalTime > 0 ? (ellapsedTime / totalTime) * 100 : 0;

    return (
        <div className="now-playing">
            <div className="track-number">{trackNumber} of {totalTracks}</div>
            <div className="song-details">
                <img src={currentSong?.albumArt} alt="Album Art" className="album-pic" />
                <div className="song-info">
                    <h4>{currentSong?.title || "No song currently playing"}</h4>
                    <p>{currentSong?.artist || "No artist available"}</p>
                    <p>{currentSong?.album || "No album available"}</p>
                </div>
            </div>
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="time-info">
                <span className="current-time">{currentSong?.duration ? `${Math.floor(ellapsedTime / 60)}:${String(Math.floor(ellapsedTime % 60)).padStart(2, '0')}` : '0:00'}</span>
                <span className="total-time">{currentSong?.duration ? `${Math.floor(currentSong.duration / 60)}:${String(Math.floor(currentSong.duration % 60)).padStart(2, '0')}` : '0:00'}</span>
            </div>
            
        </div>
    );
}

export default NowPlaying;