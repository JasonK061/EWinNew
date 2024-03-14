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
import Header from 'component/header';
import RoadMap from 'component/road_map';
import SimilarGames from 'component/similar_games';
import { EWinGameLobbyClient } from 'signalr/EWinGameLobbyClient';
// 收藏頁面還沒設計好, 先開版之後再客制

// 生成 GUID 
function generate_uuidv4() {
    var dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var rnd = Math.random() * 16;
        rnd = (dt + rnd) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? rnd : (rnd & 0x3 | 0x8)).toString(16);
    });
}

const Gamefavorite = (props) => {
    // const { favorites } = props;
    const [getLocalFavorites, setGetLocalFavorites] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [moreScale, setMoreScale] = useState('');
    const [tiList, setTiList] = useState([]);
    const userInfo = props.userInfo || [];
    const aa = props.tiList || []; debugger
    const localStorageFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const EWinUrl = localStorage.getItem('EWinUrl');
    const CT = localStorage.getItem('CT');
    const Echo = 'Test_Echo';
    const GUID = generate_uuidv4();
    const Favos = props.favorites || [];
    const { t } = useLanguage();


    //const eWinGameLobbyClient = new EWinGameLobbyClient({ EWinUrl, CT, GUID, Echo });

    //useEffect(() => {
    //    // 初始化連接
    //    eWinGameLobbyClient.initializeConnection();

    //}, [])

    setGetLocalFavorites(localStorageFavorites);

    const handleClick = async (TableNumber) => {
        await props.toggleFavorite(TableNumber);

        if (Favos.includes(TableNumber)) {
            var index = Favos.indexOf(TableNumber);

            if (index > -1) {
                Favos.splice(index, 1);
            }
        } else {
            var index = Favos.indexOf(TableNumber);

            if (index == -1) {
                Favos.push(TableNumber);
            }
        }

        //eWinGameLobbyClient.SetUserAccountProperty(CT, GUID, "EWinGame.Favor", JSON.stringify(Favos), function (success, o) {
        //    if (success) {
        //        console.log("SetUserAccountProperty", o);
        //    }
        //});

        console.log("Favos", Favos);

        props.showMessage();
    };

    const mouseleave = () => {
        setHoveredItem(null);
        setMoreScale('');
    }

    const toggleMute = async (TableNumber) => {
        await props.toggleMute(TableNumber);
        // props.showMuteMessage();
    };

    const getGameName = (TableNumber, TableTimeoutSecond) => () => {
        props.getGameTitle(TableNumber);
        localStorage.setItem('getLocalTableTitle', TableNumber);
        console.log('TableTimeoutSecond', TableTimeoutSecond);
        // props.setSeconds(TableTimeoutSecond);
        // props.setFirstSeconds(TableTimeoutSecond);
    };

    // 獲取LOBBY 頁面的 table list相關資料
    //eWinGameLobbyClient.GetTableInfoList(CT, GUID, '', 0, (tabinfo) => {
    //    if (tabinfo && tabinfo.TableInfoList) {
    //        setTiList(tabinfo);
    //    } else {

    //    }
    //});

    return (
        <div>
            <h2>Favorites</h2>
            <p>Number of Favorites: {getLocalFavorites.length}</p>
            <ul>

                {tiList && tiList.TableInfoList && tiList.TableInfoList.map((i, index) => {
                    if (getLocalFavorites.includes(i.TableNumber)) {

                        < li key={index}
                            onMouseEnter={() => setHoveredItem(i.TableNumber)}
                            onMouseLeave={mouseleave}
                            className='li-box'
                        >
                            <span className='has-favorites' />
                            <div className={`games ${i.TableNumber}`}>
                                {/* 獲取ImageType為1的ImageUrl */}
                                {i.ImageList && i.ImageList.find(image => image.ImageType === 1) && (
                                    <img src={i.ImageList.find(image => image.ImageType === 1).ImageUrl} alt="Table Image" />
                                )}
                                <RoadMap />
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
                                        {/* <a href='/'> {i.TableTimeoutSecond} </a> */}
                                        <Link to={`/games/${i.TableNumber}`} onClick={getGameName(i.TableNumber, i.TableTimeoutSecond)}>{t("Global.start_games")}</Link>
                                    </div>
                                    <div className='game-table-wrap'>
                                        <RoadMap />
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
                                        <span onClick={() => handleClick(i.TableNumber)} className='remove-to-favorites' />

                                    </div>
                                </div>
                                <div className='more forpc' onClick={() => { setMoreScale('more-scale') }} />
                            </div>
                        </li>
                    }
                })}

            {/*{getLocalFavorites.map((item) => (*/}
            {/*    <li key={item}>{item}</li>*/}
            {/*))}*/}
        </ul>
        </div >
    )
}

export default connect()(Gamefavorite);