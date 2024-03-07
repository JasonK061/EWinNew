import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
// import {
//     setSeconds,
//     setFirstSeconds
// } from 'store/actions';
import './index.scss';

const CountdownCircle = (props) => {
    return (
        <div className='countdown-circle-box' >
            {props.seconds === 0
                ?
                <div className={`countdown-circle red done`}>
                    <div className="countdown-text">{props.seconds}</div>
                </div>
                :
                <div className={`countdown-circle ${props.seconds >= 20 ? 'green' : props.seconds <= 9 ? 'red' : 'yellow'}`} style={{ '--countdown-duration': `${props.firstSeconds}s` }}>
                    <div className="countdown-text">{props.seconds}</div>
                </div>
            }
        </div>
    );
};


// const mapStateToProps = (state) => {
//     console.log('seconds', state.root.seconds);
//     console.log('firstSeconds', state.root.firstSeconds);
//     // console.log('檢查state.favorites', state.root.favorites);
//     return {
//         seconds: state.root.seconds,
//         firstSeconds: state.root.firstSeconds
//     };
// };

// const mapDispatchToProps = (dispatch) => ({
//     setSeconds,
//     setFirstSeconds
// });

// export default connect(mapStateToProps, mapDispatchToProps)(CountdownCircle);
export default CountdownCircle;

