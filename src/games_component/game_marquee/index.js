import React, { useState, useEffect, useRef } from 'react';
import { listItems } from './data';
import './index.scss';

const Marquee = () => {
    const timer = useRef(null);
    const [left, setLeft] = useState(0);
    const contentRef = useRef(null);


    useEffect(() => {
        if (timer.current) {
            clearInterval(timer.current);
        }

        const contentDom = contentRef.current;

        if (contentDom && listItems.length > 0) {
            const calculateWidth = () => contentDom.scrollWidth;

            if (calculateWidth() > contentDom.parentNode.offsetWidth) {
                timer.current = setInterval(() => {
                    setLeft((state) => {
                        const nextLeft = state - 1;
                        if (-nextLeft >= calculateWidth()) {
                            return 0;
                        } else {
                            return nextLeft;
                        }
                    });
                }, 100);
            } else {
                setLeft(0);
            }
        }

        return () => {
            if (timer.current) {
                clearInterval(timer.current);
            }
        };
    }, []);


    return (
        <div className="marquee-box">
            <div ref={contentRef} className="marquee" style={{ left }}>
                {listItems.map((item, index) => (
                    <div key={index}>{item.message}</div>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
