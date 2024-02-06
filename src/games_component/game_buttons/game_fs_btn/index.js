import React, { useState } from 'react';
import './index.scss';

const GameFullscreenButton = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        const element = document.documentElement;

        if (!isFullscreen) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }

        setIsFullscreen((prevFullscreen) => !prevFullscreen);
    };

    return (
        <div className='game-screen-box'>
            {isFullscreen ? <span onClick={toggleFullscreen} className='exitfullscreen'></span> : <span onClick={toggleFullscreen} className='fullscreen'></span>}
        </div>
    );
};

export default GameFullscreenButton;
