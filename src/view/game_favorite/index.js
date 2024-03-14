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
import { EWinGameLobbyClient } from 'signalr/bk/EWinGameLobbyClient';
import Loading from 'component/loading';
import { generateUUIDv4 } from 'utils/guid';
// 收藏頁面還沒設計好, 先開版之後再客制

function Gamefavorite(props) {
    // const { favorites } = props;
    const isLoading = props.isLoading;
    //const [getLocalFavorites, setGetLocalFavorites] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [moreScale, setMoreScale] = useState('');
    // const tiList = props.tiList || [];
    const tiList = props.tiList;
    const userInfo = props.userInfo;
    const localStorageFavorites = localStorage.getItem('favorites') || '';
    const EWinUrl = localStorage.getItem('EWinUrl');
    const CT = localStorage.getItem('CT');
    const GUID = generateUUIDv4();
    const Favos = props.favorites || [];
    const { t } = useLanguage();
    const eWinGameLobbyClient = EWinGameLobbyClient.getInstance(CT, EWinUrl);

    const toggleMute = async (TableNumber) => {
        await props.toggleMute(TableNumber);
        // props.showMuteMessage();
    };


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

        eWinGameLobbyClient.SetUserAccountProperty(CT, GUID, "EWinGame.Favor", JSON.stringify(Favos), function (success, o) {
            if (success) {
                // console.log("SetUserAccountProperty", o);
            }
        });

        // console.log("Favos", Favos);

        props.showMessage();
    };

    const mouseleave = () => {
        setHoveredItem(null);
        setMoreScale('');
    }

    const getGameName = (TableNumber, TableTimeoutSecond) => () => {
        props.getGameTitle(TableNumber);
        localStorage.setItem('getLocalTableTitle', TableNumber);
        // console.log('TableTimeoutSecond', TableTimeoutSecond);
        // props.setSeconds(TableTimeoutSecond);
        // props.setFirstSeconds(TableTimeoutSecond);
    };

    return (
        <div>
            {
                isLoading ? (<Loading />) : (
                    <div className="section_box">
                        <h2>Favorites {props.favorites} </h2>
                        <ul>
                            {tiList && tiList.TableInfoList && tiList.TableInfoList.filter(i => localStorageFavorites.includes(i.TableNumber)).map((i, index) => (
                                // {tiList && tiList.TableInfoList && tiList.TableInfoList.map((i, index) => (
                                <li key={index}
                                    onMouseEnter={() => setHoveredItem(i.TableNumber)}
                                    onMouseLeave={mouseleave}
                                    className='li-box'
                                >
                                    <span className={`${props.favorites.includes(i.TableNumber) ? 'has-favorites' : ''}`} />
                                    <div className={`games ${i.TableNumber}`}>
                                        {/* 獲取ImageType為1的ImageUrl */}
                                        {i.ImageList && i.ImageList.find(image => image.ImageType === 1) && (
                                            <img src={i.ImageList.find(image => image.ImageType === 1).ImageUrl} alt="Table Image" />
                                        )}
                                        <RoadMap tiList={tiList} />
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
                                                <RoadMap tiList={tiList} />
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
                                                <span onClick={() => handleClick(i.TableNumber)} className={props.favorites.includes(i.TableNumber) ? 'remove-to-favorites' : 'add-to-favorites'} />

                                            </div>
                                        </div>
                                        <div className='more forpc' onClick={() => { setMoreScale('more-scale') }} />
                                    </div>
                                </li>

                            ))}

                        </ul>
                        {/*                <p>Number of Favorites: {localStorageFavorites.length}</p>*/}
                        {/* <ul>
                            {tiList && tiList.TableInfoList && tiList.TableInfoList.map((i, index) => {
                                if (localStorageFavorites.includes(i.TableNumber)) {
                                    < li key={index}
                                        onMouseEnter={() => setHoveredItem(i.TableNumber)}
                                        onMouseLeave={mouseleave}
                                        className='li-box'
                                    >
                                        <span className='has-favorites' />
                                        <div className={`games ${i.TableNumber}`}>

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
                            })
                            }
                        </ul> */}
                    </div >
                )
            }

        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        favorites: state.root.favorites || [],
        mutes: state.root.mutes || []
    };
};

export default connect(mapStateToProps)(Gamefavorite);