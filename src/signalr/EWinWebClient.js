
import React, { Component } from 'react';
import { hubConnection } from 'signalr-no-jquery';


export class EWinWebClient extends Component {
    constructor(props) {
        super(props);
        this.EWinHub = null;
        this.currentState = 4;  //0=connecting, 1=connected, 2=reconnecting, 4=disconnected
        this.onReceive = null;
        this.onReconnected = null;
        this.onReconnecting = null;
        this.onConnected = null;
        this.onDisconnect = null;
        this.CONNECTING = 0;
        this.CONNECTED = 1;
        this.RECONNECTING = 2;
        this.DISCONNECTED = 4;

        // this.EWinUrl = null;
        this.EWinUrl = props.EWinUrl;
        this.CT = props.CT;
        this.GUID = props.GUID;
        // this.GUID = localStorage.getItem('GUID');
        // this.CT = null
        this.conn = hubConnection();
    }

    componentDidMount() {
        this.initializeConnection();
    }


    handleReceiveMsg(handle) {
        this.onReceive = handle;
    }

    handleReconnected(handle) {
        this.onReconnected = handle;
    }

    handleReconnecting(handle) {
        this.onReconnecting = handle;
    }

    handleConnected(handle) {
        this.onConnected = handle;
    }

    handleDisconnect(handle) {
        this.onDisconnect = handle;
        // this.conn.stop();
        // console.log('已斷開')
    }

    HeartBeat(CT, GUID, Echo, cb) {
        this.EWinHub.invoke("HeartBeat", CT, GUID, Echo).done(function (o) {
            if (cb)
                cb(true, o);
            console.log('cb', cb, 'o', o, 'Echo', Echo);
        }).fail(function (err) {
            if (cb)
                cb(false, err);
        });
    }

    GetSIDParam(CT, GUID, ParamName, cb) {
        this.EWinHub.invoke("GetSIDParam", CT, GUID, ParamName).done(function (o) {
            if (cb)
                cb(true, o);
        }).fail(function (err) {
            if (cb)
                cb(false, err);
        });
    };

    SetSIDParam(CT, GUID, ParamName, ParamValue, cb) {
        this.EWinHub.invoke("SetSIDParam", CT, GUID, ParamName, ParamValue).done(function (o) {
            if (cb)
                cb(true, o);
        }).fail(function (err) {
            if (cb)
                cb(false, err);
        });
    };


    SetPeekingCard(CT, GUID, GameSetID, CurrencyType, RoadMapNumber, ShoeNumber, RoundNumber, CardId, Action, x, y, cb) {
        this.EWinHub.invoke("SetPeekingCard", CT, GUID, GameSetID, CurrencyType, RoadMapNumber, ShoeNumber, RoundNumber, CardId, Action, x, y).done(function (o) {
            if (cb)
                cb(true, o);
        }).fail(function (err) {
            if (cb)
                cb(false, err);
        });
    };


    SetGameSetID = function (CT, GUID, GameSetID, cb) {
        this.EWinHub.invoke("SetGameSetID", CT, GUID, GameSetID).done(function (o) {
            if (cb)
                cb(true, o);
        }).fail(function (err) {
            if (cb)
                cb(false, err);
        });
    };

    AddSubscribe(CT, GUID, RoadMapNumberList, ResetSubscribe, cb) {
        this.EWinHub.invoke("AddSubscribe", CT, GUID, RoadMapNumberList, ResetSubscribe).done(function (o) {
            if (cb)
                cb(true, o);
        }).fail(function (err) {
            if (cb)
                cb(false, err);
        });
    };

    ClearSubscribe(CT, GUID, cb) {
        this.EWinHub.invoke("ClearSubscribe", CT, GUID).done(function (o) {
            if (cb)
                cb(true, o);
        }).fail(function (err) {
            if (cb)
                cb(false, err);
        });
    };

    RefreshSubscribe(CT, GUID, GameSetID, RoadMapNumber, StreamType, cb) {
        this.EWinHub.invoke("RefreshSubscribe", CT, GUID, GameSetID, RoadMapNumber, StreamType).done(function (o) {
            if (cb)
                cb(true, o);
        }).fail(function (err) {
            if (cb)
                cb(false, err);
        });
    };


    state() {
        return this.currentState;
    }

    initializeConnection() {
        function connectServer(c) {
            c.start({ withCredentials: false })
                .done(() => {
                    // console.log("Connection started successfully!!!");
                    console.log('GUID', this.GUID);
                    console.log('CT', this.CT);
                    console.log('EWinUrl', this.EWinUrl);
                    if (this.onConnected != null)
                        this.onConnected();
                })
                .fail((error) => {
                    console.error("Connection start failed: " + error);
                    if (this.onDisconnect != null) {
                        this.onDisconnect();
                    }
                });
        }

        // var conn = hubConnection();

        if (this.EWinUrl != null)
            this.conn.url = this.EWinUrl + "/signalr";
        else
            this.conn.url = "/signalr";

        // this.EWinHub = this.conn.createHubProxy("EWinBaccaratClientHub");
        this.EWinHub = this.conn.createHubProxy("TesterHub");
        this.EWinHub.on("serverMsg", this.serverMsg.bind(this));

        // conn.disconnected(() => {
        //     setTimeout(() => {
        //         connectServer(conn);
        //     }, 1000);
        // });
        //以上方法會出錯, 改成下面方式
        this.conn.disconnected(() => {
            setTimeout(() => {
                connectServer.call(this, this.conn);
            }, 1000);
        });

        this.conn.stateChanged((state) => {
            this.currentState = state.newState;
        });

        this.conn.reconnected(() => {
            if (this.onReconnected != null)
                this.onReconnected();
        });

        this.conn.reconnecting(() => {
            if (this.onReconnecting != null)
                this.onReconnecting();
        });

        connectServer(this.conn);
    }

    getJSON(text) {
        var obj = JSON.parse(text);

        if (obj) {
            if (obj.hasOwnProperty('d')) {
                return obj.d;
            } else {
                return obj;
            }
        }
    }

    serverMsg(msg) {
        var o = this.getJSON(msg);

        if (o != null) {
            if (this.onReceive != null)
                this.onReceive(o);
        }

        console.log('Received message from server:', o);

    }
}
