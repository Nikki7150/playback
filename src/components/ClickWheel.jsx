import "../styles/ipod.css";
import { useState, useRef } from "react";


import { FaPlay, FaPause } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { FaFastForward } from 'react-icons/fa';
import { FaFastBackward } from 'react-icons/fa';

function ClickWheel({ currentScreen, setCurrentScreen, selectedMenu, setSelectedMenu, menuItems, selectedSong, setSelectedSong, songs, currentSong, setCurrentSong, isPlaying, setIsPlaying }) {
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

    const handleMouseDown = (e) => {
        isDragging.current = true;
        prevAngle.current = getAngle(e.clientX, e.clientY);
        accumulatedRotation.current = 0;
    };

    const handleMouseMove = (e) => {
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

    const handleMouseUp = () => {
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
            const currentIndex = songs.indexOf(selectedSong);
            let newIndex = currentIndex + direction;

            if (newIndex < 0) newIndex = songs.length - 1;
            if (newIndex >= songs.length) newIndex = 0;

            setSelectedSong(songs[newIndex]);
        }
    };

    const handleCenterClick = () => {
        if (currentScreen === "Menu") {
            setCurrentScreen(selectedMenu);
        }
        if (currentScreen === "Library" && selectedSong) {
            setCurrentScreen("Now Playing");
            setCurrentSong(selectedSong);
        }
    };

    const handlePlayPause = () => {
        if (currentScreen === "Now Playing" && currentSong) {
            setIsPlaying(!isPlaying);
        }
    };

    const skipSong = (direction) => {
        if (!currentSong || songs.length === 0) return;
        
        const currentIndex = songs.indexOf(currentSong);
        let newIndex = currentIndex + direction;

        if (newIndex < 0) newIndex = songs.length - 1;
        if (newIndex >= songs.length) newIndex = 0;

        setCurrentSong(songs[newIndex]);
        setSelectedSong(songs[newIndex]);
        setIsPlaying(true); // Automatically play the new song
    };

    return (
        <div 
            className="click-wheel"
            ref={wheelRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div className="glow-top"></div>
            <div className="glow-right"></div>
            <div className="glow-bottom"></div>
            <div className="glow-left"></div>

            <button onClick={() => setCurrentScreen("Menu")} className="menu-button button">
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