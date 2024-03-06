const ButtonBox = (props) => {
    const { label, bglabel, totalChips, isAct, animations, getChipsId, isAnimationActive, btn } = props;

    return (
        <div className={`${btn} btn-box ${isAct}`}>
            <div className="info-box">
                <p>{label}</p>
                <div className={`chips-animation-box chipsId-${getChipsId} ${isAnimationActive ? 'active' : ''}`}>
                    <span>
                        {totalChips !== 0 ? totalChips : ''}
                    </span>
                    {isAct && animations}
                </div>
            </div>
            <div className="bg-box">
                <p>{bglabel}</p>
            </div>
        </div>
    );
};

export default ButtonBox;
