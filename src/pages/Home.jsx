import IPod from "../components/IPod";
import "../index.css";
import "../styles/ipod.css";

import flowerWallpaper from "../assets/wallpapers/flower wallpaper.jpeg";

import { useState } from "react";

function Home() {

    const handleStickerUpload = (position, file) => {
        const imageUrl = URL.createObjectURL(file);
        const updatedStickers = customization.stickers.map(sticker =>
            sticker.position === position ? { ...sticker, image: imageUrl } : sticker
        );
        setCustomization({ ...customization, stickers: updatedStickers });
    };

    const defaultCustomization = {
        appThemeColor: "#facbe6",
        ipodBackground: flowerWallpaper,
        fontFamily: "Unica One",
        fontColor: "#000000",
        accentColor: "#2d72bc",
        ipodColor: "#e2e2e2",
    };
    const [customization, setCustomization] = useState(defaultCustomization);

    const handleResetCustomization = () => {
        setCustomization(defaultCustomization);
        console.log(customization.ipodBackground)
    };

    return (
        <div className="home" style={{"--app-theme-color": customization.appThemeColor}}>
            <IPod customization={customization} setCustomization={setCustomization} handleResetCustomization={handleResetCustomization} defaultCustomization={defaultCustomization} />
        </div>
    );
}

export default Home;