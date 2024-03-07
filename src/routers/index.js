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
import GameFooter from 'games_component/game_footer';
import { EWinWebClient } from 'signalr/EWinWebClient';
import Tips from 'component/tips';
import VideoBox from 'component/video';
import cookie from 'react-cookies'

import './index.scss';

const Main = (props) => {

  const location = useLocation();
  const isGameView = location.pathname.includes('/games/');
  const [getUrl, setGetUrl] = useState('');
  localStorage.setItem('currentUrl', '')

  const history = useHistory();


  const EWinUrl = 'https://ewin.dev.mts.idv.tw';
  localStorage.setItem('EWinUrl', EWinUrl)


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

  const Echo = 'Test_Echo';




  useEffect(() => {
    const currentPath = history.location.pathname;
    localStorage.setItem('currentUrl', currentPath);
    setGetUrl(localStorage.getItem('currentUrl'))

  }, [history.location.pathname])

  // SignalR相關
  const [isLoading, setIsLoading] = useState(true);
  const [eWinWebClient, setEWinWebClient] = useState(null);


  const [tiList, setTiList] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [timeoutSeconds, setTimeoutSeconds] = useState([]);
  const [tabletitle, setTabletitle] = useState([]);

  useEffect(() => {
    // 開發時設定每5分鐘打一次api來獲取有效的 CT
    const fetchDataBySeconds = async () => {
      try {
        const response = await fetch(
          'https://ewin.dev.mts.idv.tw/API/LoginAPI.asmx/UserLoginByCustomValidate?Token=1_0UE5XQQ_ca95cc8bfb4e442118d60c5b92a7af2e&LoginAccount=ddt1&LoginPassword=1234&CompanyCode=demo&UserIP='
        );
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const newCT = xmlDoc.getElementsByTagName('CT')[0].textContent;

        localStorage.setItem('CT', newCT)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    const intervalId = setInterval(fetchDataBySeconds, 120000);
    fetchDataBySeconds();
    return () => clearInterval(intervalId);
  }, [])

  useEffect(() => {

    const CT = localStorage.getItem('CT');

    if (CT !== '') {
      // 創建 EWinWebClient 實例
      const eWinClient = new EWinWebClient({ EWinUrl, CT, GUID, Echo });


      // 設置相應的處理函數
      eWinClient.handleConnected(() => {
        console.log('connected');

        // 監聽連線狀態
        eWinClient.HeartBeat(Echo);

        eWinClient.handleReceiveMsg((Msg) => {
          console.log('處理接收訊息', Msg);
        });


        // 獲取我的最愛
        eWinClient.GetUserAccountProperty(CT, GUID, 'EWinGame.Favor')

        if (tiList.length === 0 || userInfo === 0) {

          // 獲取使用者資料
          eWinClient.GetUserInfo(CT, GUID, (userInfo) => {
            if (userInfo) {
              // console.log('User information:', userInfo);
              setUserInfo(userInfo);
            } else {
              console.log('Failed to get user information.');
            }
          });

          // 獲取LOBBY 頁面的 table list相關資料
          eWinClient.GetTableInfoList(CT, GUID, '', 0, (tabinfo) => {
            if (tabinfo && tabinfo.TableInfoList) {
              setTiList(tabinfo);
              setIsLoading(false)
              console.log('Table information:', tabinfo);
            } else {
              console.error('tabInfoList is not an array:', tabinfo);
            }
          });


        } else {
          setIsLoading(false);
        }


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
    }
  }, [])



  return (
    <div className="wrap-box">
      {/* {!isGameView && (
        <>
          <Header userInfo={userInfo} />
          <VideoBox url={getUrl} />
          <Footer userInfo={userInfo} />
        </>
      )} */}
      {!isGameView
        ? (
          <>
            <Header userInfo={userInfo} />
            <VideoBox url={getUrl} />
            <Footer userInfo={userInfo} />
          </>
        )
        : (
          <GameFooter userInfo={userInfo} />
        )
      }
      <Switch>
        <Route path='/Gamefavorite'>
          <Gamefavorite />
        </Route>
        <Route path='/games/:gameId'>
          <GameView
            url={getUrl}
            isLoading={isLoading}
          />
        </Route>
        <Route path='/'>
          <Gamelobby
            tiList={tiList}
            userInfo={userInfo}
            isLoading={isLoading}
          />
          {/* <h2>API測試</h2> */}
          {/* {userInfo && (
            <div style={{ color: '#fff' }}>
              <p>Real Name: {userInfo.RealName}</p>
              {userInfo && userInfo.Company && (
                <p>Default Area Code: {userInfo.Company.DefaultAreaCode}</p>
              )}
              {userInfo && userInfo.Wallet && userInfo.Wallet.map((walletItem, index) => (
                <div key={index}>
                  <p>Balance: {walletItem.Balance}</p>
                  <p>CurrencyName:　{walletItem.CurrencyName}</p>
                  <p>Symbol: {walletItem.Symbol}</p>
                </div>
              ))}
            </div>
          )} */}
          {/* <div>
            <p>{tiList.ResultCode}</p>
            <ul>
              {tiList && tiList.TableInfoList && tiList.TableInfoList.map((i, index) => (
                <li key={index}>
                  <p>Table Number: {i.TableNumber}</p>
                </li>
              ))}
            </ul>
          </div> */}

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

