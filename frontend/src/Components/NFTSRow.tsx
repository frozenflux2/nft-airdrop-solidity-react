import { useState } from "react";
import ImageCard from "./ImageCard";
import Nico from "../assets/images/Nico.png";
import AzuraBlaze from "../assets/images/Azura_Blaze.png";
import ChromaBot from "../assets/images/Chroma_Bot.png";
import SunnyPaws from "../assets/images/Sunny_Paws.png";
import RockingWhiskers from "../assets/images/Rocking_Whiskers.png";
import MuscleMoo from "../assets/images/Muscle_Moo.png";

enum NFT {
    Nico,
    AzuraBlaze,
    ChromaBot,
    SunnyPaws,
    RockingWhiskers,
    MuscleMoo,
}

function NFTSRow() {
    const [nft, setNFT] = useState<NFT | null>(null);

    return (
        <div className="flex mx-16 mt-8">
            <ImageCard
                title="Nico"
                imageSource={Nico}
                isSelected={nft == NFT.Nico}
                onClick={() => {
                    setNFT(NFT.Nico);
                }}
            />
            <ImageCard
                title="Azura Blaze"
                imageSource={AzuraBlaze}
                isSelected={nft == NFT.AzuraBlaze}
                onClick={() => {
                    setNFT(NFT.AzuraBlaze);
                }}
            />
            <ImageCard
                title="Chroma Bot"
                imageSource={ChromaBot}
                isSelected={nft == NFT.ChromaBot}
                onClick={() => {
                    setNFT(NFT.ChromaBot);
                }}
            />
            <ImageCard
                title="Sunny Paws"
                imageSource={SunnyPaws}
                isSelected={nft == NFT.SunnyPaws}
                onClick={() => {
                    setNFT(NFT.SunnyPaws);
                }}
            />
            <ImageCard
                title="Rocking Whiskers"
                imageSource={RockingWhiskers}
                isSelected={nft == NFT.RockingWhiskers}
                onClick={() => {
                    setNFT(NFT.RockingWhiskers);
                }}
            />
            <ImageCard
                title="Muscle Moo"
                imageSource={MuscleMoo}
                isSelected={nft == NFT.MuscleMoo}
                onClick={() => {
                    setNFT(NFT.MuscleMoo);
                }}
            />
        </div>
    );
}

export default NFTSRow;
