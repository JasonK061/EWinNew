import './index.scss';
const Loading = () => {
    const numDots = 8;
    const loadingDots = Array.from({ length: numDots }, (_, index) => (
        <div key={index}></div>
    ));
    return (
        <div className="loading">
            {loadingDots}
        </div>
    )
}

export default Loading;
