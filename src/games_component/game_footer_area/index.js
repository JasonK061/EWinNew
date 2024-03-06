import { useEffect, useState } from 'react';
import './index.scss';
import { connect } from 'react-redux';
import {
    setTotalChips1,
    setTotalChips2,
    setTotalChips3,
    setTotalChips4,
    setTotalChips5,
    setTotalChips,
    setIsAct1,
    setIsAct2,
    setIsAct3,
    setIsAct4,
    setIsAct5,
    setIsAnimationActive1,
    setIsAnimationActive2,
    setIsAnimationActive3,
    setIsAnimationActive4,
    setIsAnimationActive5,
    setDefaultClick
} from 'store/actions';
import GameChipsButton from 'games_component/game_buttons/game_chips_btn';


const GameFooterArea = (props) => {

    const handleCancel = () => {
        props.setTotalChips1(0);
        props.setTotalChips2(0);
        props.setTotalChips3(0);
        props.setTotalChips4(0);
        props.setTotalChips5(0);
        props.setIsAct1('');
        props.setIsAct2('');
        props.setIsAct3('');
        props.setIsAct4('');
        props.setIsAct5('');
        props.setDefaultClick('show')
    }

    const handleDouble = () => {
        // 這邊加倍感覺有問題, 應該不是 total值加倍, 是籌碼加倍, 再與設計確認
        props.setTotalChips1(props.totalChips1 * 2);
        props.setTotalChips2(props.totalChips2 * 2);
        props.setTotalChips3(props.totalChips3 * 2);
        props.setTotalChips4(props.totalChips4 * 2);
        props.setTotalChips5(props.totalChips5 * 2);

        props.setIsAnimationActive1(false);
        props.setIsAnimationActive2(false);
        props.setIsAnimationActive3(false);
        props.setIsAnimationActive4(false);
        props.setIsAnimationActive5(false);
        setInitialized(false);


    }

    const [initialized, setInitialized] = useState(true);

    useEffect(() => {
        if (!initialized) {
            const timerLoading = setTimeout(() => {
                props.setIsAnimationActive1(true);
                props.setIsAnimationActive2(true);
                props.setIsAnimationActive3(true);
                props.setIsAnimationActive4(true);
                props.setIsAnimationActive5(true);

                // 在1秒后执行第二组动作
                setTimeout(() => {
                    props.setIsAnimationActive1(false);
                    props.setIsAnimationActive2(false);
                    props.setIsAnimationActive3(false);
                    props.setIsAnimationActive4(false);
                    props.setIsAnimationActive5(false);
                }, 1000);

                setInitialized(true);
            }, 100);

            return () => clearTimeout(timerLoading);
        }
    }, [initialized]);

    // useEffect(() => {
    //     const timerLoading = setTimeout(() => {
    //         props.setIsAnimationActive1(true);
    //         props.setIsAnimationActive2(true);

    //         // 在1秒后执行第二组动作
    //         setTimeout(() => {
    //             props.setIsAnimationActive1(false);
    //             props.setIsAnimationActive2(false);
    //         }, 200);

    //     }, 100);

    //     return () => clearTimeout(timerLoading);
    // }, [props.setIsAnimationActive1, props.setIsAnimationActive2]);

    return (
        <div className='game-footer-area'>
            <div className='game-footer-area-box'>
                <div className='left-box'></div>
                <div className='middle-box'>
                    <div className='game-box-straight'>
                        <span onClick={handleCancel} className='cancel'>撤銷</span>
                        <GameChipsButton />
                        <span onClick={handleDouble} className='double'>加倍</span>
                    </div>
                </div>
                <div className='right-box'></div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        totalChips1: state.root.totalChips1,
        totalChips2: state.root.totalChips2,
        totalChips3: state.root.totalChips3,
        totalChips4: state.root.totalChips4,
        totalChips5: state.root.totalChips5,
        isAct1: state.root.isAct1,
        isAct2: state.root.isAct2,
        isAct3: state.root.isAct3,
        isAct4: state.root.isAct4,
        isAct5: state.root.isAct5,
        isAnimationActive1: state.root.isAnimationActive1,
        isAnimationActive2: state.root.isAnimationActive2,
        isAnimationActive3: state.root.isAnimationActive3,
        isAnimationActive4: state.root.isAnimationActive4,
        isAnimationActive5: state.root.isAnimationActive5,
        defaultClick: state.root.defaultClick
    };
};

const mapDispatchToProps = (dispatch) => ({
    setTotalChips1: (totalChips1) => dispatch(setTotalChips1(totalChips1)),
    setTotalChips2: (totalChips2) => dispatch(setTotalChips2(totalChips2)),
    setTotalChips3: (totalChips3) => dispatch(setTotalChips3(totalChips3)),
    setTotalChips4: (totalChips4) => dispatch(setTotalChips4(totalChips4)),
    setTotalChips5: (totalChips5) => dispatch(setTotalChips5(totalChips5)),
    setIsAct1: (isAct1) => dispatch(setIsAct1(isAct1)),
    setIsAct2: (isAct2) => dispatch(setIsAct2(isAct2)),
    setIsAct3: (isAct3) => dispatch(setIsAct3(isAct3)),
    setIsAct4: (isAct4) => dispatch(setIsAct4(isAct4)),
    setIsAct5: (isAct5) => dispatch(setIsAct5(isAct5)),
    setIsAnimationActive1: (isAnimationActive1) => dispatch(setIsAnimationActive1(isAnimationActive1)),
    setIsAnimationActive2: (isAnimationActive2) => dispatch(setIsAnimationActive2(isAnimationActive2)),
    setIsAnimationActive3: (isAnimationActive3) => dispatch(setIsAnimationActive3(isAnimationActive3)),
    setIsAnimationActive4: (isAnimationActive4) => dispatch(setIsAnimationActive4(isAnimationActive4)),
    setIsAnimationActive5: (isAnimationActive5) => dispatch(setIsAnimationActive5(isAnimationActive5)),
    setDefaultClick: (defaultClick) => dispatch(setDefaultClick(defaultClick))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameFooterArea);

// export default GameFooterArea;

