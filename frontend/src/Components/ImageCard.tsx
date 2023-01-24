interface Props {
    title: string;
    imageSource: string;
    isSelected: boolean;
}

function ImageCard(props: Props) {
    return (
        <div
            className={`mx-2 text-center ${
                props.isSelected && "border border-green-400"
            }`}
        >
            <img src={props.imageSource} alt="Logo" className="p-4" />
            <h1 className=" text-white font-extrabold text-xl">
                {props.title}
            </h1>
        </div>
    );
}

ImageCard.defaultProps = {
    isSelected: false,
};

export default ImageCard;
