import { useLanguage } from 'hooks';
import './index.scss';
function Footer(props) {
    const { t } = useLanguage();
    const userInfo = props.userInfo;
    return (
        <div className='footer-box aniFooterAction'>
            <div className='user-wallet'>{t("Global.balance")}：
                {userInfo.BetLimitCurrencyType}&nbsp;
                {userInfo && userInfo.Wallet && userInfo.Wallet.map((i, index) => (
                    i.CurrencyType === userInfo.BetLimitCurrencyType ? <span className='without-mr' key={index}>{i.Balance}</span> : ''
                ))}
            </div>
        </div>
    )
}

export default Footer;