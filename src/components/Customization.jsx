import "../styles/ipod.css";
import { useState, useEffect, useRef } from "react";

import { FaToggleOff, FaToggleOn, FaRandom } from 'react-icons/fa';
import { supabase } from "../utils/supabaseClient.js";

function Customization({ darkMode, setDarkMode, user, selectedItem, customization, setCustomization, fontOptions, customizationItems }) {
    const handleBackgroundUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const { data, error } = await supabase.storage
            .from("user-images")
            .upload(`${user.id}/wallpaper.jpg`, file, { upsert: true });
        if (error) { 
            console.error("Error uploading background:", error); 
            return; 
        }
        const { data: urlData } = supabase.storage
            .from("user-images")
            .getPublicUrl(`${user.id}/wallpaper.jpg`);
        const publicUrl = urlData.publicUrl;
        setCustomization({...customization, ipodBackground: publicUrl});
    };

    const itemRefs = useRef([]);
    
    useEffect(() => {
        const index = customizationItems.indexOf(selectedItem);
        itemRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, [selectedItem]);

    return (
        <div className={darkMode ? "customization dark" : "customization"}>
            <ul className={darkMode ? "customization-list dark" : "customization-list"}>
                {/*app theme*/}
                <li ref={(el) => (itemRefs.current[0] = el)} className={selectedItem === "App Theme" ? "app-theme active" : "app-theme"} onClick={() => document.querySelector('.appTheme').click()}>
                    App Theme 
                    <input 
                        type="color" 
                        value={customization.appThemeColor} 
                        className="appTheme color" 
                        onChange={(e) => setCustomization({...customization, appThemeColor: e.target.value})}
                    />
                </li>
                {/*ipod screen background*/}
                <li ref={(el) => (itemRefs.current[1] = el)} className={selectedItem === "iPod Background" ? "ipod-background active" : "ipod-background"} onClick={() => document.querySelector('.background-input').click()}>
                    iPod Background
                    <input 
                        type="file" 
                        className="background-input" 
                        style={{ display: "none" }} 
                        onChange={handleBackgroundUpload}
                    />
                </li>
                {/*font type*/}
                <li ref={(el) => (itemRefs.current[2] = el)} className={selectedItem === "Font Type" ? "font-type active" : "font-type"} 
                    onClick={() => {
                        const currentIndex = fontOptions.indexOf(customization.fontFamily);
                        let newIndex = currentIndex + 1;
                        if (newIndex < 0) newIndex = fontOptions.length - 1;
                        if (newIndex >= fontOptions.length) newIndex = 0;
                        setCustomization({...customization, fontFamily: fontOptions[newIndex]})
                    }}>
                    Font Type-
                    <span className="font-type-display"> {customization.fontFamily}</span>
                </li>
                {/*font color*/}
                <li ref={(el) => (itemRefs.current[3] = el)} className={selectedItem === "Font Color" ? "font-color active" : "font-color"} onClick={() => document.querySelector('.fontColor').click()}>
                    Font Color 
                    <input 
                        type="color" 
                        value={customization.fontColor} 
                        className="fontColor color" 
                        onChange={(e) => setCustomization({...customization, fontColor: e.target.value})}
                    />
                </li>
                {/*accent color*/}
                <li ref={(el) => (itemRefs.current[4] = el)} className={selectedItem === "Accent Color" ? "accent-color active" : "accent-color"} onClick={() => document.querySelector('.accentColor').click()}>
                    Accent Color 
                    <input 
                        type="color" 
                        value={customization.accentColor} 
                        className="accentColor color" 
                        onChange={(e) => setCustomization({...customization, accentColor: e.target.value})}
                    />
                </li>
                {/*ipod color*/}
                <li ref={(el) => (itemRefs.current[5] = el)} className={selectedItem === "Ipod Color" ? "ipod-color active" : "ipod-color"} onClick={() => document.querySelector('.ipodColor').click()}>
                    Ipod Color 
                    <input 
                        type="color" 
                        value={customization.ipodColor} 
                        className="ipodColor color" 
                        onChange={(e) => setCustomization({...customization, ipodColor: e.target.value})}
                    />
                </li>
            </ul>
        </div>
    );
}

export default Customization;