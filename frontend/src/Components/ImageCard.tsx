interface Props {
    title: string;
    imageSource: string;
    isSelected: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

ImageCard.defaultProps = {
    isSelected: false,
    onClick: () => {},
};

function ImageCard(props: Props) {
    return (
        <div
            className={`mx-2 text-center ${
                props.isSelected && "border-2 border-green-400 rounded-lg"
            }`}
        >
            <button onClick={props.onClick}>
                <img src={props.imageSource} alt="Logo" className="p-4" />
                <h1 className=" text-white font-extrabold text-xl">
                    {props.title}
                </h1>
            </button>
        </div>
    );
}

export default ImageCard;
