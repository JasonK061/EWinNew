import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory
} from "react-router-dom";
import Header from 'component/header';
import Gamelobby from 'view/game_lobby';
import Gamefavorite from 'view/game_favorite';
import GameView from 'view/game_views';
import Footer from 'component/footer';
import { EWinWebClient } from 'signalr/EWinWebClient';
import Tips from 'component/tips';
import VideoBox from 'component/video';

import './index.scss';

const Main = () => {
  const location = useLocation();
  const isGameView = location.pathname.includes('/games/');
  const [getUrl, setGetUrl] = useState('');
  localStorage.setItem('currentUrl', '')


  const history = useHistory();
  useEffect(() => {
    const currentPath = history.location.pathname;
    localStorage.setItem('currentUrl', currentPath);
    setGetUrl(localStorage.getItem('currentUrl'))

  }, [history.location.pathname])

  // SignalR相關
  const [isLoading, setIsLoading] = useState(true);
  const [eWinWebClient, setEWinWebClient] = useState(null);

  useEffect(() => {


    const EWinUrl = 'https://ewin.dev.mts.idv.tw';
    // CT 之後 api取得, 目前先用 測試站 token
    const CT = '--vm7Q3nR8dVKpp7dJ9JjzT3is+w2NW3REkB2MCU0ovEPxWUe1Nl9ENrJ9BcA0MnnCyzo3gUp/OFBbrT9NgtoIRohFch435uSQD2ZhUYy19HeShlMpMddimCXtqKu3EVuiL41DnlpujUA/ubxRcCxwVg=='


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

    const GUID = generate_uuidv4();
    localStorage.setItem('GUID', GUID);

    // 模擬組件載入完成後的動作
    // 創建 EWinWebClient 實例
    // const eWinClient = new EWinWebClient({ EWinUrl, CT, GUID });

    // 設置相應的處理函數


    // 這一塊只是demo作假用,之後可移除,底下判斷 連結websocket後 setIsLoading(false), 才是之後實際用到的

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      // 創建 EWinWebClient 實例
      const eWinClient = new EWinWebClient({ EWinUrl, CT, GUID });

      // 設置相應的處理函數
      eWinClient.handleConnected(() => {
        console.log('已連結 EWinHub');

        eWinClient.handleReceiveMsg((Msg) => {
          console.log('處理接收訊息', Msg);
        });

      });

      eWinClient.handleDisconnect(() => {
        console.log('EWinHub 連結失效');
      });


      eWinClient.handleReconnecting(() => {
        console.log('重新連結 EWinHub');
      });

      eWinClient.handleReconnected(() => {
        console.log('已重新連結 EWinHub');
      });




      // 初始化連接
      eWinClient.initializeConnection();

      // 將實例存儲在狀態中
      setEWinWebClient(eWinClient);
    }, 2000);

    // 清除 timeout
    return () => clearTimeout(loadingTimeout);

  }, []);

  return (
    <div className="wrap-box">
      {!isGameView && (
        <>
          <Header />
          <VideoBox url={getUrl} />
          <Footer />
        </>
      )}
      <Switch>
        <Route path='/Gamefavorite'>
          <Gamefavorite />
        </Route>
        <Route path='/games/:gameId'>
          <GameView url={getUrl} />
        </Route>
        <Route path='/'>
          <Gamelobby />
        </Route>
      </Switch>
    </div>
  );
};

// 加入判斷剔除不顯示的組件
export default function Routers() {
  return (
    <Router>
      <Tips />
      <Main />
    </Router>
  );
}

