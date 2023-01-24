import { networks } from "../constants/networks";

const { ethereum } = window as any;

function SwitchNetworkButton() {
    async function handleOnSwitch() {
        try {
            await ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: `0x${Number(5).toString(16)}` }],
            });
        } catch (switchError: any) {
            // * This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                ...networks.goerli,
                            },
                        ],
                    });
                } catch (error) {}
            }
        }
    }

    return (
        <button
            onClick={handleOnSwitch}
            className="bg-gradient-to-r from-[#60c657] to-[#35aee2] px-8 py-4 text-lg text-white font-bold rounded-lg"
        >
            Switch to Goerli
        </button>
    );
}

export default SwitchNetworkButton;
