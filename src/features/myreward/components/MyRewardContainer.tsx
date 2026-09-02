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
import { useConsumerApiStore } from "@/stores/useConsumerApiStore";

interface MyRewardContainerProps {
  onTabChange: (tab: "offer" | "wallet" | "scan" | "profile" | "brand" | "notification", extra?: string) => void;
  autoOpenReviewItem?: string | null;
  autoUploadReservationId?: string | null;
  onClearAutoOpenReview?: () => void;
  onClearAutoUploadReservation?: () => void;
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
  autoUploadReservationId,
  onClearAutoOpenReview,
  onClearAutoUploadReservation,
}: MyRewardContainerProps) {
  const [activeReviewItem, setActiveReviewItem] = useState<string | null>(null);
  const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const {
    receipts: apiReceipts,
    activities: apiActivities,
    reservations,
    reviewOpportunities,
    unreadCount,
    status,
    loadRewardsHub,
    uploadReceipt,
    inviteFriend,
  } = useConsumerApiStore();
  const latestError = useConsumerApiStore((state) => state.error);

  useEffect(() => {
    void loadRewardsHub();
  }, [loadRewardsHub]);

  useEffect(() => {
    if (autoOpenReviewItem) {
      const timer = setTimeout(() => {
        setActiveReviewItem(autoOpenReviewItem);
        onClearAutoOpenReview?.();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [autoOpenReviewItem, onClearAutoOpenReview]);

  useEffect(() => {
    if (!autoUploadReservationId) return;

      const timer = setTimeout(() => {
        setSelectedReservationId(autoUploadReservationId);
        setUploadError(null);
        setUploadMessage(null);
        document.getElementById("upload-receipt-section")?.scrollIntoView({ behavior: "smooth" });
        onClearAutoUploadReservation?.();
    }, 0);

    return () => clearTimeout(timer);
  }, [autoUploadReservationId, onClearAutoUploadReservation]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  
  const [localReceipts] = useState<Receipt[]>([]);
  const [localActivities, setLocalActivities] = useState<Activity[]>([]);

  const receipts: Receipt[] = apiReceipts.length
    ? apiReceipts.map((receipt) => ({
        title: String(receipt.campaign_name || receipt.merchant || "Receipt"),
        date: String(receipt.created_at || "").slice(0, 10),
        status:
          receipt.status === "verified"
            ? "Verified"
            : receipt.status === "rejected"
              ? "Rejected"
              : "Pending",
      }))
    : localReceipts;

  const activities: Activity[] = apiActivities.length
    ? apiActivities.map((activity) => ({
        id: String(activity.id || activity.created_at || activity.title || "activity"),
        type: activity.entry_type === "credit" ? "verified" as const : "pending" as const,
        title: String(activity.title || activity.description || "Activity"),
        subtitle: String(activity.created_at || "").slice(0, 10),
        statusText: String(activity.category || activity.entry_type || "Activity"),
        statusColor: activity.entry_type === "credit" ? "text-[#00A671]" : "text-[#D7930A]",
        iconBg: activity.entry_type === "credit" ? "#00D855" : "#FF9400",
        iconSrc: activity.entry_type === "credit" ? "/myreward/tick-02.svg" : "/myreward/watch-01.svg",
      }))
    : localActivities;

  const handleUploadSuccess = async (file: File) => {
    const reservationId = selectedReservationId || String(reservations[0]?.id || "");
    if (!reservationId) {
      setUploadError("Select a pending reward before uploading a receipt.");
      setUploadMessage(null);
      return;
    }

    try {
      setUploadError(null);
      setUploadMessage(null);
      const receipt = await uploadReceipt(reservationId, file);
      const responseMessage = String(receipt.detail || receipt.message || "");
      setUploadMessage(responseMessage || "Receipt uploaded. Verification is in progress.");
      setSelectedReservationId(null);
    } catch (error) {
      const backendMessage = useConsumerApiStore.getState().error;
      setUploadError(backendMessage || (error instanceof Error ? error.message : "Receipt upload failed."));
      setUploadMessage(null);
    }
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
    setLocalActivities((prev) => [newActivity, ...prev]);
  };

  return (
    <div className="w-full bg-[#FEFEFE] min-h-screen flex flex-col font-sans select-none">
      <Header activeTab="scan" onTabChange={onTabChange} unreadCount={unreadCount} />

      <main className="flex-grow flex flex-col items-center py-10 px-4 sm:px-6 max-w-[1440px] mx-auto w-full relative">
        <h1 className="text-[32px] font-medium leading-[39px] text-[#1F1D1D] text-center mb-10 mt-4">
          Your Rewards Hub
        </h1>

        {/* Content Layout stack (Frame 2147229211) */}
        <div className="w-full max-w-[669px] flex flex-col items-center gap-[26px] pb-10">
          <PendingRebatesCard onUploadReceiptClick={(reservationId) => {
            setSelectedReservationId(reservationId);
            setUploadError(null);
            setUploadMessage(null);
            const el = document.getElementById("upload-receipt-section");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          reservations={reservations}
          selectedReservationId={selectedReservationId}
          selectedMessage={uploadError || uploadMessage}
          selectedMessageTone={uploadError ? "error" : "success"}
          />
          
          <EarnMoreCard opportunities={reviewOpportunities} onStartReviewClick={(item) => setActiveReviewItem(item)} />
          
          <ReceiptHistoryCard receipts={receipts} />
          
          <ActivityHistoryCard
            activities={activities}
            onViewFullHistoryClick={() => {}}
          />
          
          <InviteFriendsCard onInviteClick={() => setIsInviteModalOpen(true)} />
          
          <div id="upload-receipt-section" className="w-full max-w-[667px]">
            <UploadReceiptCard
              onUploadStart={() => {
                setUploadError(null);
                setUploadMessage(null);
              }}
              onUploadSuccess={handleUploadSuccess}
            />
            {(uploadError || uploadMessage || (status === "error" && latestError && latestError !== uploadError)) && (
              <p className={`mt-3 text-center text-sm font-medium ${uploadError || status === "error" ? "text-red-500" : "text-[#00A671]"}`}>
                {uploadError || uploadMessage || latestError}
              </p>
            )}
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
            void inviteFriend(name, contact);
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
            setLocalActivities((prev) => [newActivity, ...prev]);
          }}
        />
      )}
    </div>
  );
}
