"use client";

import { useState } from "react";

interface BankDetailsModalProps {
  onClose: () => void;
  onSubmit: (details: {
    accountName: string;
    bankName: string;
    branchName: string;
    accountNumber: string;
    routingNumber: string;
    accountType: string;
  }) => void;
}

export default function BankDetailsModal({ onClose, onSubmit }: BankDetailsModalProps) {
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountType, setAccountType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !accountName.trim() ||
      !bankName.trim() ||
      !branchName.trim() ||
      !accountNumber.trim() ||
      !routingNumber.trim() ||
      !accountType.trim()
    ) {
      return;
    }
    onSubmit({
      accountName,
      bankName,
      branchName,
      accountNumber,
      routingNumber,
      accountType,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto select-none">
      {/* Frame 2147229125 */}
      <div className="w-full max-w-[608px] my-8 bg-[#FEFEFE] border border-[#E0E0E0] shadow-[0px_4px_4px_rgba(0,0,0,0.08)] rounded-[12px] p-6 sm:p-8 relative flex flex-col gap-6 animate-scale-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer focus:outline-none"
        >
          &times;
        </button>

        {/* Header Title */}
        <h2 className="text-[24px] font-semibold leading-[29px] text-[#1F1D1D] w-full border-b border-gray-100 pb-2">
          Enter Bank Details
        </h2>

        {/* Form Details Grid */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          
          {/* Account Holder Name */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-[16px] font-medium leading-[24px] text-[#1F1D1D]">
              Account Holder Name
            </label>
            <div className="w-full h-[50px] bg-[#FEFEFE] border border-[#959595] rounded-[8px] flex items-center px-4">
              <input
                type="text"
                placeholder="Name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                required
                className="w-full bg-transparent border-none text-[#1F1D1D] placeholder-[#737373] text-[14px] font-normal leading-[17px] focus:outline-none"
              />
            </div>
          </div>

          {/* Bank Name */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-[16px] font-medium leading-[24px] text-[#1F1D1D]">
              Bank Name
            </label>
            <div className="w-full h-[50px] bg-[#FEFEFE] border border-[#959595] rounded-[8px] flex items-center px-4">
              <input
                type="text"
                placeholder="ABC Bank"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                required
                className="w-full bg-transparent border-none text-[#1F1D1D] placeholder-[#737373] text-[14px] font-normal leading-[17px] focus:outline-none"
              />
            </div>
          </div>

          {/* Branch Name (Ignored repetitive field, only rendering one) */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-[16px] font-medium leading-[24px] text-[#1F1D1D]">
              Branch Name
            </label>
            <div className="w-full h-[50px] bg-[#FEFEFE] border border-[#959595] rounded-[8px] flex items-center px-4">
              <input
                type="text"
                placeholder="ABC Branch"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                required
                className="w-full bg-transparent border-none text-[#1F1D1D] placeholder-[#737373] text-[14px] font-normal leading-[17px] focus:outline-none"
              />
            </div>
          </div>

          {/* Account Number */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-[16px] font-medium leading-[24px] text-[#1F1D1D]">
              Account Number
            </label>
            <div className="w-full h-[50px] bg-[#FEFEFE] border border-[#959595] rounded-[8px] flex items-center px-4">
              <input
                type="text"
                placeholder="12345"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
                className="w-full bg-transparent border-none text-[#1F1D1D] placeholder-[#737373] text-[14px] font-normal leading-[17px] focus:outline-none"
              />
            </div>
          </div>

          {/* Routing Number */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-[16px] font-medium leading-[24px] text-[#1F1D1D]">
              Routing Number
            </label>
            <div className="w-full h-[50px] bg-[#FEFEFE] border border-[#959595] rounded-[8px] flex items-center px-4">
              <input
                type="text"
                placeholder="12345"
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value)}
                required
                className="w-full bg-transparent border-none text-[#1F1D1D] placeholder-[#737373] text-[14px] font-normal leading-[17px] focus:outline-none"
              />
            </div>
          </div>

          {/* Account Type */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-[16px] font-medium leading-[24px] text-[#1F1D1D]">
              Account Type
            </label>
            <div className="w-full h-[50px] bg-[#FEFEFE] border border-[#959595] rounded-[8px] flex items-center px-4">
              <input
                type="text"
                placeholder="savings/Current"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                required
                className="w-full bg-transparent border-none text-[#1F1D1D] placeholder-[#737373] text-[14px] font-normal leading-[17px] focus:outline-none"
              />
            </div>
          </div>

          {/* Submit CTA Large */}
          <button
            type="submit"
            className="w-full h-[54px] bg-gradient-to-r from-[#3E3EDF] to-[#3E3EDF] hover:bg-[#3232c7] active:scale-[0.99] transition-all text-white text-[18px] font-medium rounded-[8px] flex items-center justify-center cursor-pointer focus:outline-none shadow-[0px_4px_4px_rgba(0,0,0,0.12),_inset_0px_4px_4px_rgba(255,255,255,0.12)] mt-4"
          >
            Submit Withdraw Request
          </button>

        </form>
      </div>
    </div>
  );
}
