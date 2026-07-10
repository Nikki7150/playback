import "../styles/ipod.css";

import { FaToggleOff, FaToggleOn, FaRandom } from 'react-icons/fa';

function Customization({ darkMode, setDarkMode, user, selectedItem, customization, setCustomization, fontOptions }) {
    const handleBackgroundUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const imageUrl = URL.createObjectURL(file);
        setCustomization({...customization, ipodBackground: imageUrl});
    };

    const handleStickerUpload = (position, file) => {
        const imageUrl = URL.createObjectURL(file);
        const updatedStickers = customization.stickers.map(sticker =>
            sticker.position === position ? { ...sticker, image: imageUrl } : sticker
        );
        setCustomization({ ...customization, stickers: updatedStickers });
    };

    return (
        <div className={darkMode ? "customization dark" : "customization"}>
            <ul className={darkMode ? "customization-list dark" : "customization-list"}>
                {/*app theme*/}
                <li className={selectedItem === "App Theme" ? "app-theme active" : "app-theme"} onClick={() => document.querySelector('.appTheme').click()}>
                    App Theme 
                    <input 
                        type="color" 
                        value={customization.appThemeColor} 
                        className="appTheme color" 
                        onChange={(e) => setCustomization({...customization, appThemeColor: e.target.value})}
                    />
                </li>
                {/*ipod screen background*/}
                <li className={selectedItem === "iPod Background" ? "ipod-background active" : "ipod-background"} onClick={() => document.querySelector('.background-input').click()}>
                    iPod Background
                    <input 
                        type="file" 
                        className="background-input" 
                        style={{ display: "none" }} 
                        onChange={handleBackgroundUpload}
                    />
                </li>
                {/*font type*/}
                <li className={selectedItem === "Font Type" ? "font-type active" : "font-type"} 
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
                <li className={selectedItem === "Font Color" ? "font-color active" : "font-color"} onClick={() => document.querySelector('.fontColor').click()}>
                    Font Color 
                    <input 
                        type="color" 
                        value={customization.fontColor} 
                        className="fontColor color" 
                        onChange={(e) => setCustomization({...customization, fontColor: e.target.value})}
                    />
                </li>
                {/*accent color*/}
                <li className={selectedItem === "Accent Color" ? "accent-color active" : "accent-color"} onClick={() => document.querySelector('.accentColor').click()}>
                    Accent Color 
                    <input 
                        type="color" 
                        value={customization.accentColor} 
                        className="accentColor color" 
                        onChange={(e) => setCustomization({...customization, accentColor: e.target.value})}
                    />
                </li>
                {/*ipod color*/}
                <li className={selectedItem === "Ipod Color" ? "ipod-color active" : "ipod-color"} onClick={() => document.querySelector('.ipodColor').click()}>
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