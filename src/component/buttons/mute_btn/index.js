import { useState, useRef } from 'react';
import './index.scss';

const MuteButton = () => {

    // const muteRef = useRef(null);

    const [isMuted, setIsMuted] = useState(false);

    const toggleMute = () => {
        setIsMuted(!isMuted)
        // 控制項先不啟用, 等實際看怎麼返回再寫
        // muteRef.current.muted = !isMuted;
    }


    return (
        <div className='mute-box forpc'>
            {isMuted ?
                <div onClick={toggleMute} className='mute' />
                :
                <div onClick={toggleMute} className='unmute' />
            }
        </div>
    )
}

export default MuteButton;