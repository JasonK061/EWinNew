import { useState, useRef, useEffect } from 'react';
import { useLanguage } from 'hooks';
import './index.scss';

const HowToPlayButton = () => {
    const { t } = useLanguage();
    const [hoveredItem, setHoveredItem] = useState(0);
    const settingsRef = useRef(null);

    const handleDocumentClick = (e) => {
        if (settingsRef.current && !settingsRef.current.contains(e.target)) {
            // 當點擊 settings 以外的地方時，設定 setHoveredItem(null)
            setHoveredItem(null);
        }
    };

    useEffect(() => {
        // 在 component mount 時加入 click 事件監聽器
        document.addEventListener('click', handleDocumentClick);

        // 在 component unmount 時移除 click 事件監聽器
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <div className='how-to-play-box forpc'>
            <div
                className='how-to-play'
                onClick={() => setHoveredItem(1)}
                ref={settingsRef}
            >

                <div className={`hover-box ${hoveredItem === 1 ? 'visible' : ''}`}>
                    <div className='title'>{t("HowToPlay.title")}</div>
                    <div className='dis'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowToPlayButton;