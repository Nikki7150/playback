import "../styles/ipod.css";
import ClickWheel from "./ClickWheel.jsx";
import Screen from"./Screen.jsx";
import { useState, useRef, useEffect } from "react";
import flowerWallpaper from "../assets/wallpapers/flower wallpaper.jpeg";

import { supabase } from "../utils/supabaseClient.js";
import { handleGoogleLogin, handleLogout } from "./Login.jsx";

function IPod({ customization, setCustomization, handleResetCustomization }) {
    const [currentScreen, setCurrentScreen] = useState("Menu");

    const menuItems = ["Library", "Playlists", "Now Playing", "Settings"];

    const [selectedMenu, setSelectedMenu] = useState("Library");

    const [songs, setSongs] = useState([]);

    const [currentSong, setCurrentSong] = useState(null);

    const [selectedItem, setSelectedItem] = useState("Add Song");

    const [ isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef(null);

    const [ currentTime, setCurrentTime] = useState(0);

    const [ playlists, setPlaylists] = useState([]);

    const [ selectedPlaylist, setSelectedPlaylist ] = useState(null);

    const [darkMode, setDarkMode] = useState(false);

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const skipSong = (direction, wrap = true) => {
        if (!currentSong || songs.length === 0) return;
        if (shuffle) {
            const randomIndex = Math.floor(Math.random() * songs.length);
            setCurrentSong(songs[randomIndex]);
            setSelectedItem(songs[randomIndex]);
            setIsPlaying(true);
            return;
        }
        const currentIndex = songs.indexOf(currentSong);
        let newIndex = currentIndex + direction;
        if (newIndex < 0) newIndex = wrap ? songs.length - 1 : 0;
        if (newIndex >= songs.length) {
            if (wrap) newIndex = 0;
            else {
                setIsPlaying(false);
                return;
            }
        }
        setCurrentSong(songs[newIndex]);
        setSelectedItem(songs[newIndex]);
        setIsPlaying(true); // Automatically play the new song
    };

    const [previousScreen, setPreviousScreen] = useState("Menu");

    const [user, setUser] = useState(null);

    const [shuffle, setShuffle] = useState(false);

    const fontOptions = ["Unica One", "Indie Flower", "Handjet", "Sue Ellen Fransico", "Oxanium"];

    const fetchOrCreateProfile = async (userId) => {
        const { error: upsertError } = await supabase
            .from("profiles")
            .upsert(
                {
                    id: userId,
                    app_theme_color: "#facbe6",
                    ipod_background_url: flowerWallpaper,
                    font_family: "Unica One",
                    font_color: "#000000",
                    accent_color: "#2d72bc",
                    ipod_color: "#e2e2e2",
                    dark_mode: false,
                    shuffle: false,
                },
                { onConflict: "id", ignoreDuplicates: true }
            );
        if (upsertError) {
            console.error("Error upserting profile:", upsertError);
            return;
        }
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();
        if (error) {
            console.error("Error fetching profile after upsert:", error);
            return;
        }
        setCustomization({
            appThemeColor: data.app_theme_color,
            ipodBackground: data.ipod_background_url,
            fontFamily: data.font_family,
            fontColor: data.font_color,
            accentColor: data.accent_color,
            ipodColor: data.ipod_color,
        });
        setDarkMode(data.dark_mode);
        setShuffle(data.shuffle);
    };

    useEffect(() => {
        // function to run
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentSong]); // thing to watch for change
    // the array is a dependency array - if the value in the array changes, the function will run again

    useEffect(() => {
        setCurrentTime(0);
    }, [currentSong]);

    useEffect(() => {
        // fires when app loads and again when the user logs in or out
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchOrCreateProfile(session.user.id);
            }
        });

        // 
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return (
        <div className="ipod-container">
            <h1>PlayBack</h1>
            <div className="ipod" style={{ "--ipod-color": customization.ipodColor, "--font-color": customization.fontColor, "--accent-color": customization.accentColor, "--ipod-background": `url(${customization.ipodBackground})`, "--font-family": customization.fontFamily }}>
                <Screen currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} menuItems={menuItems} songs={songs} setSongs={setSongs} currentSong={currentSong} setCurrentSong={setCurrentSong} currentTime={currentTime} playlists={playlists} setPlaylists={setPlaylists} selectedItem={selectedItem} setSelectedItem={setSelectedItem} selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist} previousScreen={previousScreen} setPreviousScreen={setPreviousScreen} user={user} customization={customization} setCustomization={setCustomization} shuffle={shuffle} setShuffle={setShuffle} handleResetCustomization={handleResetCustomization} fontOptions={fontOptions} darkMode={darkMode} setDarkMode={setDarkMode} />
                <ClickWheel currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} menuItems={menuItems} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} skipSong={skipSong} selectedItem={selectedItem} setSelectedItem={setSelectedItem} selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist} playlists={playlists} previousScreen={previousScreen} setPreviousScreen={setPreviousScreen} user={user} shuffle={shuffle} setShuffle={setShuffle} handleResetCustomization={handleResetCustomization} fontOptions={fontOptions} customization={customization} setCustomization={setCustomization} />
                <audio ref={audioRef} src={currentSong?.fileUrl} onTimeUpdate={handleTimeUpdate} onEnded={() => skipSong(1, false)} />
            </div>
        </div>
    );
}

export default IPod;