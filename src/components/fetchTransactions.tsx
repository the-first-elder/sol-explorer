/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/SolanaInfo.tsx

import React, { useEffect, useState } from 'react';
import * as solanaWeb3 from '@solana/web3.js';

type Transaction = {
    slot: number;
    transaction: any;
    meta: any;
};

type AddressInfo = {
    transactionList: Transaction[];
    accountBalance: number;
};

// Define the interface for the component's props
interface SolanaInfoProps {
    address: string;
}

const SolanaInfo: React.FC<SolanaInfoProps> = ({ address }) => {
    const [data, setData] = useState<AddressInfo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (address) {
            fetchSolanaInfo();
        }
    }, [address]); // Fetch data whenever the address changes

    const fetchSolanaInfo = async () => {
        setLoading(true);
        setError(null);

        try {
            const pubKey = new solanaWeb3.PublicKey(address);
            const connection = new solanaWeb3.Connection('https://solana-mainnet.g.alchemy.com/v2/aleYeT5BI1MFFXJw37SiYu_FdeYMaMqb');

            // Fetch account balance
            const accountBalance = await connection.getBalance(pubKey);

            // Fetch transaction signatures
            const transactionSignatures = await connection.getSignaturesForAddress(pubKey, {
                limit: 5, // Fetch last 5 transactions
            });

            // Fetch transaction details
            const transactionList = await Promise.all(
                transactionSignatures.map(async (signatureInfo) => {
                    const transaction = await connection.getParsedTransaction(signatureInfo.signature);
                    return transaction; // Parsed transaction
                })
            ).then(results => results.filter(tx => tx !== null) as solanaWeb3.ParsedTransactionWithMeta[]);

            setData({
                accountBalance,
                transactionList,
            });
        } catch (err) {
            setError('Failed to fetch Solana data. Please check the address and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : data ? (
                <div>
                    <h2>Account Balance: {data.accountBalance} Lamports</h2>
                    <h3>Recent Transactions:</h3>
                    <ul>
                        {data.transactionList.map((tx, index) => (
                            <li key={index}>
                                <p>Slot: {tx.slot}</p>
                                <pre>{JSON.stringify(tx.transaction, null, 2)}</pre>
                                <pre>{JSON.stringify(tx.meta, null, 2)}</pre>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Enter a Solana address to get information</p>
            )}
        </div>
    );
};

export default SolanaInfo;
