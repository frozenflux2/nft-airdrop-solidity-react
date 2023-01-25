import { useEffect, useState } from "react";
import MerkleTree from "merkletreejs";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi } from "../constants";
import { NFT } from "../App";
import { useNotification } from "@web3uikit/core";
import { ContractTransaction } from "ethers";
import { AiFillBell } from "react-icons/ai";
import { keccak256 } from "ethers/lib/utils";

interface Props {
    nftContractAddress: string;
    nftIndex: NFT | null;
    treeInstance: MerkleTree | null;
}

function MintButton(props: Props) {
    const dispatch = useNotification();
    const { account } = useMoralis();

    const [proof, setProof] = useState<string[] | undefined>();

    useEffect(() => {
        (async () => {
            generateProof();
        })();
    }, [account]);

    const { runContractFunction: preMintNFT } = useWeb3Contract({
        abi: abi,
        contractAddress: props.nftContractAddress,
        functionName: "preMintNFT",
        params: {
            _proof: proof,
            _tokenUriIndex: props.nftIndex,
        },
    });

    async function generateProof() {
        if (account != null) {
            const hashAddress = keccak256(account?.toString());
            const proof = props.treeInstance?.getHexProof(hashAddress);

            if (proof != undefined) {
                setProof(proof);
            }
        }
    }

    async function handleOnPreMint() {
        if (props.nftIndex == null) {
            dispatch({
                type: "warning",
                title: "NFT Selection Error",
                message:
                    "No NFT has been selected for this transaction. Please make sure to select an NFT before proceeding with the transaction.",
                icon: <AiFillBell />,
                position: "topR",
            });
            return;
        }

        await preMintNFT({
            onSuccess: (tx) => handleSuccess(tx as ContractTransaction),
            onError: (error) => {
                handleErrors(error);
            },
        });
    }

    async function handleSuccess(tx: ContractTransaction): Promise<void> {
        await tx.wait(1);
        dispatch({
            type: "success",
            title: "NFT Minting Successful",
            message:
                " Your NFT has been minted successfully and is now available for use.",
            icon: <AiFillBell />,
            position: "topR",
        });
    }

    function handleErrors(error: Error) {
        if (error.message.includes("User denied transaction signature.")) {
            showErrorNotification(
                "Permission Denied",
                "User denied transaction signature."
            );
        } else if (error.message.toLowerCase().includes("nonce too high")) {
            showErrorNotification("Invalid Nonce", "Reset your Metamask.");
        } else if (error.message.includes("Internal JSON-RPC error.")) {
            showErrorNotification(
                "Transaction Failed",
                "We apologize for the inconvenience. Please check the details of your transaction and try again."
            );
        } else {
            showErrorNotification(error.name, error.message);
        }
    }

    function showErrorNotification(title: string, message: string) {
        dispatch({
            type: "error",
            title: title,
            message: message,
            icon: <AiFillBell />,
            position: "topR",
        });
    }

    return (
        <button
            onClick={handleOnPreMint}
            className="bg-gradient-to-r from-[#60c657] to-[#35aee2] px-24 py-4 text-xl text-white font-bold rounded-lg"
        >
            Mint
        </button>
    );
}

export default MintButton;
