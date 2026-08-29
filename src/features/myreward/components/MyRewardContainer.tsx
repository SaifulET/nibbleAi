"use client";

import { useState, useEffect } from "react";
import Header from "../../homepage/components/Header";
import Footer from "../../homepage/components/Footer";
import PendingRebatesCard from "./PendingRebatesCard";
import EarnMoreCard from "./EarnMoreCard";
import ReceiptHistoryCard from "./ReceiptHistoryCard";
import ActivityHistoryCard from "./ActivityHistoryCard";
import InviteFriendsCard from "./InviteFriendsCard";
import UploadReceiptCard from "./UploadReceiptCard";
import ReviewChatModal from "./ReviewChatModal";
import InviteFriendsModal from "./InviteFriendsModal";

interface MyRewardContainerProps {
  onTabChange: (tab: "offer" | "wallet" | "scan" | "profile" | "brand" | "notification", extra?: string) => void;
  autoOpenReviewItem?: string | null;
  onClearAutoOpenReview?: () => void;
}

interface Receipt {
  title: string;
  date: string;
  status: "Verified" | "Pending" | "Rejected";
}

interface Activity {
  id: string;
  type: "verified" | "pending" | "rejected" | "referral";
  title: string;
  subtitle: string;
  statusText: string;
  statusColor: string;
  iconBg: string;
  iconSrc: string;
}

export default function MyRewardContainer({
  onTabChange,
  autoOpenReviewItem,
  onClearAutoOpenReview,
}: MyRewardContainerProps) {
  const [activeReviewItem, setActiveReviewItem] = useState<string | null>(null);

  useEffect(() => {
    if (autoOpenReviewItem) {
      const timer = setTimeout(() => {
        setActiveReviewItem(autoOpenReviewItem);
        onClearAutoOpenReview?.();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [autoOpenReviewItem, onClearAutoOpenReview]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  
  const [receipts, setReceipts] = useState<Receipt[]>([
    { title: "Noosa 50$ Rebates", date: "Apr 2,2025", status: "Verified" },
    { title: "Noosa 50$ Rebates", date: "Apr 2,2025", status: "Pending" },
    { title: "Noosa 50$ Rebates", date: "Apr 2,2025", status: "Rejected" },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "act-1",
      type: "verified",
      title: "Rebate Verified- $1.00 added to wallet",
      subtitle: "Whole Foods Market- Apr 2,2025",
      statusText: "Verified",
      statusColor: "text-[#00A671]",
      iconBg: "#00D855",
      iconSrc: "/myreward/tick-02.svg",
    },
    {
      id: "act-2",
      type: "pending",
      title: "Receipt Pending Review",
      subtitle: "Whole Foods Market- Apr 2,2025",
      statusText: "Pending",
      statusColor: "text-[#D7930A]",
      iconBg: "#FF9400",
      iconSrc: "/myreward/watch-01.svg",
    },
    {
      id: "act-3",
      type: "rejected",
      title: "Review Rejected- $1.00",
      subtitle: "Whole Foods Market- Apr 2,2025",
      statusText: "Rejected",
      statusColor: "text-[#FF5C5C]",
      iconBg: "transparent",
      iconSrc: "/myreward/star.svg",
    },
    {
      id: "act-4",
      type: "referral",
      title: "Referral Bonus $5.00 Added",
      subtitle: "Your friend completed their first review!",
      statusText: "Bonus Earned",
      statusColor: "text-[#4E31E3]",
      iconBg: "#4E31E3",
      iconSrc: "/myreward/user-circle-02.svg",
    },
  ]);

  const handleUploadSuccess = (fileName: string) => {
    // Append mock data to receipt list
    const newReceipt: Receipt = { title: `${fileName.split(".")[0]} Rebate`, date: "Today", status: "Pending" };
    setReceipts((prev) => [newReceipt, ...prev]);

    // Append mock activity
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: "pending",
      title: "Receipt Upload Pending Review",
      subtitle: "Uploaded via file manager- Today",
      statusText: "Pending",
      statusColor: "text-[#D7930A]",
      iconBg: "#FF9400",
      iconSrc: "/myreward/watch-01.svg",
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const handleReviewSubmit = (summaryText: string) => {
    setActiveReviewItem(null);
    
    // Append review rebate success
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: "verified",
      title: `Review Approved- $1.00 added to wallet`,
      subtitle: `Feedback submitted: "${summaryText.substring(0, 30)}..."`,
      statusText: "Verified",
      statusColor: "text-[#00A671]",
      iconBg: "#00D855",
      iconSrc: "/myreward/tick-02.svg",
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  return (
    <div className="w-full bg-[#FEFEFE] min-h-screen flex flex-col font-sans select-none">
      <Header activeTab="scan" onTabChange={onTabChange} />

      <main className="flex-grow flex flex-col items-center py-10 px-4 sm:px-6 max-w-[1440px] mx-auto w-full relative">
        <h1 className="text-[32px] font-medium leading-[39px] text-[#1F1D1D] text-center mb-10 mt-4">
          Your Rewards Hub
        </h1>

        {/* Content Layout stack (Frame 2147229211) */}
        <div className="w-full max-w-[669px] flex flex-col items-center gap-[26px] pb-10">
          <PendingRebatesCard onUploadReceiptClick={() => {
            const el = document.getElementById("upload-receipt-section");
            el?.scrollIntoView({ behavior: "smooth" });
          }} />
          
          <EarnMoreCard onStartReviewClick={(item) => setActiveReviewItem(item)} />
          
          <ReceiptHistoryCard receipts={receipts} />
          
          <ActivityHistoryCard
            activities={activities}
            onViewFullHistoryClick={() => {}}
          />
          
          <InviteFriendsCard onInviteClick={() => setIsInviteModalOpen(true)} />
          
          <div id="upload-receipt-section" className="w-full max-w-[667px]">
            <UploadReceiptCard
              onUploadStart={() => console.log("Upload started...")}
              onUploadSuccess={handleUploadSuccess}
            />
          </div>
        </div>
      </main>

      <Footer onTabChange={onTabChange} />

      {activeReviewItem && (
        <ReviewChatModal
          itemName={activeReviewItem}
          onClose={() => setActiveReviewItem(null)}
          onSubmit={handleReviewSubmit}
        />
      )}

      {isInviteModalOpen && (
        <InviteFriendsModal
          onClose={() => setIsInviteModalOpen(false)}
          onSend={(name, contact) => {
            setIsInviteModalOpen(false);
            const newActivity: Activity = {
              id: `act-${Date.now()}`,
              type: "referral",
              title: `Referral Invited: ${name}`,
              subtitle: `Invitation link sent to ${contact}`,
              statusText: "Pending",
              statusColor: "text-[#D7930A]",
              iconBg: "#4E31E3",
              iconSrc: "/myreward/user-circle-02.svg",
            };
            setActivities((prev) => [newActivity, ...prev]);
          }}
        />
      )}
    </div>
  );
}
