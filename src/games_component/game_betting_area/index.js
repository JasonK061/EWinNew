import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { setDefaultChipsId, checkClickChipsId } from 'store/actions';

import './index.scss';

// 之後會優化代碼

const GameBettingArea = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const canvasRef = useRef(null);
    const pathRef1 = useRef(null);
    const pathRef2 = useRef(null);
    const pathRef3 = useRef(null);
    const pathRef4 = useRef(null);
    const pathRef5 = useRef(null);

    const [isAct1, setIsAct1] = useState('');
    const [isAct2, setIsAct2] = useState('');
    const [isAct3, setIsAct3] = useState('');
    const [isAct4, setIsAct4] = useState('');
    const [isAct5, setIsAct5] = useState('');

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const getChipsId = props.defaultChipsId;
    const [chips, setChips] = useState(0);
    const [buttonClickCounts, setButtonClickCounts] = useState({ btn1: 0, btn2: 0, btn3: 0, btn4: 0, btn5: 0 });

    const updateButtonClickCount = (button) => {
        setButtonClickCounts((prevCounts) => ({
            ...prevCounts,
            [button]: prevCounts[button] + 1,
        }));
    };


    const [totalChips1, setTotalChips1] = useState(0);
    const [totalChips2, setTotalChips2] = useState(0);
    const [totalChips3, setTotalChips3] = useState(0);
    const [totalChips4, setTotalChips4] = useState(0);
    const [totalChips5, setTotalChips5] = useState(0);


    useEffect(() => {
        switch (getChipsId) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                setChips([25, 50, 100, 500, 1000, 1250, 5000, 10000][getChipsId]);
                setButtonClickCounts({ btn1: 0, btn2: 0, btn3: 0, btn4: 0, btn5: 0 });
                break;
            default:
        }
    }, [getChipsId]);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);


        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);

    useEffect(() => {
        if (props.seconds === 0) {
            setIsAct1('');
            setIsAct2('');
            setIsAct3('');
            setIsAct4('');
            setIsAct5('');
            setTotalChips1(0);
            setTotalChips2(0);
            setTotalChips3(0);
            setTotalChips4(0);
            setTotalChips5(0);
            setButtonClickCounts({ btn1: 0, btn2: 0, btn3: 0, btn4: 0, btn5: 0 });
        }
    }, [props.seconds])


    useEffect(() => {

        if (props.seconds === 0) {
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        const widthForPC = (() => {
            //第一顆按鈕控制path
            const path1 = new Path2D();
            // 繪製背景
            // ctx.beginPath();
            //初始點
            path1.moveTo(0, 0);
            path1.lineTo(0, canvas.height / 1.45);
            path1.lineTo(canvas.width / 40, canvas.height / 1.2);
            path1.lineTo(canvas.width / 11.2, canvas.height);
            path1.lineTo(canvas.width / 4.55, canvas.height);
            path1.lineTo(canvas.width / 3, canvas.height / 1.6);
            path1.lineTo(canvas.width / 5.3, canvas.height / 1.6);
            path1.lineTo(canvas.width / 7.5, canvas.height / 1.9);
            path1.lineTo(canvas.width / 10, canvas.height / 2.8);
            path1.lineTo(canvas.width / 11, canvas.height / 3.7);
            path1.lineTo(canvas.width / 11, 1);
            path1.lineTo(0, 0);
            ctx.fillStyle = 'rgba(255,255,255,0)';
            ctx.fill(path1);
            pathRef1.current = path1;

            //第二顆按鈕控制path
            const path2 = new Path2D();
            path2.moveTo(canvas.width / 3, canvas.height / 1.6);
            path2.lineTo(canvas.width / 4.6, canvas.height);
            path2.lineTo(canvas.width / 1.3, canvas.height);
            path2.lineTo(canvas.width / 1.5, canvas.height / 1.6);
            path2.lineTo(canvas.width / 3, canvas.height / 1.6);
            ctx.fillStyle = 'rgba(220,155,255,0)';
            ctx.fill(path2);
            pathRef2.current = path2;

            //第三顆按鈕控制path
            const path3 = new Path2D();
            path3.moveTo(canvas.width / 1.5, canvas.height / 1.6);
            path3.lineTo(canvas.width / 1.3, canvas.height);
            path3.lineTo(canvas.width / 1.095, canvas.height);
            path3.lineTo(canvas.width / 1.02, canvas.height / 1.2);
            path3.lineTo(canvas.width / 1, canvas.height / 1.5);
            path3.lineTo(canvas.width, 0);
            path3.lineTo(canvas.width / 1.11, 0);
            path3.lineTo(canvas.width / 1.1, canvas.height / 3.2);
            path3.lineTo(canvas.width / 1.2, canvas.height / 1.6);
            path3.lineTo(canvas.width / 1.5, canvas.height / 1.6);
            ctx.fillStyle = 'rgba(0,255,125,0)';
            ctx.fill(path3);
            pathRef3.current = path3;
            //第四顆按鈕控制path
            const path4 = new Path2D();
            path4.moveTo(canvas.width / 1.12, 0);
            path4.lineTo(canvas.width / 1.98, 0);
            path4.lineTo(canvas.width / 1.98, canvas.height / 1.7);
            path4.lineTo(canvas.width / 1.25, canvas.height / 1.7);
            path4.lineTo(canvas.width / 1.18, canvas.height / 2);
            path4.lineTo(canvas.width / 1.14, canvas.height / 2.5);
            path4.lineTo(canvas.width / 1.13, canvas.height / 3);
            path4.lineTo(canvas.width / 1.12, canvas.height / 4);
            ctx.fillStyle = 'rgba(255,0,12,0)';
            ctx.fill(path4);
            pathRef4.current = path4;

            //第五顆按鈕控制path
            const path5 = new Path2D();
            path5.moveTo(canvas.width / 2, 0);
            path5.lineTo(canvas.width / 9.2, 0);
            path5.lineTo(canvas.width / 9.5, canvas.height / 3.6);
            path5.lineTo(canvas.width / 8, canvas.height / 2.5);
            path5.lineTo(canvas.width / 7.3, canvas.height / 2.2);
            path5.lineTo(canvas.width / 5.9, canvas.height / 1.9);
            path5.lineTo(canvas.width / 5, canvas.height / 1.7);
            path5.lineTo(canvas.width / 2, canvas.height / 1.7);
            path5.lineTo(canvas.width / 2, 0);
            ctx.fillStyle = 'rgba(218,0,123,0)';
            ctx.fill(path5);
            pathRef5.current = path5;
        })
        const widthForMb = (() => {
            //第一顆按鈕控制path
            const path1 = new Path2D();
            // 繪製背景
            // ctx.beginPath();
            //初始點
            path1.moveTo(0, 0);
            path1.lineTo(0, canvas.height / 1.25);
            path1.lineTo(canvas.width / 11, canvas.height);
            path1.lineTo(canvas.width / 4.6, canvas.height);
            path1.lineTo(canvas.width / 3.15, canvas.height / 1.6);
            path1.lineTo(canvas.width / 5, canvas.height / 1.6);
            path1.lineTo(canvas.width / 7.5, canvas.height / 1.85);
            path1.lineTo(canvas.width / 10.8, canvas.height / 2.5);
            path1.lineTo(canvas.width / 10.8, 0);
            path1.lineTo(0, 0);
            ctx.fillStyle = 'rgba(255,255,255,0)';
            ctx.fill(path1);
            pathRef1.current = path1;

            //第二顆按鈕控制path
            const path2 = new Path2D();
            path2.moveTo(canvas.width / 3, canvas.height / 1.6);
            path2.lineTo(canvas.width / 4.6, canvas.height);
            path2.lineTo(canvas.width / 1.3, canvas.height);
            path2.lineTo(canvas.width / 1.5, canvas.height / 1.6);
            path2.lineTo(canvas.width / 3, canvas.height / 1.6);
            ctx.fillStyle = 'rgba(220,155,255,0)';
            ctx.fill(path2);
            pathRef2.current = path2;

            //第三顆按鈕控制path
            const path3 = new Path2D();
            path3.moveTo(canvas.width / 1.5, canvas.height / 1.6);
            path3.lineTo(canvas.width / 1.3, canvas.height);
            path3.lineTo(canvas.width / 1.1, canvas.height);
            path3.lineTo(canvas.width / 1.05, canvas.height / 1.05);
            path3.lineTo(canvas.width / 1.02, canvas.height / 1.12);
            path3.lineTo(canvas.width / 1, canvas.height / 1.2);
            path3.lineTo(canvas.width / 1, canvas.height / 1.5);
            path3.lineTo(canvas.width, 0);
            path3.lineTo(canvas.width / 1.09, 0);
            path3.lineTo(canvas.width / 1.09, canvas.height / 3.2);
            path3.lineTo(canvas.width / 1.12, canvas.height / 2.1);
            path3.lineTo(canvas.width / 1.2, canvas.height / 1.7);
            path3.lineTo(canvas.width / 1.5, canvas.height / 1.6);
            ctx.fillStyle = 'rgba(0,255,125,0)';
            ctx.fill(path3);
            pathRef3.current = path3;
            //第四顆按鈕控制path
            const path4 = new Path2D();
            path4.moveTo(canvas.width / 1.12, 0);
            path4.lineTo(canvas.width / 1.98, 0);
            path4.lineTo(canvas.width / 1.98, canvas.height / 1.7);
            path4.lineTo(canvas.width / 1.25, canvas.height / 1.7);
            path4.lineTo(canvas.width / 1.17, canvas.height / 2);
            path4.lineTo(canvas.width / 1.15, canvas.height / 2.2);
            path4.lineTo(canvas.width / 1.14, canvas.height / 2.5);
            path4.lineTo(canvas.width / 1.13, canvas.height / 3);
            path4.lineTo(canvas.width / 1.12, canvas.height / 4);
            ctx.fillStyle = 'rgba(255,0,12,0)';
            ctx.fill(path4);
            pathRef4.current = path4;

            //第五顆按鈕控制path
            const path5 = new Path2D();
            path5.moveTo(canvas.width / 2, 0);
            path5.lineTo(canvas.width / 9, 0);
            path5.lineTo(canvas.width / 9.4, canvas.height / 3.6);
            path5.lineTo(canvas.width / 8, canvas.height / 2.5);
            path5.lineTo(canvas.width / 7.3, canvas.height / 2.2);
            path5.lineTo(canvas.width / 5.9, canvas.height / 1.9);
            path5.lineTo(canvas.width / 5, canvas.height / 1.7);
            path5.lineTo(canvas.width / 2, canvas.height / 1.7);
            path5.lineTo(canvas.width / 2, 0);
            ctx.fillStyle = 'rgba(218,0,123,0)';
            ctx.fill(path5);
            pathRef5.current = path5;
        })

        // 判斷螢幕寬度後必須重新配置新的寬高, 重新畫path

        // const parentWidth = canvas.parentElement.clientWidth;
        // canvas.width = parentWidth;
        if (windowWidth < 340) {
            canvas.width = 304;
            canvas.height = 152;
            widthForMb()

        } else if ((windowWidth < 360)) {
            canvas.width = 330;
            canvas.height = 166;
            widthForMb();
        } else if ((windowWidth < 424)) {
            canvas.width = 360;
            canvas.height = 175;
            widthForMb();
        } else if ((windowWidth < 435)) {
            canvas.width = 425;
            canvas.height = 120;
            widthForPC();
        } else if ((windowWidth < 502)) {
            canvas.width = 425;
            canvas.height = 120;
            widthForPC();
        } else if ((windowWidth < 729)) {
            canvas.width = 502;
            canvas.height = 142;
            widthForPC();
        } else {
            canvas.width = 714;
            canvas.height = 202;
            widthForPC();

        }

        const handleClick = (event) => {

            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;


            if (ctx.isPointInPath(pathRef1.current, mouseX, mouseY)) {
                // console.log('path1');
                setIsAct1('isAct');
                dispatch(checkClickChipsId('clickBtn1'));
                updateButtonClickCount('btn1');
                if (buttonClickCounts.btn1 > 0) {
                    const newTotalChips1 = ((buttonClickCounts.btn1 * chips) + chips);
                    setTotalChips1(newTotalChips1);

                } else {
                    setTotalChips1(chips);
                }

            } else if (ctx.isPointInPath(pathRef2.current, mouseX, mouseY)) {
                // console.log('path2');
                setIsAct2('isAct');
                dispatch(checkClickChipsId('clickBtn2'));
                updateButtonClickCount('btn2');
                if (buttonClickCounts.btn2 > 0) {
                    const newTotalChips2 = ((buttonClickCounts.btn2 * chips) + chips);
                    setTotalChips2(newTotalChips2);
                } else {
                    setTotalChips2(chips);
                }

            } else if (ctx.isPointInPath(pathRef3.current, mouseX, mouseY)) {
                // console.log('path3');
                setIsAct3('isAct');
                dispatch(checkClickChipsId('clickBtn3'));
                updateButtonClickCount('btn3');
                if (buttonClickCounts.btn3 > 0) {
                    const newTotalChips3 = ((buttonClickCounts.btn3 * chips) + chips);
                    setTotalChips3(newTotalChips3);

                } else {
                    setTotalChips3(chips);
                }

            } else if (ctx.isPointInPath(pathRef4.current, mouseX, mouseY)) {
                // console.log('path4');
                setIsAct4('isAct');
                dispatch(checkClickChipsId('clickBtn4'));
                updateButtonClickCount('btn4');
                if (buttonClickCounts.btn4 > 0) {
                    const newTotalChips4 = ((buttonClickCounts.btn4 * chips) + chips);
                    setTotalChips4(newTotalChips4);

                } else {
                    setTotalChips4(chips);
                }

            } else if (ctx.isPointInPath(pathRef5.current, mouseX, mouseY)) {
                // console.log('path5');
                setIsAct5('isAct');
                dispatch(checkClickChipsId('clickBtn5'));
                updateButtonClickCount('btn5');
                if (buttonClickCounts.btn5 > 0) {
                    const newTotalChips5 = ((buttonClickCounts.btn5 * chips) + chips);
                    setTotalChips5(newTotalChips5);

                } else {
                    setTotalChips5(chips);
                }
            }
            else {

            }

        };

        canvas.addEventListener('click', handleClick);

        return () => {
            canvas.removeEventListener('click', handleClick);
        };


    }, [
        windowWidth,
        props.seconds,
        buttonClickCounts,
        chips
    ])

    return (
        <div className='game-betting-area'>
            <div className='game-betting-area-box'>
                <div className='left-box'>

                </div>
                <div
                    className={`middle-box ${props.seconds === 0 ? 'disable' : 'enable'}`}>
                    <canvas ref={canvasRef} />
                    <div className={`btn1 ${isAct1}`} >
                        <div className="info-box">
                            <p>{t('Global.p_pair')}</p>
                            {/* <p>基礎代幣:{chips}</p>
                            <p>點擊次數:{btn1clickCount}</p> */}
                            {totalChips1 !== 0 ? <p>{totalChips1}</p> : ''}
                        </div>
                    </div>
                    <div className={`btn2 ${isAct2}`}>
                        <div className="info-box">
                            <p>{t('Global.tie')}</p>
                            {totalChips2 !== 0 ? <p>{totalChips2}</p> : ''}
                        </div>
                    </div>
                    <div className={`btn3 ${isAct3}`}>
                        <div className="info-box">
                            <p>{t('Global.b_pair')}</p>
                            {totalChips3 !== 0 ? <p>{totalChips3}</p> : ''}
                        </div>
                    </div>
                    <div className={`btn4 ${isAct4}`}>
                        <div className="info-box">
                            <p>{t('Global.banker')}</p>
                            {totalChips4 !== 0 ? <p>{totalChips4}</p> : ''}
                        </div>
                        <div className="bg-box">
                            <p>{t('Global.banker')}</p>
                        </div>
                    </div>
                    <div className={`btn5 ${isAct5}`}>
                        <div className="info-box">
                            <p>{t('Global.player')}</p>
                            {totalChips5 !== 0 ? <p>{totalChips5}</p> : ''}
                        </div>
                        <div className="bg-box">
                            <p>{t('Global.player')}</p>
                        </div>
                    </div>
                </div>
                <div className='right-box'>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    // console.log('檢查state', state);
    // console.log('檢查state.clickCount', state.root.clickCount);
    return {
        defaultChipsId: state.root.defaultChipsId,
        clickChipsId: state.root.clickChipsId
    };
};


const mapDispatchToProps = {
    setDefaultChipsId,
    checkClickChipsId
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBettingArea);