import './index.scss';
import { listItems } from './data';

// 實際相似遊戲會從後端返回state, 先這樣寫demo用

const SimilarGames = () => {
    return (
        <div className='similar-games-box'>
            {listItems.map((item, k) => (
                <div key={k} className='box' >
                    <div className={`games ${item.gameid}`}>
                        <img src={require(`../../img/gamelobby/${item.gameid}.png`)} alt={item.gameid} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SimilarGames;