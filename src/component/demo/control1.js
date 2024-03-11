
import { demostate } from 'store/actions';
import { connect } from 'react-redux';

const Democontrol1 = (props) => {

    // 透過 onClick 變更demo state 的初始值為7
    const handleDemoState = () => {
        // 這邊是變更值的操作
        props.demostate(7)
    }

    return (
        <div>
            demo state 操作與顯示範例
            <div onClick={handleDemoState}>點擊這裡變更 demo的 state:
                {/* 這裡是顯示值的方法 */}
                {props.demoState}
            </div>
        </div>
    )
}
// 把需要獲取的參數做個宣告
const mapStateToProps = (state) => {
    return {
        // 這邊指定demoState是 demoReducer 內的 demoState
        demoState: state.demo.demoState
    };
};
// 這邊需要操作demoState的值, 所以要連結 action.js 的 demostate
const mapDispatchToProps = {
    demostate
};


export default connect(mapStateToProps, mapDispatchToProps)(Democontrol1);