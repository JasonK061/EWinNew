import { useLanguage } from 'hooks';
import './index.scss';
function GameFooter(props) {
    const { t } = useLanguage();
    const userInfo = props.userInfo;
    return (
        <div className='game-footer-box aniFooterAction'>
            <div className='total-betting'>
                <span className='title'>
                    {t('Global.total_betting')}：
                </span>
                <span>
                    {userInfo.BetLimitCurrencyType}&nbsp;
                </span>
            </div>
            <div className='user-wallet'>
                <span className='title'>{t("Global.balance")}：</span>
                <span>
                    {userInfo.BetLimitCurrencyType}&nbsp;
                    {userInfo && userInfo.Wallet && userInfo.Wallet.map((i, index) => (
                        i.CurrencyType === userInfo.BetLimitCurrencyType ? <span className='without-mr' key={index}>{i.Balance}</span> : ''
                    ))}
                </span>
            </div>
        </div>
    )
}

export default GameFooter;