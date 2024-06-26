import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
// import {
//     setSeconds,
//     setFirstSeconds
// } from 'store/actions';

import GameHeader from 'games_component/game_header';
import GameFooterArea from 'games_component/game_footer_area';
import GameFooterBG from 'games_component/game_footer_bg';
import CountdownCircle from 'games_component/game_count_down_circle';
import GameBettingAction from 'games_component/game_betting_action';
import GameBettingArea from 'games_component/game_betting_area';
// import GameBettingAreaNew from 'games_component/game_betting_area/newStyle';
import Loading from 'component/loading';
import './index.scss';


const GameView = (props) => {

    const [seconds, setSeconds] = useState(777);
    const [firstSeconds, setFirstSeconds] = useState(777);


    // const [isLoading, setIsLoading] = useState(true);

    const userInfo = props.userInfo;

    // const isLoading = props.isLoading;
    const isLoading = false; // 開發時先這樣用


    const numDots = 8;
    const loadingDots = Array.from({ length: numDots }, (_, index) => (
        <div key={index}></div>
    ));
    // 閒 Player,和 Tie, 庄 Bank
    const [bettingAction, setBettingAction] = useState('');


    // 這一塊只是demo作假用,之後可移除,底下判斷 連結websocket後 setIsLoading(false), 才是之後實際用到的
    // useEffect(() => {
    //     // 模擬組件載入完成後的動作
    //     const loadingTimeout = setTimeout(() => {
    //         setIsLoading(false);
    //     }, 2000);

    //     // 清除 timeout
    //     return () => clearTimeout(loadingTimeout);
    // }, []);



    const localTableTitle = localStorage.getItem('getLocalTableTitle');


    useEffect(() => {
        // 實際會有後端資料回傳,抓到回傳秒數後, 再把value 餵給 seconds, 和 firstSeconds 目前先用demo秒數
        if (seconds === 0) {
            setBettingAction('stop-betting');
        } else {
            setBettingAction('betting');
        }

    }, [seconds]);

    useEffect(() => {
        if (seconds > 0) {
            const intervalId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [seconds]);

    // 實際應該是發牌手有按按鍵時才會開始倒數, 以下兩個 useE`ffect只是demo用
    useEffect(() => {
        const timerLoading = setTimeout(() => {
            setSeconds(777);
            setFirstSeconds(777);
        }, 10000);

        return () => clearTimeout(timerLoading);
    }, [seconds]);

    return (
        <div className="game-view-wrap">
            {isLoading ? (
                <Loading />
            ) : (
                <div className='game-view-box'>
                    {/* url={props.url} 這邊可以拿到實際遊戲id 再根據id做相關判斷 可以這樣寫 url={props.url.split('/').pop()} 例如收藏就需要當下id */}
                    <GameHeader url={props.url} />
                    <div className="game-content">
                        <CountdownCircle seconds={seconds} firstSeconds={firstSeconds} />
                    </div>
                    <GameBettingAction action={bettingAction} />
                    <GameFooterArea />
                    <GameBettingArea seconds={seconds} />
                    <GameFooterBG />
                </div>
            )}
        </div>
    );
};


// const mapStateToProps = (state) => {
//     // console.log('檢查state', state);
//     // console.log('檢查state.favorites', state.root.favorites);
//     return {
//         seconds: state.root.seconds,
//         firstSeconds: state.root.firstSeconds
//     };
// };


// const mapDispatchToProps = {
//     setSeconds,
//     setFirstSeconds
// };


// const mapDispatchToProps = (dispatch) => ({
//     setSeconds,
//     setFirstSeconds
// });

// export default connect(mapStateToProps, mapDispatchToProps)(GameView);
export default GameView;