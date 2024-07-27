/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/SolanaInfo.tsx

import React, { useEffect, useState } from "react";
import * as solanaWeb3 from "@solana/web3.js";
import Modal from "./Modal";
import { fromUnixTime, formatDistanceToNow } from "date-fns";

type ConfirmedSignatureInfo = {
  /** the transaction signature */
  signature: string;
  /** when the transaction was processed */
  slot: number;
  /** error, if any */
  err: any;
  /** memo associated with the transaction, if any */
  memo: string | null;
  /** The unix timestamp of when the transaction was processed */
  blockTime?: number | null;
  /** Cluster confirmation status, if available. Possible values: `processed`, `confirmed`, `finalized` */
  confirmationStatus?: any;
};

export type AddressInfo = {
  transactionSignatures: ConfirmedSignatureInfo[];
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
      const connection = new solanaWeb3.Connection(
        "https://solana-mainnet.g.alchemy.com/v2/aleYeT5BI1MFFXJw37SiYu_FdeYMaMqb"
      );

      // Fetch account balance
      const accountBalance = await connection.getBalance(pubKey);

      // Fetch transaction signatures
      const transactionSignatures = await connection.getSignaturesForAddress(
        pubKey,
        {
          limit: 8, // Fetch last 5 transactions
        }
      );

      setData({
        accountBalance,
        transactionSignatures,
      });
      setIsModalOpen(true);
      console.log(transactionSignatures);
      // Fetch transaction details
      // const transactionList = await Promise.all(
      //   transactionSignatures.map(async (signatureInfo) => {
      //     const transaction = await connection.getParsedTransaction(
      //       signatureInfo.signature
      //     );
      //     return transaction; // Parsed transaction
      //   })
      // ).then(
      //   (results) =>
      //     results.filter(
      //       (tx) => tx !== null
      //     ) as solanaWeb3.ParsedTransactionWithMeta[]
      // );
    } catch (err) {
      setError(
        "Failed to fetch Solana data. Please check the address and try again."
      );
  }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="ml-2 text-sm font-xl" style={{ color: "red" }}>
          {error}
        </p>
      ) : (
        <p>Enter a Solana address to get information</p>
      )}
      {data && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-2xl mb-4">Account Info</h2>
          <h3 className="text-xl mb-4">
            Sol Balance: {data.accountBalance / 1000000000} Sol
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-black">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Signature</th>
                  <th className="py-2 px-4 border">Slot</th>
                  <th className="py-2 px-4 border">Block Time</th>
                  <th className="py-2 px-4 border">Confirmation</th>
                </tr>
              </thead>
              <tbody>
                {data.transactionSignatures.map((tx, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4 border">
                      <a href={`https://solscan.io/tx/${tx.signature}`}>
                        {tx.signature.slice(0, 9)}...
                      </a>
                    </td>
                    <td className="py-2 px-4 border">{tx.slot}</td>
                    <td className="py-2 px-4 border">{formatDistanceToNow(fromUnixTime(tx.blockTime as number), {
                      includeSeconds: true,
                    })} ago </td>
                    <td className="py-2 px-4 border">
                      {tx.confirmationStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SolanaInfo;
