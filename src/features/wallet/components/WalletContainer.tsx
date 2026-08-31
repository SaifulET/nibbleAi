"use client";

import { useEffect, useState } from "react";
import Header from "../../homepage/components/Header";
import Footer from "../../homepage/components/Footer";
import WalletCardSection from "./WalletCardSection";
import RecentRewardsCard from "./RecentRewardsCard";
import WithdrawFundsModal from "./WithdrawFundsModal";
import BankDetailsModal from "./BankDetailsModal";
import { useConsumerApiStore } from "@/stores/useConsumerApiStore";

interface WalletContainerProps {
  onTabChange: (tab: "offer" | "wallet" | "scan" | "profile" | "brand" | "notification", extra?: string) => void;
}

export default function WalletContainer({ onTabChange }: WalletContainerProps) {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const { wallet, redemptions, unreadCount, loadWallet, createPayoutMethod, requestWithdrawal } = useConsumerApiStore();

  useEffect(() => {
    void loadWallet();
  }, [loadWallet]);

  const available = Number(wallet?.available ?? wallet?.balance ?? 0);

  return (
    <div className="w-full bg-[#FEFEFE] min-h-screen flex flex-col font-sans select-none">
      <Header activeTab="wallet" onTabChange={onTabChange} unreadCount={unreadCount} />

      <main className="flex-grow flex flex-col items-center py-10 px-4 sm:px-6 max-w-[1440px] mx-auto w-full gap-8">
        <WalletCardSection
          balance={available}
          onWithdrawClick={() => setIsWithdrawModalOpen(true)}
          onHistoryClick={() => {
            const el = document.getElementById("wallet-history-section");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />
        
        <div id="wallet-history-section" className="w-full flex justify-center mt-2">
          <RecentRewardsCard redemptions={redemptions} />
        </div>
      </main>

      <Footer onTabChange={onTabChange} />

      {isWithdrawModalOpen && (
        <WithdrawFundsModal
          amount={available}
          onClose={() => setIsWithdrawModalOpen(false)}
          onConfirm={() => {
            setIsWithdrawModalOpen(false);
            setIsBankModalOpen(true);
          }}
        />
      )}

      {isBankModalOpen && (
        <BankDetailsModal
          onClose={() => setIsBankModalOpen(false)}
          onSubmit={(details) => {
            setIsBankModalOpen(false);
            void createPayoutMethod("paypal", details.accountNumber || details.accountName)
              .then((method) => requestWithdrawal(String(method.id), String(available)));
          }}
        />
      )}
    </div>
  );
}
