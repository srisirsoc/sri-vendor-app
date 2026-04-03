import React from 'react';
import './language-switcher.css';

const LanguageSwitch = ({ lang = "ENGLISH", MenuHandler }) => {
    return (
        <div className="language-switch">
            <small
                onClick={() => MenuHandler('lng', "ENGLISH")}
                className={`language-option ${lang === "ENGLISH" ? 'active' : ''}`}
            >
                ENG
            </small>
            <small
                onClick={() => MenuHandler('lng', "HINDI")}
                className={`language-option ${lang === "HINDI" ? 'active' : ''}`}
            >
                HIN
            </small>
        </div>
    );
};
export default LanguageSwitch;
