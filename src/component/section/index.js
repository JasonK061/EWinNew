import React, { useState } from 'react';
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
import './index.scss';

const Section = (props) => {
    const { t } = useLanguage();
    const listItems = props.listItems || [];
    const [hoveredItem, setHoveredItem] = useState(null);
    const [moreScale, setMoreScale] = useState('');
    const tiList = props.tiList || [];
    const userInfo = props.userInfo || [];

    const [isMuted, setIsMuted] = useState(false);

    const history = useHistory();

    const handleClick = async (TableNumber) => {
        await props.toggleFavorite(TableNumber);
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
        // props.setSeconds(TableTimeoutSecond);
        // props.setFirstSeconds(TableTimeoutSecond);
    };

    return (
        <div className="section_box">
            <ul>
                {tiList && tiList.TableInfoList && tiList.TableInfoList.map((i, index) => (
                    <li key={index}
                        onMouseEnter={() => setHoveredItem(i.TableNumber)}
                        onMouseLeave={mouseleave}
                        className='li-box'
                    >
                        <span className={`${props.favorites.includes(i.TableNumber) ? 'has-favorites' : ''}`} />
                        <div className={`games ${i.TableNumber}`}>
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
                                    <a href='/'> {i.TableTimeoutSecond} </a>
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
                                    <span onClick={() => handleClick(i.TableNumber)} className={props.favorites.includes(i.TableNumber) ? 'remove-to-favorites' : 'add-to-favorites'} />

                                </div>
                            </div>
                            <div className='more forpc' onClick={() => { setMoreScale('more-scale') }} />
                        </div>
                    </li>
                ))}
                {/* hardcode使用 */}
                {/* {listItems.map((item, k) => (
                    <li key={k}
                        onMouseEnter={() => setHoveredItem(item.gameid)}
                        onMouseLeave={mouseleave}
                        className='li-box'>
                        {item.ishot === '0' &&
                            <span className='ishot'></span>
                        }
                        <span className={`${props.favorites.includes(item.gameid) ? 'has-favorites' : ''}`} />
                        <div className={`games ${item.gameid}`}>
                            <img src={require(`../../img/gamelobby/${item.gameid}.png`)} alt={item.gameid} />
                            <RoadMap />
                        </div>
                        <p className='game-title'>
                            {item.gametitle}
                        </p>
                        <p className='game-wallet'>
                            <span>{item.walletstate}</span>
                            <span>{item.wallet}</span>
                        </p>

                        <div className={`hover-box ${hoveredItem === item.gameid ? 'visible' : ''} ${moreScale}`}>
                            <span className='close-hover-box' onClick={() => { setHoveredItem(null) }}></span>
                            <div className={`games ${item.gameid}`}>
                                <img src={require(`../../img/gamelobby/${item.gameid}.png`)} alt={item.gameid} />
                            </div>
                            <div className='info-box'>
                                <p className='game-title'>
                                    {item.gametitle}
                                </p>
                                <p className='game-wallet'>
                                    <span>{item.walletstate}</span>
                                    <span>{item.wallet}</span>
                                </p>
                                <div className='game-start' >
                                    <Link to={`/games/${item.gameid}`} onClick={getGameName(item.gametitle)}>{t("Global.start_games")}</Link>
                                </div>
                                <div className='game-table-wrap'>
                                    <RoadMap />
                                </div>
                                <p className='game-dis'>
                                    {item.dis}
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
                                    <span onClick={() => toggleMute(item.gameid)} className={`video-control ${props.mutes.includes(item.gameid) ? 'video-unmute' : 'video-mute'}`} />
                                    <span onClick={() => handleClick(item.gameid)} className={props.favorites.includes(item.gameid) ? 'remove-to-favorites' : 'add-to-favorites'} />

                                </div>
                            </div>
                            <div className='more forpc' onClick={() => { setMoreScale('more-scale') }} />
                        </div>
                    </li>
                ))} */}
            </ul>
        </div>
    );
};



const mapStateToProps = (state) => {
    // console.log('檢查state', state);
    // console.log('檢查state.favorites', state.root.favorites);
    return {
        favorites: state.root.favorites || [],
        mutes: state.root.mutes || [],
        seconds: state.root.seconds,
        firstSeconds: state.root.firstSeconds
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

export default connect(mapStateToProps, mapDispatchToProps)(Section);