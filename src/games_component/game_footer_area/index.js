import './index.scss';
import GameChipsButton from 'games_component/game_buttons/game_chips_btn';


const GameFooterArea = () => {

    return (
        <div className='game-footer-area'>
            <div className='game-footer-area-box'>
                <div className='left-box'></div>
                <div className='middle-box'>
                    <div className='game-box-straight'>
                        <GameChipsButton />
                    </div>
                </div>
                <div className='right-box'></div>
            </div>
        </div>
    )
}


export default GameFooterArea;

