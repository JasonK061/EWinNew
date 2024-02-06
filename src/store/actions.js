
// 收藏相關
export const toggleFavorite = (gameId) => async (dispatch, getState) => {
    // const isFavorite = getState().root.favorites.includes(gameId);

    dispatch({
        type: 'TOGGLE_FAVORITE',
        payload: { gameId },
    });

    // 在這裡可以執行其他異步操作（例如 API 請求），之後調整
    // ...


    return Promise.resolve();
};

// 顯示收藏訊息
export const showMessage = (showMessage) => ({
    type: 'SHOW_MESSAGE',
    payload: { showMessage },
});

// 靜音相關
export const toggleMute = (gameId) => ({
    type: 'TOGGLE_MUTE',
    payload: { gameId },
});
// 遊戲標題相關
export const getGameTitle = (gameTitle) => ({
    type: 'GAME_TITLE',
    payload: gameTitle
});
// 獲取代幣ID
export const setDefaultChipsId = (chipsId) => ({
    type: 'SET_DEFAULT_CHIPS_ID',
    payload: chipsId,
});
// 獲取投注狀態的ID
export const checkClickChipsId = (clickChipsId) => ({
    type: 'CHECK_CLICK_CHIPS_ID',
    payload: clickChipsId
})
// 獲取下注次數
export const setCheckNumberOfClicks = (numberOfClicks) => ({
    type: 'CHECK_NUMBER_OF_CLICKS',
    payload: numberOfClicks
})
