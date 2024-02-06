import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// 收藏頁面還沒設計好, 先開版之後再客制

const Gamefavorite = (props) => {
    // const { favorites } = props;
    const [getLocalFavorites, setGetLocalFavorites] = useState([]);

    useEffect(() => {
        const localStorageFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setGetLocalFavorites(localStorageFavorites);
    }, []);

    return (
        <div>
            <h2>Favorites</h2>
            <p>Number of Favorites: {getLocalFavorites.length}</p>
            <ul>
                {getLocalFavorites.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    favorites: state.root.favorites,
});

export default connect(mapStateToProps)(Gamefavorite);