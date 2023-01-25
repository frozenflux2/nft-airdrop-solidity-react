import { useState } from "react";
import ImageCard from "./ImageCard";
import Nico from "../assets/images/Nico.png";
import AzuraBlaze from "../assets/images/Azura_Blaze.png";
import ChromaBot from "../assets/images/Chroma_Bot.png";
import SunnyPaws from "../assets/images/Sunny_Paws.png";
import RockingWhiskers from "../assets/images/Rocking_Whiskers.png";
import MuscleMoo from "../assets/images/Muscle_Moo.png";
import { NFT } from "../App";

interface Props {
    nftIndex: NFT | null;
    setNFTIndex: React.Dispatch<React.SetStateAction<NFT | null>>;
}

function NFTSRow(props: Props) {
    return (
        <div className="flex mx-16 mt-8">
            <ImageCard
                title="Nico"
                imageSource={Nico}
                isSelected={props.nftIndex == NFT.Nico}
                onClick={() => {
                    props.setNFTIndex(NFT.Nico);
                }}
            />
            <ImageCard
                title="Azura Blaze"
                imageSource={AzuraBlaze}
                isSelected={props.nftIndex == NFT.AzuraBlaze}
                onClick={() => {
                    props.setNFTIndex(NFT.AzuraBlaze);
                }}
            />
            <ImageCard
                title="Chroma Bot"
                imageSource={ChromaBot}
                isSelected={props.nftIndex == NFT.ChromaBot}
                onClick={() => {
                    props.setNFTIndex(NFT.ChromaBot);
                }}
            />
            <ImageCard
                title="Sunny Paws"
                imageSource={SunnyPaws}
                isSelected={props.nftIndex == NFT.SunnyPaws}
                onClick={() => {
                    props.setNFTIndex(NFT.SunnyPaws);
                }}
            />
            <ImageCard
                title="Rocking Whiskers"
                imageSource={RockingWhiskers}
                isSelected={props.nftIndex == NFT.RockingWhiskers}
                onClick={() => {
                    props.setNFTIndex(NFT.RockingWhiskers);
                }}
            />
            <ImageCard
                title="Muscle Moo"
                imageSource={MuscleMoo}
                isSelected={props.nftIndex == NFT.MuscleMoo}
                onClick={() => {
                    props.setNFTIndex(NFT.MuscleMoo);
                }}
            />
        </div>
    );
}

export default NFTSRow;
