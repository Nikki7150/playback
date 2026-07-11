import "../styles/ipod.css";
import { useState, useRef } from "react";


import { FaPlay, FaPause } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { FaFastForward } from 'react-icons/fa';
import { FaFastBackward } from 'react-icons/fa';

function ClickWheel({ currentScreen, setCurrentScreen, selectedMenu, setSelectedMenu, menuItems, songs, currentSong, setCurrentSong, isPlaying, setIsPlaying, skipSong, selectedItem, setSelectedItem, selectedPlaylist, setSelectedPlaylist, playlists, previousScreen, setPreviousScreen, user, shuffle, setShuffle, handleResetCustomization, fontOptions, customization, setCustomization, customizationItems, audioRef }) {
    // useRef doesnt rerender and gives final values - better than useState that rerenders
    const wheelRef = useRef(null);
    const isDragging = useRef(false);
    const prevAngle = useRef(0);
    const accumulatedRotation = useRef(0);

    const getAngle = (clientX, clientY) => {
        const wheel = wheelRef.current;
        const rect = wheel.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = clientX - centerX;
        const dy = clientY - centerY;
        return Math.atan2(dy, dx) * (180 / Math.PI); // Convert radians to degrees
    };

    const handlePointerDown = (e) => {
        isDragging.current = true;
        prevAngle.current = getAngle(e.clientX, e.clientY);
        accumulatedRotation.current = 0;
    };

    const handlePointerMove = (e) => {
        if (!isDragging.current) return;
        const currentAngle = getAngle(e.clientX, e.clientY);
        let difference = currentAngle - prevAngle.current;
        if (difference > 180) difference -= 360;
        else if (difference < -180) difference += 360;
        accumulatedRotation.current += difference;
        prevAngle.current = currentAngle;
        const threshold = 25; // degrees
        if (accumulatedRotation.current > threshold) {
            moveSelection(1); // Move selection down
            accumulatedRotation.current = 0;
        } else if (accumulatedRotation.current < -threshold) {
            moveSelection(-1); // Move selection up
            accumulatedRotation.current = 0;
        }
    };

    const handlePointerUp = () => {
        isDragging.current = false;
    };

    const moveSelection = (direction) => {
        if (currentScreen === "Menu") {
            const currentIndex = menuItems.indexOf(selectedMenu);
            let newIndex = currentIndex + direction;
            if (newIndex < 0) newIndex = menuItems.length - 1;
            if (newIndex >= menuItems.length) newIndex = 0;
            setSelectedMenu(menuItems[newIndex]);
        }
        if (currentScreen === "Library") {
            const libraryItems = ["Add Song", ...songs];
            const currentIndex = libraryItems.indexOf(selectedItem);
            let newIndex = currentIndex + direction;
            if (newIndex < 0) newIndex = libraryItems.length - 1;
            if (newIndex >= libraryItems.length) newIndex = 0;
            setSelectedItem(libraryItems[newIndex]);
        }
        if (currentScreen === "Playlists") {
            if (selectedPlaylist === null) {
                const playlistItems = ["Add Playlist", ...playlists];
                const currentIndex = playlistItems.indexOf(selectedItem);
                let newIndex = currentIndex + direction;
                if (newIndex < 0) newIndex = playlistItems.length - 1;
                if (newIndex >= playlistItems.length) newIndex = 0;
                setSelectedItem(playlistItems[newIndex]);
            } else {
                const playlistSongs = songs.filter((song) => selectedPlaylist.songIds.includes(song.id));
                const currentIndex = playlistSongs.indexOf(selectedItem);
                let newIndex = currentIndex + direction;
                if (newIndex < 0) newIndex = playlistSongs.length - 1;
                if (newIndex >= playlistSongs.length) newIndex = 0;
                setSelectedItem(playlistSongs[newIndex]);
            }
        }
        if (currentScreen === "Settings") {
            if (user) {
                const settingsItems = ["Dark Mode", "Shuffle", "Ipod Customization", "Reset Settings", "User Name", "Logout"];
                const currentIndex = settingsItems.indexOf(selectedItem);
                let newIndex = currentIndex + direction;
                if (newIndex < 0) newIndex = settingsItems.length - 1;
                if (newIndex >= settingsItems.length) newIndex = 0;
                setSelectedItem(settingsItems[newIndex]);
            } else {
                const settingsItems = ["Dark Mode", "Shuffle", "Ipod Customization", "Reset Settings", "Login with Google"];
                const currentIndex = settingsItems.indexOf(selectedItem);
                let newIndex = currentIndex + direction;
                if (newIndex < 0) newIndex = settingsItems.length - 1;
                if (newIndex >= settingsItems.length) newIndex = 0;
                setSelectedItem(settingsItems[newIndex]);
            }
        }
        if (currentScreen === "Customization") {
            const currentIndex = customizationItems.indexOf(selectedItem);
            let newIndex = currentIndex + direction;
            if (newIndex < 0) newIndex = customizationItems.length - 1;
            if (newIndex >= customizationItems.length) newIndex = 0;
            setSelectedItem(customizationItems[newIndex]);
        }
        if (currentScreen === "Now Playing") {
            seek(direction);
        }
    };

    const handleCenterClick = () => {
        if (currentScreen === "Menu") {
            setCurrentScreen(selectedMenu);
        }
        if (currentScreen === "Library" && selectedItem) {
            if (typeof selectedItem === "string") {
                document.querySelector('.song-input').click();
            } else {
                setPreviousScreen(currentScreen);
                setCurrentScreen("Now Playing");
                setCurrentSong(selectedItem);
            }
        }
        if (currentScreen === "Playlists" && selectedItem) {
            if (selectedPlaylist === null) {
                if (typeof selectedItem === "string") {
                    document.querySelector('.playlist-input').click();
                } else {
                    setSelectedPlaylist(selectedItem);
                }
            } else {
                setPreviousScreen(currentScreen);
                setCurrentScreen("Now Playing");
                setCurrentSong(selectedItem);
            }
        }
        if (currentScreen === "Settings" && selectedItem) {
            if (selectedItem === "Dark Mode") {
                document.querySelector('.dark-mode-button')?.click();
            }
            if (selectedItem === "Shuffle") {
                document.querySelector('.shuffle')?.click();
            }
            if (selectedItem === "Ipod Customization") {
                setPreviousScreen("Settings");
                setCurrentScreen("Customization");
            }
            if (selectedItem === "Reset Settings") {
                document.querySelector('.reset-settings')?.click();
            }
            if (selectedItem === "Logout") {
                document.querySelector('.logout')?.click();
            }
            if (selectedItem === "Login with Google") {
                document.querySelector('.login-google')?.click();
            }
        }
        if (currentScreen === "Customization") {
            if (selectedItem === "App Theme") {
                document.querySelector('.appTheme')?.click();
            }
            if (selectedItem === "iPod Background") {
                document.querySelector('.background-input')?.click();
            }
            if (selectedItem === "Font Type") {
                const currentIndex = fontOptions.indexOf(customization.fontFamily);
                let newIndex = currentIndex + 1;
                if (newIndex < 0) newIndex = fontOptions.length - 1;
                if (newIndex >= fontOptions.length) newIndex = 0;
                setCustomization({...customization, fontFamily: fontOptions[newIndex]})
            }
            if (selectedItem === "Font Color") {
                document.querySelector('.fontColor')?.click();
            }
            if (selectedItem === "Accent Color") {
                document.querySelector('.accentColor')?.click();
            }
            if (selectedItem === "Ipod Color") {
                document.querySelector('.ipodColor')?.click();
            }
        }
    };

    const handlePlayPause = () => {
        if (currentScreen === "Now Playing" && currentSong) {
            setIsPlaying(!isPlaying);
        }
    };

    const handleBackClick = () => {
        if (currentScreen === "Menu") {
            return;
        } else if (currentScreen === "Playlists" && selectedPlaylist !== null) {
            setSelectedPlaylist(null);
            return;
        } else if (currentScreen === "Now Playing") {
            setCurrentScreen(previousScreen);
            return;
        } else if (currentScreen === "Customization") {
            setCurrentScreen(previousScreen);
            return;
        } else {
            setCurrentScreen("Menu");
        }
    };

    const seek = (direction) => {
        if (!audioRef.current) return;
        const seekAmount = 5; // seconds
        audioRef.current.currentTime += direction * seekAmount;
    };

    return (
        <div 
            className="click-wheel"
            ref={wheelRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            <div className="glow-top"></div>
            <div className="glow-right"></div>
            <div className="glow-bottom"></div>
            <div className="glow-left"></div>

            <button onClick={handleBackClick} className="menu-button button">
                <FiMenu size={24} />
            </button>

            <button onClick={() => skipSong(1)} className="forward-button button">
                <FaFastForward size={24} />
            </button>

            <button onClick={() => skipSong(-1)} className="backward-button button">
                <FaFastBackward size={24} />
            </button>

            <button onClick={handlePlayPause} className="play-button button">
                {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>

            <div className="center-button" onClick={handleCenterClick}></div>
        </div>
    );
}

export default ClickWheel;