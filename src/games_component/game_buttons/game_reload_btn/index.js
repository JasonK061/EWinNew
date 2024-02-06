import './index.scss';

const GameReloadButton = () => {

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="game-reload-box">
            <div className="game-reload" onClick={handleReload} />
        </div>
    )
}

export default GameReloadButton;