import './index.scss';

const GameBettingAction = (props) => {
    // 這邊有停止下注, 和, 閒家, 庄家的狀態


    return (
        <div className={`game-betting-action ${props.action}`} />
    )
}

export default GameBettingAction;