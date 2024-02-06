// 參考寫法

// const connection = hubConnection('http://[address]:[port]', options);
// const hubProxy = connection.createHubProxy('hubNameString');

// // set up event listeners i.e. for incoming "message" event
// hubProxy.on('message', function(message) {
//     console.log(message);
// });

// // connect
// connection.start({ jsonp: true })
// .done(function(){ console.log('Now connected, connection ID=' + connection.id); })
// .fail(function(){ console.log('Could not connect'); });

import { useState, useEffect } from 'react';
import { hubConnection } from 'signalr-no-jquery';


const EWinWebClientIndex = (props) => {
    const [currentState, setCurrentState] = useState(4);
    const [EWinHub, setEWinHub] = useState(null);
    const [onReceive, setOnReceive] = useState(null);
    const [onReconnected, setOnReconnected] = useState(null);
    const [onReconnecting, setOnReconnecting] = useState(null);
    const [onConnected, setOnConnected] = useState(null);
    const [onDisconnect, setOnDisconnect] = useState(null);

    const CONNECTING = 0;
    const CONNECTED = 1;
    const RECONNECTING = 2;
    const DISCONNECTED = 4;

    const EWinUrl = props.EWinUrl;
    const CT = props.CT;
    const GUID = props.GUID;
    const conn = hubConnection();

    useEffect(() => {
        initializeConnection();
    }, []);

    const handleReceiveMsg = (handle) => {
        setOnReceive(handle);
    };

    const handleReconnected = (handle) => {
        setOnReconnected(handle);
    };

    const handleReconnecting = (handle) => {
        setOnReconnecting(handle);
    };

    const handleConnected = (handle) => {
        setOnConnected(handle);
    };

    const handleDisconnect = (handle) => {
        setOnDisconnect(handle);
    };

    const HeartBeat = (GUID, Echo, cb) => {
        EWinHub.invoke("HeartBeat", CT, GUID, Echo).done((o) => {
            if (cb) cb(true, o);
            console.log('cb', cb, 'o', o, 'GUID', GUID, "CT", CT, 'Echo', Echo);
        }).fail((err) => {
            if (cb) cb(false, err);
        });
    };

    const GetSIDParam = (GUID, ParamName, cb) => {
        this.EWinHub.invoke("GetSIDParam", CT, GUID, ParamName).done(function (o) {
            if (cb)
                cb(true, o);
        }).fail(function (err) {
            if (cb)
                cb(false, err);
        });
    };

    const SetSIDParam = (GUID, ParamName, ParamValue, cb) => {
        this.EWinHub.invoke("SetSIDParam", CT, GUID, ParamName, ParamValue).done(function (o) {
            if (cb)
                cb(true, o);
        }).fail(function (err) {
            if (cb)
                cb(false, err);
        });
    };


    const SetPeekingCard = (GUID, GameSetID, CurrencyType, RoadMapNumber, ShoeNumber, RoundNumber, CardId, Action, x, y, cb) => {
        this.EWinHub.invoke("SetPeekingCard", CT, GUID, GameSetID, CurrencyType, RoadMapNumber, ShoeNumber, RoundNumber, CardId, Action, x, y).done(function (o) {
            if (cb)
                cb(true, o);
        }).fail(function (err) {
            if (cb)
                cb(false, err);
        });
    };


    const SetGameSetID = (GUID, GameSetID, cb) => {
        this.EWinHub.invoke("SetGameSetID", CT, GUID, GameSetID).done(function (o) {
            if (cb)
                cb(true, o);
        }).fail(function (err) {
            if (cb)
                cb(false, err);
        });
    };

    const AddSubscribe = (GUID, RoadMapNumberList, ResetSubscribe, cb) => {
        this.EWinHub.invoke("AddSubscribe", CT, GUID, RoadMapNumberList, ResetSubscribe).done(function (o) {
            if (cb)
                cb(true, o);
        }).fail(function (err) {
            if (cb)
                cb(false, err);
        });
    };

    const ClearSubscribe = (GUID, cb) => {
        this.EWinHub.invoke("ClearSubscribe", CT, GUID).done(function (o) {
            if (cb)
                cb(true, o);
        }).fail(function (err) {
            if (cb)
                cb(false, err);
        });
    };

    const RefreshSubscribe = (GUID, GameSetID, RoadMapNumber, StreamType, cb) => {
        this.EWinHub.invoke("RefreshSubscribe", CT, GUID, GameSetID, RoadMapNumber, StreamType).done(function (o) {
            if (cb)
                cb(true, o);
        }).fail(function (err) {
            if (cb)
                cb(false, err);
        });
    };

    const state = () => {
        return currentState;
    };

    const initializeConnection = () => {
        function connectServer(c) {
            c.start({ withCredentials: false })
                .done(() => {
                    console.log('GUID', GUID);
                    console.log('CT', CT);
                    console.log('EWinUrl', EWinUrl);
                    if (onConnected) onConnected();
                })
                .fail((error) => {
                    console.error('Connection start failed: ' + error);
                    if (onDisconnect) onDisconnect();
                });
        }

        if (EWinUrl != null)
            conn.url = EWinUrl.current + '/signalr';
        else
            conn.url = '/signalr';

        setEWinHub(conn.createHubProxy('EWinBaccaratClientHub'));

        conn.on('serverMsg', serverMsg);

        conn.disconnected(() => {
            setTimeout(() => {
                connectServer.call(this, conn);
            }, 1000);
        });

        conn.stateChanged((state) => {
            setCurrentState(state.newState);
        });

        conn.reconnected(() => {
            if (onReconnected) onReconnected();
        });

        conn.reconnecting(() => {
            if (onReconnecting) onReconnecting();
        });

        connectServer(conn);
    };

    const getJSON = (text) => {
        var obj = JSON.parse(text);

        if (obj) {
            if (obj.hasOwnProperty('d')) {
                return obj.d;
            } else {
                return obj;
            }
        }
    };

    const serverMsg = (msg) => {
        var o = getJSON(msg);

        if (o != null) {
            if (onReceive) onReceive(o);
        }

        console.log('Received message from server:', o);
    };

    return null;
};

export default EWinWebClientIndex;
