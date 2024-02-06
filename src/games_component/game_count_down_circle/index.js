import React, { useState, useEffect, useRef } from 'react';
import './index.scss';

const CountdownCircle = (props) => {

    const seconds = props.seconds;
    const firstSeconds = props.firstSeconds;

    useEffect(() => {
        // 實際會有後端資料回傳,抓到回傳秒數後, 再把value 餵給 seconds, 和 firstSeconds 目前先用demo秒數


    }, []);



    return (
        <div className='countdown-circle-box' >
            {seconds === 0
                ?
                <div className={`countdown-circle red done`}>
                    <div className="countdown-text">{seconds}</div>
                </div>
                :
                <div className={`countdown-circle ${seconds >= 20 ? 'green' : seconds <= 9 ? 'red' : 'yellow'}`} style={{ '--countdown-duration': `${firstSeconds}s` }}>
                    <div className="countdown-text">{seconds}</div>
                </div>
            }
        </div>
    );
};

export default CountdownCircle;
