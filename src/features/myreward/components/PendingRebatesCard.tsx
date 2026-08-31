"use client";

import Image from "next/image";

interface PendingRebatesCardProps {
  reservations?: Record<string, unknown>[];
  onUploadReceiptClick: () => void;
}

export default function PendingRebatesCard({ reservations = [], onUploadReceiptClick }: PendingRebatesCardProps) {
  return (
    <section className="w-full max-w-[669px] bg-[#FEFEFE] shadow-[0px_4px_8px_rgba(0,0,0,0.25)] rounded-[12px] p-6 sm:py-[12px] sm:px-[18px] flex flex-col gap-[7px] border border-gray-100">
      {/* Title block (Frame 2147229169) */}
      <div className="flex items-center gap-[6px] h-6">
        <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center relative">
          <Image
            src="/myreward/watch-01.svg"
            alt="watch-icon"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <span className="text-[18px] font-medium leading-[22px] text-[#2D2D2D]">
          Pending Rebates
        </span>
      </div>

      {reservations.length ? reservations.slice(0, 3).map((reservation) => (
        <div key={String(reservation.id)} className="w-full h-[49px] border-b border-[#E0E0E0] flex items-center justify-between py-[10px] gap-4">
          <span className="text-[14px] font-normal leading-[17px] text-[#1F1D1D] truncate">
            {String(reservation.campaign_name || reservation.product_name || "Pending rebate")}
          </span>
          <button
            onClick={onUploadReceiptClick}
            className="w-[114px] h-[29px] bg-[#3E3EDF] text-white text-[14px] font-normal rounded-[4px] hover:bg-[#3232c7] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center flex-shrink-0"
          >
            Upload Receipt
          </button>
        </div>
      )) : (
        <div className="w-full min-h-[49px] border-b border-[#E0E0E0] flex items-center py-[10px]">
          <span className="text-[14px] font-normal leading-[17px] text-[#575757]">
            No active rebate claims from the backend.
          </span>
        </div>
      )}

      {/* Bottom Description */}
      <span className="text-[12px] font-normal leading-[15px] text-[#575757] mt-1">
        Upload receipts to complete pending rebate offers.
      </span>
    </section>
  );
}
