import './index.scss';
import GetDefaultVedio from 'img/gamelobby/mb-banner.png';

// 沒資料暫時先這樣寫, 實際應該是即時的影像
function DefaultVedio() {
    return (
        <div className="default-vedio-box">
            <img src={GetDefaultVedio} alt="default" />
        </div>
    )
}

export default DefaultVedio;