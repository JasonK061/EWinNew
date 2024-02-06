
// 這邊是個參數的init值設定

const initialState = {
    favorites: [],
    showMessage: '',
    mutes: [],
    showMuteMessage: '',
    gameTitle: '',
    defaultChipsId: 0,
    clickChipsId: '',
    numberOfClicks: 0
};


// 目前需要傳遞資料的事件不多, 所以都寫在 rootReducer裡面, 如果事件變多, 最好拆分多個 reducer 比較好管理

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_FAVORITE':  // 收藏相關
            const { gameId } = action.payload;
            const isFavorite = state.favorites.includes(gameId);
            const showMessage = isFavorite
                ? `移除收藏: ${gameId}`
                : `已收藏: ${gameId}`;

            const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];


            // 這邊寫法每次收藏都會清空再把新的收藏餵進去
            const newFavorites = isFavorite
                ? state.favorites.filter((id) => id !== gameId)
                : [...state.favorites, gameId];

            // 更新 favorites 狀態並將其寫入 localStorage
            localStorage.setItem('favorites', JSON.stringify(newFavorites));


            return {
                ...state,
                favorites: newFavorites,
                showMessage,
            };

        case 'TOGGLE_MUTE': // 靜音相關
            const { gameId: muteGameId } = action.payload;
            const isMuted = state.mutes.includes(muteGameId);
            const newMutes = isMuted
                ? state.mutes.filter((id) => id !== muteGameId)
                : [...state.mutes, muteGameId];

            // 更新 newMutes 狀態並將其寫入 localStorage
            localStorage.setItem('mutes', JSON.stringify(newMutes));

            return {
                ...state,
                mutes: newMutes,
                // showMuteMessage
            };

        case 'GAME_TITLE': // 遊戲標題相關
            localStorage.setItem('gameTitle', action.payload)
            return {
                ...state,
                gameTitle: action.payload
            }

        case 'SET_DEFAULT_CHIPS_ID': // 獲取代幣ID
            return {
                ...state,
                defaultChipsId: action.payload,
            };

        case 'CHECK_CLICK_CHIPS_ID': // 獲取投注狀態的ID
            return {
                ...state,
                clickChipsId: action.payload,
            }

        case 'CHECK_NUMBER_OF_CLICKS': // 獲取下注次數
            return {
                ...state,
                numberOfClicks: action.payload,
            }


        default:
            return state;
    }
};


export default rootReducer;

