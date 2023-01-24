import { useMoralis } from "react-moralis";
import "./App.css";
import { contractAddresses } from "./constants";
import { useEffect } from "react";
import { ConnectButton } from "@web3uikit/web3";
import NFTSRow from "./Components/NFTSRow";
import MintButton from "./Components/MintButton";
import SwitchNetworkButton from "./Components/SwitchNetworkButton";

interface contractAddressesInterface {
    [key: string]: string[];
}

function App() {
    const addresses: contractAddressesInterface = contractAddresses;
    const { isWeb3Enabled, chainId: chainIdHex, Moralis } = useMoralis();
    const chainId: string = parseInt(chainIdHex!).toString();
    const nftContractAddress =
        chainId in addresses ? addresses[chainId][0] : null;

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
            <NFTSRow />
            <div className="mt-16 text-white">
                {isWeb3Enabled ? (
                    nftContractAddress ? (
                        <MintButton />
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
