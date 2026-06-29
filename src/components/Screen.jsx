import "../styles/ipod.css";

function Screen() {
    return (
        <div className="screen">
            <h3>PlayBack</h3>
            <ul className="menu-items">
                <li>Library</li>
                <li>Playlists</li>
                <li>Now Playing</li>
                <li>Settings</li>
            </ul>
        </div>
    );
}

export default Screen;