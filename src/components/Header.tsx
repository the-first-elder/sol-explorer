import React, { useState } from "react";
import SolanaInfo from "./fetchTransactions";

const Header: React.FC = () => {
  const [address, setAddress] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  }


  return (
    <header className="bg-blue-900 text-white p-4 flex flex-col md:flex-row items-center justify-between w-full rounded">
      <div className="text-2xl font-bold">Sol-eX</div>
      <input
        type="text"
        value={address}
        placeholder="Search Addresses, Objects, Transactions, Epochs"
        className="w-full max-w-lg mt-2 md:mt-0 p-2 rounded"
        onChange={handleInputChange}
      />
      <SolanaInfo address={address} />
      <nav className="flex flex-wrap items-center gap-4 mt-2 md:mt-0">
        <a href="#" className="hover:underline">
          Validators
        </a>
        <a href="#" className="hover:underline">
          Modules
        </a>
        <a href="#" className="hover:underline">
          Coins
        </a>
        <a href="#" className="hover:underline">
          NFTs
        </a>
        <a href="#" className="hover:underline">
          Apps
        </a>
      </nav>
      <div className="mt-2 md:mt-0">Mainnet</div>
    </header>
  );
};

export default Header;
