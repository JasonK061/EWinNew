import './index.scss';

const Titlebar = (props) => {
    const title = props.title
    return (
        <div className='titlebar'>{title}</div>
    )
}

export default Titlebar;