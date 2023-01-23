import pinataSDK from "@pinata/sdk";
import fs from "fs";

const pinata: pinataSDK = new pinataSDK(
    process.env.PINATA_API_KEY,
    process.env.PINATA_API_SECRET
);

const metadataTemplate = {
    name: "",
    description: "",
    image: "",
    attributes: [
        {
            trait_type: "Base",
            value: "Dog",
        },
        {
            trait_type: "Eyes",
            value: "Big",
        },
        {
            trait_type: "Cuteness",
            value: 100,
        },
        {
            trait_type: "Personality",
            value: "Shy",
        },
        {
            trait_type: "Level",
            value: 10,
        },
    ],
};

async function updateMetadata(): Promise<void> {
    let nftMetadata = { ...metadataTemplate };

    // * specify the name of you nft here
    nftMetadata.name = "";
    // * write the description about your nft.
    nftMetadata.description = "";

    // * give the nft IpfsHash generated from update-image-to-pinata.ts script.
    const ipfsHash: string = "";
    if (ipfsHash == "") {
        console.log("Please specify the ipfs hash of your nft image.");
        return;
    }
    nftMetadata.image = `ipfs://${ipfsHash}`;
    // * metadata is specified in the template above, you can update it.

    // * upload metadata to pinata
    try {
        const response = await pinata.pinJSONToIPFS(nftMetadata, {
            pinataMetadata: { name: "" },
        });
        console.log(response);
        // * You need to copy the `IpfsHash` from the response for later use or you can also get it from the your pinata dashboard.
    } catch (error) {
        console.log(error);
    }
}

updateMetadata()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
