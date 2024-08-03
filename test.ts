import { Connection } from '@solana/web3.js';

const connection = new Connection(
    "https://solana-mainnet.g.alchemy.com/v2/aleYeT5BI1MFFXJw37SiYu_FdeYMaMqb"
);

const fetchNodes = async () => {
    try {
        // Await the promise to get the cluster nodes
        const nodes = await connection.getClusterNodes();
        console.log(nodes);
    } catch (error) {
        console.error("Error fetching cluster nodes:", error);
    }
};

fetchNodes();
