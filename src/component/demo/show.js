import { connect } from 'react-redux';
const DemostateShow = (props) => {
    return (
        <div style={{ color: '#fff', fontSize: '1.5rem' }}>
            這邊只展示 demoState: {props.demoState}
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

export default connect(mapStateToProps)(DemostateShow);