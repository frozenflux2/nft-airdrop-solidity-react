import { useMoralis } from "react-moralis";
import "./App.css";
import { contractAddresses } from "./constants";
import { useEffect, useState } from "react";
import { ConnectButton } from "@web3uikit/web3";
import NFTSRow from "./Components/NFTSRow";
import MintButton from "./Components/MintButton";
import SwitchNetworkButton from "./Components/SwitchNetworkButton";
import { generateMerkleTree } from "./utils/generate-merkle-tree";
import MerkleTree from "merkletreejs";

interface contractAddressesInterface {
    [key: string]: string[];
}

export enum NFT {
    Nico,
    AzuraBlaze,
    ChromaBot,
    SunnyPaws,
    RockingWhiskers,
    MuscleMoo,
}

function App() {
    const addresses: contractAddressesInterface = contractAddresses;
    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
    const chainId: string = parseInt(chainIdHex!).toString();
    const nftContractAddress =
        chainId in addresses ? addresses[chainId][0] : null;

    const [nftIndex, setNFTIndex] = useState<NFT | null>(null);
    const [tree, setTree] = useState<MerkleTree | null>(null);

    useEffect(() => {
        (async () => {
            if (tree == null) {
                const treeInstance = await generateMerkleTree();
                setTree(treeInstance);
            }
        })();
    }, []);

    useEffect(() => {}, [isWeb3Enabled]);

    return (
        <div className="flex flex-col justify-start items-center h-screen">
            <div className="flex items-center mt-12 w-full">
                <div className="w-1/3"></div>
                <h1 className="font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-r from-[rgb(96,198,87)] to-[#35aee2]">
                    Digital Critters
                </h1>
                <div className="ml-auto mr-8">
                    <ConnectButton />
                </div>
            </div>
            <h2 className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-[#60c657] to-[#35aee2] w-fit mt-4">
                NFT Collection
            </h2>
            <h3 className="w-fit text-white font-extrabold text-xl mt-8">
                Experience the Future of Collecting with our Unique and
                One-of-a-Kind NFT Digital Critters
            </h3>
            <NFTSRow nftIndex={nftIndex} setNFTIndex={setNFTIndex} />
            <div className="mt-16 text-white">
                {isWeb3Enabled ? (
                    nftContractAddress ? (
                        <MintButton
                            chainId={chainId}
                            nftContractAddress={nftContractAddress}
                            nftIndex={nftIndex}
                            setNFTIndex={setNFTIndex}
                            treeInstance={tree}
                        />
                    ) : (
                        <SwitchNetworkButton />
                    )
                ) : (
                    <p>Connect your Wallet first</p>
                )}
            </div>
        </div>
    );
}

export default App;
