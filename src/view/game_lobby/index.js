
import Section from 'component/section';
import { listItems1, listItems2 } from '../data';
import DefaultVedio from 'component/default_vedio';
import Titlebar from 'component/title_bar';
import { CustomTabs, CustomTab } from 'component/custom_tabs';
import Loading from 'component/loading';


import './index.scss';

function Gamelobby(props) {

    const tiList = props.tiList;
    const userInfo = props.userInfo;

    // hardcode demo用
    // const isLoading = false;
    const isLoading = props.isLoading;


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
                                                        <Section tiList={tiList} userInfo={userInfo} />

                                                        {/* hardcode demo用 */}
                                                        {/* <Section listItems={listItems1} /> */}
                                                    </CustomTab>
                                                    <CustomTab eventKey="baccarat" title="百家樂">
                                                        {/* hardcode demo用 */}
                                                        {/* <Section listItems={listItems2} /> */}
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
                                                        {/* hardcode demo用 */}
                                                        {/* <Section listItems={listItems1} /> */}
                                                        <Section tiList={tiList} userInfo={userInfo} />
                                                    </CustomTab>
                                                    <CustomTab eventKey="baccarat" title="百家樂">
                                                        <Titlebar title="百家樂" />
                                                        {/* hardcode demo用 */}
                                                        {/* <Section listItems={listItems2} /> */}
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