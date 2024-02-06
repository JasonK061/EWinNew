const guid = localStorage.getItem('GUID');
var GameAPI = function (APIUrl, CT) {
    this.HeartBeat = function (echoString, cb) {
        var url = APIUrl + "/HeartBeat";
        var postData;

        postData = {
            EchoString: echoString
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.UpdateTableStream = function (GUID, RoadMapNumber, StreamType, cb) {
        var url = APIUrl + "/UpdateTableStream";
        var postData;

        postData = {
            CT: CT,
            GUID: GUID,
            RoadMapNumber: RoadMapNumber,
            StreamType: StreamType
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.AddUserBankCard = function (GUID, CurrencyType, PaymentMethod, BankName, BranchName, BankNumber, AccountName, Description, cb) {
        var url = APIUrl + "/AddUserBankCard";
        var postData;

        postData = {
            CT: CT,
            GUID: GUID,
            CurrencyType: CurrencyType,
            PaymentMethod: PaymentMethod,
            BankName: BankName,
            BranchName: BranchName,
            BankNumber: BankNumber,
            AccountName: AccountName,
            Description: Description
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.SetUserBankCardState = function (GUID, BankCardGUID, BankCardState, cb) {
        var url = APIUrl + "/SetUserBankCardState";
        var postData;

        postData = {
            CT: CT,
            GUID: GUID,
            BankCardGUID: BankCardGUID,
            BankCardState: BankCardState
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.RemoveUserBankCard = function (GUID, BankCardGUID, cb) {
        var url = APIUrl + "/RemoveUserBankCard";
        var postData;

        postData = {
            CT: CT,
            GUID: GUID,
            BankCardGUID: BankCardGUID
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.UpdateUserBankCard = function (GUID, BankCardGUID, CurrencyType, PaymentMethod, BankName, BranchName, BankNumber, AccountName, Description, cb) {
        var url = APIUrl + "/UpdateUserBankCard";
        var postData;

        postData = {
            CT: CT,
            GUID: GUID,
            BankCardGUID: BankCardGUID,
            CurrencyType: CurrencyType,
            PaymentMethod: PaymentMethod,
            BankName: BankName,
            BranchName: BranchName,
            BankNumber: BankNumber,
            AccountName: AccountName,
            Description: Description
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.GetUserBankCard = function (GUID, cb) {
        var url = APIUrl + "/GetUserBankCard";
        var postData;

        postData = {
            CT: CT,
            GUID: GUID
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.UpdateProperty = function (guid, ps, cb) {
        var url = APIUrl + "/UpdateProperty";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            PS: ps
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.UpdateDeviceInfo = function (guid, deviceGUID, pushType, deviceName, deviceKey, deviceType, notifyToken, GPSPosition, userAgent, cb) {
        var url = APIUrl + "/UpdateDeviceInfo";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            DeviceGUID: deviceGUID,
            PushType: pushType,
            DeviceName: deviceName,
            DeviceKey: deviceKey,
            DeviceType: deviceType,
            NotifyToken: notifyToken,
            GPSPosition: GPSPosition,
            UserAgent: userAgent
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.ValidatePassword = function (guid, passwordType, password, cb) {
        var url = APIUrl + "/ValidatePassword";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            PasswordType: passwordType,
            Password: password
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.GetETHCoinTxLog = function (guid, beginDate, endDate, cb) {
        var url = APIUrl + "/GetETHCoinTxLog";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            BeginDate: beginDate,
            EndDate: endDate
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.ETHBitCoinTx = function (guid, walletPassword, toAddress, currencyType, amount, cb) {
        var url = APIUrl + "/ETHBitCoinTx";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            WalletPassword: walletPassword,
            ToAddress: toAddress,
            CurrencyType: currencyType,
            Amount: amount
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.ETHCheckBitCoinTxState = function (cb) {
        var url = APIUrl + "/ETHCheckBitCoinTxState";
        var postData;

        postData = {
            CT: CT,
            GUID: guid
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.GetRoadMapShoeResult = function (guid, roadMapNumber, shoeNumber, cb) {
        var url = APIUrl + "/GetRoadMapShoeResult";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            RoadMapNumber: roadMapNumber,
            ShoeNumber: shoeNumber
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.RequireWithdrawal = function (guid, currencyType, amount, description, cb) {
        var url = APIUrl + "/RequireWithdrawal";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            CurrencyType: currencyType,
            Amount: amount,
            Description: description
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.UserAccountGetBetLimitListByRoadMap = function (guid, roadMapNumber, currencyType, gameSetID, cb) {
        var url = APIUrl + "/UserAccountGetBetLimitListByRoadMap";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            RoadMapNumber: roadMapNumber,
            CurrencyType: currencyType,
            GameSetID: gameSetID
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.UserAccountGetBetLimitList = function (guid, currencyType, cb) {
        var url = APIUrl + "/UserAccountGetBetLimitList";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            CurrencyType: currencyType
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.UserAccountSetBetLimit = function (guid, roadMapNumber, currencyType, gameSetID, betLimitID, cb) {
        var url = APIUrl + "/UserAccountSetBetLimit";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            RoadMapNumber: roadMapNumber,
            CurrencyType: currencyType,
            GameSetID: gameSetID,
            BetLimitID: betLimitID
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.UserAccountClearBetLimit = function (guid, cb) {
        var url = APIUrl + "/UserAccountClearBetLimit";
        var postData;

        postData = {
            CT: CT,
            GUID: guid
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.QualityResponse = function (guid, pingName, Server, deviceType, pingValue, GPSLat, GPSLong, cb) {
        var url = APIUrl + "/QualityResponse";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            PingName: pingName,
            ServerName: Server,
            DeviceType: deviceType,
            PingValue: pingValue,
            GPSLat: GPSLat,
            GPSLong: GPSLong
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.RequireEntry = function (guid, contactPhoneNumber, gameSetInitChip, description, cb) {
        var url = APIUrl + "/RequireEntry";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            ContactPhoneNumber: contactPhoneNumber,
            GameSetInitChip: gameSetInitChip,
            Description: description
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.RemoveBinding = function (guid, bindingType, bindingUID, cb) {
        var url = APIUrl + "/RemoveBinding";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            BindingType: bindingType,
            BindingUID: bindingUID
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.GetUserInfo = function (guid, cb) {
        var url = APIUrl + "/GetUserInfo";
        var postData;

        postData = {
            CT: CT,
            GUID: guid
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.GetGameSetInfo = function (guid, gameSetID, cb) {
        var url = APIUrl + "/GetGameSetInfo";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            GameSetID: gameSetID
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.SetWalletPassword = function (guid, loginPassword, newWalletPassword, cb) {
        var url = APIUrl + "/SetWalletPassword";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            LoginPassword: loginPassword,
            NewWalletPassword: newWalletPassword
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.SetUserPassword = function (guid, oldPassword, newPassword, cb) {
        var url = APIUrl + "/SetUserPassword";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            OldPassword: oldPassword,
            NewPassword: newPassword
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.ListAvailableRoadMap = function (guid, gameSetID, purpose, cb) {
        var url = APIUrl + "/ListAvailableRoadMap";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            GameSetID: gameSetID,
            Purpose: purpose
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.GetRoadMapResult = function (guid, roadMapNumber, gameSetID, cb) {
        var url = APIUrl + "/GetRoadMapResult";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            RoadMapNumber: roadMapNumber,
            GameSetID: gameSetID
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.GetPaymentHistory = function (guid, beginDate, endDate, cb) {
        var url = APIUrl + "/GetPaymentHistory";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            BeginDate: beginDate,
            EndDate: endDate
        };

        callService(url, postData, 30000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.GetOrderSummary = function (guid, beginDate, endDate, cb) {
        var url = APIUrl + "/GetOrderSummary";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            BeginDate: beginDate,
            EndDate: endDate
        };

        callService(url, postData, 30000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.GetOrderDetail = function (guid, gameAccountingCode, queryDate, cb) {
        var url = APIUrl + "/GetOrderDetail";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            GameAccountingCode: gameAccountingCode,
            QueryDate: queryDate
        };

        callService(url, postData, 30000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.GetOrderDetailByGameSetID = function (guid, gameSetID, cb) {
        var url = APIUrl + "/GetOrderDetailByGameSetID";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            GameSetID: gameSetID
        };

        callService(url, postData, 30000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.LeaveRoadMap = function (guid, gameSetID, roadMapNumber, cb) {
        var url = APIUrl + "/LeaveRoadMap";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            GameSetID: gameSetID,
            RoadMapNumber: roadMapNumber
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.EntryRoadMap = function (guid, gameSetID, currencyType, roadMapNumber, cb) {
        var url = APIUrl + "/EntryRoadMap";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            GameSetID: gameSetID,
            CurrencyType: currencyType,
            RoadMapNumber: roadMapNumber
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.ClearGameSetCmd = function (guid, gameSetID, roadMapNumber, shoeNumber, roundNumber, cb) {
        var url = APIUrl + "/ClearGameSetCmd";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            GameSetID: gameSetID,
            RoadMapNumber: roadMapNumber,
            ShoeNumber: shoeNumber,
            RoundNumber: roundNumber
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.AddChip = function (guid, gameSetID, roadMapNumber, shoeNumber, roundNumber, addChipValue, cb) {
        var url = APIUrl + "/AddChip";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            GameSetID: gameSetID,
            RoadMapNumber: roadMapNumber,
            ShoeNumber: shoeNumber,
            RoundNumber: roundNumber,
            AddChipValue: addChipValue
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.AddTips = function (guid, gameSetID, roadMapNumber, shoeNumber, roundNumber, orderSequence, tipsValue, cb) {
        var url = APIUrl + "/AddTips";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            GameSetID: gameSetID,
            RoadMapNumber: roadMapNumber,
            ShoeNumber: shoeNumber,
            RoundNumber: roundNumber,
            OrderSequence: orderSequence,
            TipsValue: tipsValue
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.AddOrderType0 = function (guid, gameSetID, roadMapNumber, shoeNumber, roundNumber, orderSequence, orderBanker, orderPlayer, orderTie, orderBankerPair, orderPlayerPair, cb) {
        var url = APIUrl + "/AddOrderType0";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            GameSetID: gameSetID,
            RoadMapNumber: roadMapNumber,
            ShoeNumber: shoeNumber,
            RoundNumber: roundNumber,
            OrderSequence: orderSequence,
            OrderBanker: orderBanker,
            OrderPlayer: orderPlayer,
            OrderTie: orderTie,
            OrderBankerPair: orderBankerPair,
            OrderPlayerPair: orderPlayerPair
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.AddOrderType1 = function (guid, currencyType, roadMapNumber, shoeNumber, roundNumber, orderSequence, orderBanker, orderPlayer, orderTie, orderBankerPair, orderPlayerPair, cb) {
        var url = APIUrl + "/AddOrderType1";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            CurrencyType: currencyType,
            RoadMapNumber: roadMapNumber,
            ShoeNumber: shoeNumber,
            RoundNumber: roundNumber,
            OrderSequence: orderSequence,
            OrderBanker: orderBanker,
            OrderPlayer: orderPlayer,
            OrderTie: orderTie,
            OrderBankerPair: orderBankerPair,
            OrderPlayerPair: orderPlayerPair
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.AddOrderType2 = function (guid, currencyType, roadMapNumber, shoeNumber, roundNumber, orderSequence, orderBanker, orderPlayer, orderTie, orderBankerPair, orderPlayerPair, cb) {
        var url = APIUrl + "/AddOrderType2";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            CurrencyType: currencyType,
            RoadMapNumber: roadMapNumber,
            ShoeNumber: shoeNumber,
            RoundNumber: roundNumber,
            OrderSequence: orderSequence,
            OrderBanker: orderBanker,
            OrderPlayer: orderPlayer,
            OrderTie: orderTie,
            OrderBankerPair: orderBankerPair,
            OrderPlayerPair: orderPlayerPair
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.ClearOrderType0 = function (guid, gameSetID, roadMapNumber, shoeNumber, roundNumber, orderSequence, cb) {
        var url = APIUrl + "/ClearOrderType0";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            GameSetID: gameSetID,
            RoadMapNumber: roadMapNumber,
            ShoeNumber: shoeNumber,
            RoundNumber: roundNumber,
            OrderSequence: orderSequence
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.ClearOrderType1 = function (guid, roadMapNumber, shoeNumber, roundNumber, orderSequence, cb) {
        var url = APIUrl + "/ClearOrderType1";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            RoadMapNumber: roadMapNumber,
            ShoeNumber: shoeNumber,
            RoundNumber: roundNumber,
            OrderSequence: orderSequence
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.ClearOrderType2 = function (guid, roadMapNumber, shoeNumber, roundNumber, orderSequence, cb) {
        var url = APIUrl + "/ClearOrderType2";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            RoadMapNumber: roadMapNumber,
            ShoeNumber: shoeNumber,
            RoundNumber: roundNumber,
            OrderSequence: orderSequence
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.SetOrderType0Cmd = function (guid, gameSetID, roadMapNumber, shoeNumber, roundNumber, orderSequence, orderCmd, cb) {
        var url = APIUrl + "/SetOrderType0Cmd";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            GameSetID: gameSetID,
            RoadMapNumber: roadMapNumber,
            ShoeNumber: shoeNumber,
            RoundNumber: roundNumber,
            OrderSequence: orderSequence,
            OrderCmd: orderCmd
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.SetGameSetCmd = function (guid, gameSetID, roadMapNumber, shoeNumber, roundNumber, gameSetCmd, cb) {
        var url = APIUrl + "/SetGameSetCmd";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            GameSetID: gameSetID,
            RoadMapNumber: roadMapNumber,
            ShoeNumber: shoeNumber,
            RoundNumber: roundNumber,
            GameSetCmd: gameSetCmd
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };

    this.Query = function (guid, gameSetID, roadMapNumber, cb) {
        var url = APIUrl + "/Query";
        var postData;

        postData = {
            CT: CT,
            GUID: guid,
            GameSetID: gameSetID,
            RoadMapNumber: roadMapNumber
        };

        callService(url, postData, 3000, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    };



    function callService(URL, postObject, timeoutMS, cb) {
        var xmlHttp = new XMLHttpRequest;
        var postData;

        if (postObject)
            postData = JSON.stringify(postObject);

        xmlHttp.open("POST", URL, true);
        xmlHttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                var contentText = this.responseText;

                if (this.status == "200") {
                    if (cb) {
                        cb(true, contentText);
                    }
                } else {
                    cb(false, contentText);
                }
            }
        };

        xmlHttp.timeout = timeoutMS;
        xmlHttp.ontimeout = function () {
            /*
            timeoutTryCount += 1;

            if (timeoutTryCount < 2)
                xmlHttp.send(postData);
            else*/
            if (cb)
                cb(false, "Timeout");
        };

        xmlHttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xmlHttp.send(postData);
    }


    function getJSON(text) {
        var obj = JSON.parse(text);

        if (obj) {
            if (obj.hasOwnProperty('d')) {
                return obj.d;
            } else {
                return obj;
            }
        }
    }
};