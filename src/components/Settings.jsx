function Settings({ darkMode, setDarkMode }) {
    return (
        <div className={darkMode ? "settings dark" : "settings"}>
            <h2>Settings</h2>
            <ul>
                <li>
                    <label>
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                        />
                        Dark Mode
                    </label>
                </li>
                <li>Volume</li>
                <li>Display</li>
            </ul>
        </div>
    );
}

export default Settings;