import IPod from "../components/IPod";
import "../index.css";
import "../styles/ipod.css";

import flowerWallpaper from "../assets/wallpapers/flower wallpaper.jpeg";

import { supabase } from "../utils/supabaseClient.js";
import { useState, useEffect } from "react";

function Home() {
    const [user, setUser] = useState(null);

    const [shuffle, setShuffle] = useState(false);

    const [darkMode, setDarkMode] = useState(false);

    const defaultCustomization = {
        appThemeColor: "#facbe6",
        ipodBackground: flowerWallpaper,
        fontFamily: "Unica One",
        fontColor: "#000000",
        accentColor: "#2d72bc",
        ipodColor: "#e2e2e2",
    };

    const [customization, setCustomization] = useState(defaultCustomization);

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

    const saveProfile = async () => {
        if (!user) return;
        const { error } = await supabase
            .from("profiles")
            .upsert({
                id: user.id,
                app_theme_color: customization.appThemeColor,
                ipod_background_url: customization.ipodBackground,
                font_family: customization.fontFamily,
                font_color: customization.fontColor,
                accent_color: customization.accentColor,
                ipod_color: customization.ipodColor,
                dark_mode: darkMode,
                shuffle: shuffle,
            });
        if (error) console.error("Error saving profile:", error);
    };

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchOrCreateProfile(session.user.id);
            }
        });
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        saveProfile();
    }, [customization, darkMode, shuffle]);

    const handleStickerUpload = (position, file) => {
        const imageUrl = URL.createObjectURL(file);
        const updatedStickers = customization.stickers.map(sticker =>
            sticker.position === position ? { ...sticker, image: imageUrl } : sticker
        );
        setCustomization({ ...customization, stickers: updatedStickers });
    };

    const handleResetCustomization = () => {
        setCustomization(defaultCustomization);
        console.log(customization.ipodBackground)
    };

    return (
        <div className="home" style={{"--app-theme-color": customization.appThemeColor}}>
            <IPod customization={customization} setCustomization={setCustomization} handleResetCustomization={handleResetCustomization} defaultCustomization={defaultCustomization} shuffle={shuffle} setShuffle={setShuffle} darkMode={darkMode} setDarkMode={setDarkMode} user={user} setUser={setUser} />
        </div>
    );
}

export default Home;