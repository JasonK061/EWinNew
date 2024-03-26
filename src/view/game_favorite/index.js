import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLanguage } from 'hooks';
import { Link, useHistory } from "react-router-dom";
import {
    toggleFavorite,
    showMessage,
    toggleMute,
    getGameTitle,
    setSeconds,
    setFirstSeconds
} from 'store/actions';
import RoadMap from 'component/road_map';
import SimilarGames from 'component/similar_games';
import { EWinGameLobbyClient } from 'signalr/bk/EWinGameLobbyClient';
import Loading from 'component/loading';
import { generateUUIDv4 } from 'utils/guid';
import './index.scss';

function Gamefavorite(props) {
    const { t } = useLanguage();

    const CT = localStorage.getItem('CT');
    const EWinUrl = localStorage.getItem('EWinUrl');
    const GUID = generateUUIDv4();
    const Echo = 'Test_Echo';

    const [isLoading, setIsLoading] = useState(true);
    const [tiList, setTiList] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    const [hoveredItem, setHoveredItem] = useState(null);
    const [moreScale, setMoreScale] = useState('');

    const [Favos, setFavos] = useState([]);
    const [shoeResults, setShoeResults] = useState('');

    const instance = EWinGameLobbyClient.getInstance(CT, EWinUrl);


    useEffect(() => {

        if (instance !== null) {

            // 設置相應的處理函數
            instance.handleConnected(() => {
                console.log('connected');

                // 監聽連線狀態
                instance.HeartBeat(Echo);

                instance.handleReceiveMsg((Msg) => {
                    console.log('處理接收訊息', Msg);
                });

                if (tiList.length === 0 || userInfo === 0) {

                    // 獲取使用者資料
                    instance.GetUserInfo(CT, GUID, (userInfo) => {
                        if (userInfo) {
                            // console.log('User information:', userInfo);
                            setUserInfo(userInfo);
                        } else {
                            console.log('Failed to get user information.');
                        }
                    });

                    // 獲取LOBBY 頁面的 table list相關資料
                    instance.GetTableInfoList(CT, GUID, '', 0, (tabinfo) => {
                        if (tabinfo && tabinfo.TableInfoList) {
                            setTiList(tabinfo);
                            setIsLoading(false)
                            console.log('Table information:', tabinfo);
                        } else {
                            console.error('tabInfoList is not an array:', tabinfo);
                        }
                    });

                    instance.GetUserAccountProperty(CT, GUID, "EWinGame.Favor", function (o) {
                        if (o) {
                            if (o.ResultCode == 0) {
                                setFavos(JSON.parse(o.PropertyValue));
                                setIsLoading(false)
                            }
                        }
                    });


                } else {
                    setIsLoading(false);
                }

            });
            instance.handleDisconnect(() => {
                console.log('EWinHub 連結失效');
            });

            instance.handleReconnecting(() => {
                console.log('重新連結 EWinHub');
            });

            instance.handleReconnected(() => {
                console.log('已重新連結 EWinHub');
            });
            // 初始化連接
            instance.initializeConnection();
        }
    }, [CT, EWinUrl]);

    const mouseleave = () => {
        setHoveredItem(null);
        setMoreScale('');
    }

    const getGameName = (TableNumber, TableTimeoutSecond) => () => {
        props.getGameTitle(TableNumber);
        localStorage.setItem('getLocalTableTitle', TableNumber);
    };

    const handleClick = async (TableNumber) => {

        if (Favos.includes(TableNumber)) {
            var index = Favos.indexOf(TableNumber);
            const updatedFavos = Favos.filter(num => num !== TableNumber);
            props.showMessage(`移除收藏 ${TableNumber}`);
            setFavos(updatedFavos);


            if (index > -1) {
                Favos.splice(index, 1);
            }
        }

        instance.SetUserAccountProperty(CT, GUID, "EWinGame.Favor", JSON.stringify(Favos), function (success, o) {
            if (success) {
                console.log("SetUserAccountProperty", o);
            }
        });

        console.log("Favos", Favos);

        // props.showMessage();
    };

    return (
        <div className='favorite_box'>
            {
                isLoading ? (<Loading />) : (
                    <div className="section_box" style={{ width: '100%' }}>
                        {Favos.length === 0 ? (
                            <div className='without_favorite'>
                                <h2>{t("Global.without_favorite")}</h2>
                            </div>
                        ) : (
                            <ul>
                                {tiList && tiList.TableInfoList && tiList.TableInfoList.map((i, index) => {
                                    if (Favos.includes(i.TableNumber)) {
                                        return (
                                            <li key={index}
                                                onMouseEnter={() => setHoveredItem(i.TableNumber)}
                                                onMouseLeave={mouseleave}
                                                className='li-box'
                                            >
                                                <span className={`${Favos.includes(i.TableNumber) ? 'has-favorites' : ''}`} />
                                                <div className={`games ${i.TableNumber}`}>
                                                    {/* 獲取ImageType為1的ImageUrl */}
                                                    {i.ImageList && i.ImageList.find(image => image.ImageType === 1) && (
                                                        <img src={i.ImageList.find(image => image.ImageType === 1).ImageUrl} alt="Table Image" />
                                                    )}
                                                    <RoadMap shoeResults={shoeResults} />
                                                </div>
                                                <p className='game-title'>
                                                    {i.TableNumber}
                                                </p>
                                                <p className='game-wallet'>
                                                    <span>{userInfo.BetLimitCurrencyType}</span>
                                                    <span>
                                                        {userInfo && userInfo.Wallet && userInfo.Wallet.map((i, index) => (
                                                            i.CurrencyType === userInfo.BetLimitCurrencyType ? <span className='without-mr' key={index}>{Math.floor(i.Balance)}</span> : ''
                                                        ))}
                                                    </span>
                                                </p>

                                                <div className={`hover-box ${hoveredItem === i.TableNumber ? 'visible' : ''} ${moreScale}`}>
                                                    <span className='close-hover-box' onClick={() => { setHoveredItem(null) }}></span>
                                                    <div className={`games ${i.TableNumber}`}>
                                                        {/* 獲取ImageType為1的ImageUrl */}
                                                        {i.ImageList && i.ImageList.find(image => image.ImageType === 1) && (
                                                            <img src={i.ImageList.find(image => image.ImageType === 1).ImageUrl} alt="Table Image" />
                                                        )}
                                                    </div>
                                                    <div className='info-box'>
                                                        <p className='game-title'>
                                                            {i.TableNumber}
                                                        </p>
                                                        <p className='game-wallet'>
                                                            <span>{userInfo.BetLimitCurrencyType}</span>
                                                            <span>
                                                                {userInfo && userInfo.Wallet && userInfo.Wallet.map((i, index) => (
                                                                    i.CurrencyType === userInfo.BetLimitCurrencyType ? <span className='without-mr' key={index}>{i.Balance}</span> : ''
                                                                ))}
                                                            </span>
                                                        </p>
                                                        <div className='game-start' >
                                                            <Link to={`/games/${i.TableNumber}`} onClick={getGameName(i.TableNumber, i.TableTimeoutSecond)}>{t("Global.start_games")}</Link>
                                                        </div>
                                                        <div className='game-table-wrap'>
                                                            <RoadMap shoeResults={shoeResults} />
                                                        </div>
                                                        <p className='game-dis'>
                                                            {i.Status}
                                                        </p>

                                                        {moreScale === 'more-scale'
                                                            ?
                                                            <div className='show-similar-games forpc'>
                                                                <p>{t("Global.similar_ganes")}</p>
                                                                <SimilarGames />
                                                            </div>
                                                            : ''
                                                        }

                                                        <div className='show-similar-games formb'>
                                                            <p>{t("Global.similar_ganes")}</p>
                                                            <SimilarGames />
                                                        </div>
                                                        <div className='favorites-box'>
                                                            <span onClick={() => toggleMute(i.TableNumber)} className={`video-control ${props.mutes.includes(i.TableNumber) ? 'video-unmute' : 'video-mute'}`} />
                                                            <span onClick={() => handleClick(i.TableNumber)} className={Favos.includes(i.TableNumber) ? 'remove-to-favorites' : 'add-to-favorites'} />

                                                        </div>
                                                    </div>
                                                    <div className='more forpc' onClick={() => { setMoreScale('more-scale') }} />
                                                </div>
                                            </li>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}

                            </ul>
                        )}
                    </div>
                )
            }
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        favorites: state.root.favorites || [],
        mutes: state.root.mutes || [],
        seconds: state.root.seconds,
        firstSeconds: state.root.firstSeconds,
        message: state.root.message
    };
};

const mapDispatchToProps = {
    toggleFavorite,
    showMessage,
    toggleMute,
    getGameTitle,
    setSeconds,
    setFirstSeconds
};

export default connect(mapStateToProps, mapDispatchToProps)(Gamefavorite);