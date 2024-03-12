import { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
    setDefaultChipsId,
    checkClickChipsId,
    setIsAnimationActive1,
    setIsAnimationActive2,
    setIsAnimationActive3,
    setIsAnimationActive4,
    setIsAnimationActive5,
    setDefaultClick
} from 'store/actions';
import './index.scss';

const GameChipsButton = ((props) => {

    const chipsItem = [
        { chipsId: 0 },
        { chipsId: 1 },
        { chipsId: 2 },
        { chipsId: 3 },
        { chipsId: 4 },
        { chipsId: 5 },
        { chipsId: 6 },
        { chipsId: 7 },
    ]

    // const [defaultClick, setDefaultClick] = useState('show');

    const dispatch = useDispatch();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);


        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);

    const handleClick = (event) => {
        const chipsId = parseInt(event.currentTarget.className.split('-')[1], 10);
        console.log('chipsId', chipsId);

        if (chipsId !== props.defaultChipsId) {
            dispatch(setDefaultChipsId(chipsId));
            dispatch(checkClickChipsId(''));
        }

        props.setIsAnimationActive1('');
        props.setIsAnimationActive2('');
        props.setIsAnimationActive3('');
        props.setIsAnimationActive4('');
        props.setIsAnimationActive5('');

        // 橫版切換需收回
        if (windowWidth === 640 || windowWidth === 667 || windowWidth === 568 || windowWidth === 896) {
            props.setDefaultClick('show');
        }

    };


    return (
        <div className="game-chips-box">
            {/* {!defaultClick ? (
                chipsItem.map((item) => (
                    <span
                        key={item.chipsId}
                        className={`chips-${item.chipsId} ${props.defaultChipsId === item.chipsId ? 'act' : ''}`}
                        onClick={() => handleClick(item.chipsId)}
                    >
                        {item.text}
                    </span>
                ))
            ) : (
                <div className='default-click' onClick={() => setDefaultClick(false)}></div>
            )} */}
            <div className={props.defaultClick}>
                <div className={`default-click chips-${props.defaultChipsId}`} onClick={() => props.setDefaultClick('none')}></div>
                {
                    chipsItem.map((item) => (
                        <span
                            key={item.chipsId}
                            className={`chips-${item.chipsId} ${props.defaultChipsId === item.chipsId ? 'act' : ''}`}
                            onClick={handleClick}
                        />
                    ))
                }
            </div>
        </div>
    )
})


const mapStateToProps = (state) => {
    // console.log('檢查state', state);
    // console.log('檢查state.defaultChipsId', state.root.defaultChipsId);
    // console.log('numberOfClicks', state.root.numberOfClicks)
    return {
        defaultChipsId: state.root.defaultChipsId,
        clickChipsId: state.root.clickChipsId,
        numberOfClick: state.root.numberOfClick,
        defaultClick: state.root.defaultClick
        // clickCount: state.root.clickCount,
    };
};


const mapDispatchToProps = (dispatch) => ({
    setDefaultChipsId,
    checkClickChipsId,
    setIsAnimationActive1: (isActive) => dispatch(setIsAnimationActive1(isActive)),
    setIsAnimationActive2: (isActive) => dispatch(setIsAnimationActive2(isActive)),
    setIsAnimationActive3: (isActive) => dispatch(setIsAnimationActive3(isActive)),
    setIsAnimationActive4: (isActive) => dispatch(setIsAnimationActive4(isActive)),
    setIsAnimationActive5: (isActive) => dispatch(setIsAnimationActive5(isActive)),
    setDefaultClick: (defaultClick) => dispatch(setDefaultClick(defaultClick)),
});


export default connect(mapStateToProps, mapDispatchToProps)(GameChipsButton);