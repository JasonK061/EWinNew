
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toggleFavorite, showMessage } from 'store/actions';
import './index.scss';

const GameFavorite = (props) => {

    const [getNewGameId, setGetNewGameId] = useState('');

    useEffect(() => {
        setGetNewGameId(props.url.split('/').pop())
    }, [])

    const handleClick = async (gameId) => {
        await props.toggleFavorite(gameId);
        props.showMessage();
    };

    return (
        <div className='game-favorite-box'>
            <span onClick={() => handleClick(getNewGameId)} className={props.favorites.includes(getNewGameId) ? 'remove-to-favorites' : 'add-to-favorites'} />
        </div>
    )
}


const mapStateToProps = (state) => {

    return {
        favorites: state.root.favorites || []
    };
};

const mapDispatchToProps = {
    toggleFavorite,
    showMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(GameFavorite);