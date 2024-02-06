import { useLanguage } from 'hooks';
import './index.scss';
function Footer() {
    const { t } = useLanguage();
    return (
        <div className='footer-box aniFooterAction'>
            <div className='user-wallet'>{t("Global.balance")}：PHP 0</div>
        </div>
    )
}

export default Footer;