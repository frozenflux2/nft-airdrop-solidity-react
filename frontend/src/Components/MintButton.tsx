import { useEffect, useState } from "react";
import { generateMerkleTree } from "../utils/generate-merkle-tree";
import MerkleTree from "merkletreejs";

function MintButton() {
    const [tree, setTree] = useState<MerkleTree | null>(null);

    useEffect(() => {
        (async () => {
            const treeInstance = await generateMerkleTree();
            setTree(treeInstance);
            // alert("check");
        })();
    }, []);


    return (
        <button
            onClick={() => {}}
            className="bg-gradient-to-r from-[#60c657] to-[#35aee2] px-24 py-4 text-xl text-white font-bold rounded-lg"
        >
            Mint
        </button>
    );
}

export default MintButton;
