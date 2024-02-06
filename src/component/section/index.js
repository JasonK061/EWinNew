import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLanguage } from 'hooks';
import { Link, Switch, Route, useRouteMatch, useParams, withRouter, useHistory } from "react-router-dom";
import { toggleFavorite, showMessage, toggleMute, getGameTitle } from 'store/actions';
import RoadMap from 'component/road_map';
import SimilarGames from 'component/similar_games';
import './index.scss';

const Section = (props) => {
    const { t } = useLanguage();
    const listItems = props.listItems || [];
    const [hoveredItem, setHoveredItem] = useState(null);
    const [moreScale, setMoreScale] = useState('');

    const [isMuted, setIsMuted] = useState(false);

    const history = useHistory();

    const handleClick = async (gameId) => {
        await props.toggleFavorite(gameId);
        props.showMessage();
    };

    const mouseleave = () => {
        setHoveredItem(null);
        setMoreScale('');
    }


    const toggleMute = async (gameId) => {
        await props.toggleMute(gameId);
        // props.showMuteMessage();
    };


    const getGameName = (gameTitle, gameId) => () => {
        props.getGameTitle(gameTitle)
    };

    return (
        <div className="section_box">
            <ul>
                {listItems.map((item, k) => (
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

                        {/* hover 後開啟的元件 */}
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
                ))}
            </ul>
        </div>
    );
};


// const mapStateToProps = (state) => ({
//     favorites: state.favorites || [],
// });


const mapStateToProps = (state) => {
    // console.log('檢查state', state);
    // console.log('檢查state.favorites', state.root.favorites);
    return {
        favorites: state.root.favorites || [],
        mutes: state.root.mutes || []
    };
};


const mapDispatchToProps = {
    toggleFavorite,
    showMessage,
    toggleMute,
    getGameTitle
    // showMuteMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Section));


// export default Section