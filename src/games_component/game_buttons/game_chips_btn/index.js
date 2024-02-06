import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { setDefaultChipsId, checkClickChipsId } from 'store/actions';
import './index.scss';

const GameChipsButton = ((props) => {

    const chipsItem = [
        { chipsId: 0, chips: 25 },
        { chipsId: 1, chips: 50 },
        { chipsId: 2, chips: 100 },
        { chipsId: 3, chips: 500 },
        { chipsId: 4, chips: 1000 },
        { chipsId: 5, chips: 1250 },
        { chipsId: 6, chips: 5000 },
        { chipsId: 7, chips: 10000 },
    ]



    const dispatch = useDispatch();

    const handleClick = (event) => {
        const chipsId = parseInt(event.currentTarget.className.split('-')[1], 10);
        // console.log('chipsId', chipsId);
        if (chipsId !== props.defaultChipsId) {
            dispatch(setDefaultChipsId(chipsId));
            dispatch(checkClickChipsId(''));
        }
    };

    return (
        <div className="game-chips-box">
            {chipsItem.map((item) => (
                <span
                    key={item.chipsId}
                    className={`chips-${item.chipsId} ${props.defaultChipsId === item.chipsId ? 'act' : ''} ${props.defaultChipsId === item.chipsId ? props.clickChipsId : ''}`}
                    onClick={handleClick}
                />
            ))}
        </div>
    )
})


const mapStateToProps = (state) => {
    // console.log('檢查state', state);
    // console.log('檢查state.defaultChipsId', state.root.defaultChipsId);
    return {
        defaultChipsId: state.root.defaultChipsId,
        clickChipsId: state.root.clickChipsId
        // clickCount: state.root.clickCount,
    };
};


const mapDispatchToProps = {
    setDefaultChipsId,
    checkClickChipsId
};

export default connect(mapStateToProps, mapDispatchToProps)(GameChipsButton);