"use client";

import Image from "next/image";
import { imageUrl } from "../lib/offerMappers";

interface PendingRewardsProps {
  reservations?: Record<string, unknown>[];
  reviewOpportunities?: Record<string, unknown>[];
  onUploadReceiptClick?: (reservationId: string) => void;
  onLeaveReviewClick?: (itemName: string) => void;
}

export default function PendingRewards({
  reservations = [],
  reviewOpportunities = [],
  onUploadReceiptClick,
  onLeaveReviewClick,
}: PendingRewardsProps) {
  const pendingReservation = reservations[0];
  const reviewOpportunity = reviewOpportunities[0];
  const pendingImage = imageUrl(
    pendingReservation?.product_image ||
      pendingReservation?.image ||
      pendingReservation?.campaign_image,
    ""
  );
  const reviewImage = imageUrl(
    reviewOpportunity?.product_image ||
      reviewOpportunity?.image ||
      reviewOpportunity?.campaign_image,
    ""
  );

  return (
    <div className="w-full max-w-[1137px] mx-auto font-sans flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-[24px] font-semibold leading-[29px] text-[#1F1D1D]">
        Your Pending Rewards
      </h2>

      {/* Cards list (Figma Frame 2147229293 layout width 760px on desktop) */}
      <div className="flex flex-wrap gap-8 items-center justify-center lg:justify-start">
        {pendingReservation ? (
        <div className="w-full max-w-[364px] h-[156px] bg-[#FEFEFE] shadow-[0px_2px_7.6px_rgba(0,0,0,0.12)] rounded-lg p-2 pl-3 flex gap-[12px] items-center border border-gray-50 flex-shrink-0">
          {/* Image (Rectangle 34628225) */}
          <div className="w-[100px] h-[111px] bg-gray-50 rounded-lg overflow-hidden relative flex-shrink-0">
            {pendingImage ? (
              <Image
                src={pendingImage}
                alt={String(pendingReservation.product_name || "Pending reward")}
                fill
                sizes="100px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center px-2 text-center text-[10px] text-gray-400">
                No image returned
              </div>
            )}
          </div>

          {/* Details (Frame 2147228498) */}
          <div className="flex-grow min-w-0 h-[140px] p-3 flex flex-col gap-4 justify-between">
            {/* Frame 2147228977 details */}
            <div className="w-full flex flex-col gap-1.5">
              {/* Brand & Expiry (Frame 2147228975) */}
              <div className="w-full h-[15px] flex justify-between items-center text-[12px] font-normal leading-[15px] text-[#4D4D4D]">
                <span className="truncate pr-1">{String(pendingReservation.brand_name || "Brand")}</span>
                <span className="flex-shrink-0">Expires {String(pendingReservation.expires_at || "").slice(0, 10)}</span>
              </div>

              {/* Title & Rating (Frame 2147229110) */}
              <div className="w-full flex flex-col gap-1">
                <h3 className="text-[16px] font-semibold leading-[19px] text-[#2D2D2D] truncate w-full">
                  {String(pendingReservation.product_name || pendingReservation.campaign_name || "Pending rebate")}
                </h3>
                
                {/* Rating (Frame 2147228493) */}
                <div className="w-full h-[20px] flex items-center gap-2 text-[14px] font-semibold leading-[17px] text-[#1F1D1D]">
                  <div className="w-[92px] h-[20px] flex items-center gap-1 flex-shrink-0">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <svg key={i} className="w-[20px] h-[20px] text-[#FF9F19] fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="truncate">{String(pendingReservation.reward_amount || "0.00")} reward</span>
                </div>
              </div>
            </div>

            {/* CTA Button (CTA Large) */}
            <button
              onClick={() => onUploadReceiptClick?.(String(pendingReservation.id || ""))}
              className="w-full max-w-[220px] h-[34px] bg-gradient-to-b from-[#3E3EDF] to-[#3E3EDF] hover:opacity-90 active:scale-[0.98] text-[#FEFEFE] text-[18px] font-medium leading-[22px] rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.12),inset_0_4px_4px_rgba(255,255,255,0.12)] flex items-center justify-center cursor-pointer focus:outline-none min-w-0"
            >
              Upload Receipt
            </button>
          </div>
        </div>
        ) : null}

        {reviewOpportunity ? (
        <div className="w-full max-w-[364px] h-[153px] bg-[#FEFEFE] shadow-[0px_2px_7.6px_rgba(0,0,0,0.12)] rounded-lg p-2 pl-3 flex gap-[12px] items-center border border-gray-50 flex-shrink-0">
          {/* Image */}
          <div className="w-[100px] h-[111px] bg-gray-50 rounded-lg overflow-hidden relative flex-shrink-0">
            {reviewImage ? (
              <Image
                src={reviewImage}
                alt={String(reviewOpportunity.product_name || "Review opportunity")}
                fill
                sizes="100px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center px-2 text-center text-[10px] text-gray-400">
                No image returned
              </div>
            )}
          </div>

          {/* Details (Frame 2147228499) */}
          <div className="flex-grow min-w-0 h-[137px] p-3 flex flex-col gap-4 justify-between">
            {/* Details sub block */}
            <div className="w-full flex flex-col gap-1.5">
              {/* Brand & Expiry (Frame 2147228975) */}
              <div className="w-full h-[15px] flex justify-between items-center text-[12px] font-normal leading-[15px] text-[#4D4D4D]">
                <span className="truncate pr-1">{String(reviewOpportunity.brand_name || "Brand")}</span>
                <span className="flex-shrink-0">Expires {String(reviewOpportunity.expires_at || "").slice(0, 10)}</span>
              </div>

              {/* Title & Bonus Review (Frame 2147229110) */}
              <div className="w-full flex flex-col gap-1">
                <h3 className="text-[16px] font-semibold leading-[19px] text-[#2D2D2D] truncate w-full">
                  {String(reviewOpportunity.product_name || "Review opportunity")}
                </h3>
                <span className="text-[14px] font-medium leading-[17px] text-[#2D2D2D] truncate">
                  Bonus Review
                </span>
              </div>
            </div>

            {/* CTA Button (CTA Large) */}
            <button
              onClick={() => onLeaveReviewClick?.(String(reviewOpportunity.product_name || reviewOpportunity.id || "Review opportunity"))}
              className="w-full max-w-[220px] h-[34px] bg-gradient-to-b from-[#FBDC40] to-[#FBDC40] hover:opacity-90 active:scale-[0.98] text-[#1F1D1D] text-[18px] font-medium leading-[22px] rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.12),inset_0_4px_4px_rgba(255,255,255,0.12)] flex items-center justify-center cursor-pointer focus:outline-none min-w-0"
            >
              Leave Review for ${String(reviewOpportunity.reward_amount || "1.00")}
            </button>
          </div>
        </div>
        ) : null}

        {!pendingReservation && !reviewOpportunity && (
          <div className="w-full rounded-lg border border-gray-100 bg-white p-6 text-sm text-gray-400 shadow-[0px_2px_7.6px_rgba(0,0,0,0.08)]">
            No pending rewards from the backend.
          </div>
        )}
      </div>
    </div>
  );
}
