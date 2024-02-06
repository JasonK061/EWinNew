import { useState, useEffect } from 'react';
import Section from 'component/section';
import { listItems1, listItems2 } from '../data';
import DefaultVedio from 'component/default_vedio';
import Titlebar from 'component/title_bar';
import { CustomTabs, CustomTab } from 'component/custom_tabs';
import Loading from 'component/loading';


import './index.scss';

function Gamelobby() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        // 模擬組件載入完成後的動作
        // 這一塊只是demo作假用,之後可移除,底下判斷 連結websocket後 setIsLoading(false), 才是之後實際用到的

        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);

        }, 2000);

        // 清除 timeout
        return () => clearTimeout(loadingTimeout);

    }, []);


    return (
        <div className='game-lobby-wrap'>
            {isLoading ? (
                <Loading />
            ) : (
                <div>

                    <div className='forpc'>
                        <div className='hasbg'>
                            <div className="container-fluid demobg"></div>
                            <div className='demoheight'>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='list-box'>
                                                <CustomTabs
                                                    defaultActiveKey="yourgames"
                                                >
                                                    <CustomTab eventKey="yourgames" title="屬於您">
                                                        <Section listItems={listItems1} />
                                                    </CustomTab>
                                                    <CustomTab eventKey="baccarat" title="百家樂">
                                                        <Section listItems={listItems2} />
                                                    </CustomTab>
                                                </CustomTabs>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='formb'>
                        <div className='hasbg'>
                            <div className='demoheight'>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='list-box'>
                                                <CustomTabs
                                                    defaultActiveKey="yourgames"
                                                >
                                                    <CustomTab eventKey="yourgames" title="屬於您">
                                                        <DefaultVedio />
                                                        <Titlebar title="全部遊戲" />
                                                        <Section listItems={listItems1} />
                                                    </CustomTab>
                                                    <CustomTab eventKey="baccarat" title="百家樂">
                                                        <Titlebar title="百家樂" />
                                                        <Section listItems={listItems2} />
                                                    </CustomTab>
                                                </CustomTabs>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}

export default Gamelobby;