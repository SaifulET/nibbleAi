"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductOffer {
  id: number;
  brand: string;
  expires: string;
  title: string;
  rating: number;
  reviewsCount: number;
  discount: string;
  image: string;
  category: "Fashion" | "Food" | "Electronics";
}

const mockOffers: ProductOffer[] = [
  {
    id: 1,
    brand: "Beast By",
    expires: "2025-02-28",
    title: "Organic Popcorn",
    rating: 4.0,
    reviewsCount: 100,
    discount: "20% OFF",
    image: "/homepage/rewardImage.svg",
    category: "Food",
  },
  {
    id: 2,
    brand: "Starbucks",
    expires: "2025-01-30",
    title: "Happy Meal Deal",
    rating: 4.0,
    reviewsCount: 100,
    discount: "10% OFF",
    image: "/homepage/rewardImage.svg",
    category: "Food",
  },
  {
    id: 3,
    brand: "McDonald's",
    expires: "2025-01-30",
    title: "Discover Delicious",
    rating: 4.0,
    reviewsCount: 100,
    discount: "10% OFF",
    image: "/homepage/rewardImage.svg",
    category: "Food",
  },
];

interface RewardsSectionProps {
  onClaimOffer?: () => void;
  onViewOffer?: () => void;
}

export default function RewardsSection({ onClaimOffer, onViewOffer }: RewardsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(12); // Default active page 12 in figma description

  const categories = ["All", "Fashion", "Food", "Electronics"];

  const filteredOffers = activeFilter === "All"
    ? mockOffers
    : mockOffers.filter((offer) => offer.category === activeFilter);

  return (
    <div className="w-full max-w-[1137px] mx-auto font-sans flex flex-col gap-6">
      {/* Title & Filters Column */}
      <div className="flex flex-col items-start gap-4">
        {/* Title */}
        <h2 className="text-[24px] font-semibold leading-[29px] text-[#1F1D1D]">
          Your Rewards
        </h2>

        {/* Filter Categories (Frame 2147229006) */}
        <div className="flex items-center gap-[24px] overflow-x-auto py-1 scrollbar-none w-full">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            if (cat === "All") {
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`w-[39px] h-[27px] rounded-[36px] flex items-center justify-center text-xs font-normal transition-all cursor-pointer flex-shrink-0 focus:outline-none ${
                    isActive
                      ? "bg-[#3E3EDF] text-[#FEFEFE] shadow-[0_4px_4px_rgba(0,0,0,0.08)]"
                      : "bg-[#FEFEFE] text-[#575757] border border-[#707070] shadow-[0_4px_4px_rgba(0,0,0,0.08)]"
                  }`}
                >
                  All
                </button>
              );
            }
            if (cat === "Fashion") {
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`w-[79px] h-[27px] rounded-[36px] flex items-center justify-center text-xs font-normal transition-all cursor-pointer flex-shrink-0 focus:outline-none ${
                    isActive
                      ? "bg-[#3E3EDF] text-[#FEFEFE] shadow-[0_4px_4px_rgba(0,0,0,0.08)]"
                      : "bg-[#FEFEFE] text-[#575757] border border-[#707070] shadow-[0_4px_4px_rgba(0,0,0,0.08)]"
                  }`}
                >
                  Fashion
                </button>
              );
            }
            if (cat === "Food") {
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`w-[58px] h-[27px] rounded-[36px] flex items-center justify-center text-xs font-normal transition-all cursor-pointer flex-shrink-0 focus:outline-none ${
                    isActive
                      ? "bg-[#3E3EDF] text-[#FEFEFE] shadow-[0_4px_4px_rgba(0,0,0,0.08)]"
                      : "bg-[#FEFEFE] text-[#575757] border border-[#707070] shadow-[0_4px_4px_rgba(0,0,0,0.08)]"
                  }`}
                >
                  Food
                </button>
              );
            }
            // Electronics
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`w-[104px] h-[27px] rounded-[36px] flex items-center justify-center text-xs font-normal transition-all cursor-pointer flex-shrink-0 focus:outline-none ${
                  isActive
                    ? "bg-[#3E3EDF] text-[#FEFEFE] shadow-[0_4px_4px_rgba(0,0,0,0.08)]"
                    : "bg-[#FEFEFE] text-[#575757] border border-[#707070] shadow-[0_4px_4px_rgba(0,0,0,0.08)]"
                }`}
              >
                Electronics
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid (Frame 2147229128 layout) */}
      {filteredOffers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 text-gray-400">
          No rewards found in this category.
        </div>
      ) : (
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between gap-6 w-full">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="w-full sm:max-w-[335px] h-[320px] bg-[#FFFFFF] shadow-[0px_2px_4px_rgba(0,0,0,0.12)] rounded-[14px] flex flex-col relative overflow-hidden flex-shrink-0"
            >
              {/* Product Image Section (Mask group + Rectangle 34628211) */}
              <div className="w-full h-[180px] bg-[#D9D9D9] rounded-t-[10px] relative overflow-hidden flex-shrink-0">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  sizes="(max-w-[335px]) 100vw, 335px"
                  className="object-cover"
                />
                
                {/* Discount Badge */}
                <span className="absolute right-4 top-4 w-[64px] h-[30px] bg-[#E65353] shadow-[0px_4px_4px_rgba(0,0,0,0.12)] rounded-lg text-[#FEFEFE] text-[12px] font-medium leading-[15px] flex items-center justify-center z-10 select-none">
                  {offer.discount}
                </span>
              </div>

              {/* Card Body (Frame 2147228498) */}
              <div className="w-full h-[140px] p-3 flex flex-col gap-4 justify-between bg-white relative z-10">
                {/* Frame 2147228976 */}
                <div className="w-full flex flex-col gap-2">
                  {/* Brand & Expiry Row (Frame 2147228975) */}
                  <div className="w-full h-[15px] flex justify-between items-center text-[12px] font-normal leading-[15px] text-[#4D4D4D]">
                    <span className="truncate max-w-[100px]">{offer.brand}</span>
                    <span>Expires {offer.expires}</span>
                  </div>

                  {/* Title & Rating Block (Frame 2147229110) */}
                  <div className="w-full flex flex-col gap-1">
                    <h3 className="text-[16px] font-semibold leading-[19px] text-[#2D2D2D] truncate w-full">
                      {offer.title}
                    </h3>
                    
                    {/* Star ratings row (Frame 2147228493) */}
                    <div className="w-full h-[20px] flex items-center gap-2 text-[14px] font-semibold leading-[17px] text-[#1F1D1D]">
                      {/* Star Rating Group (Frame 2147228492) */}
                      <div className="w-[92px] h-[20px] flex items-center gap-1 flex-shrink-0">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <svg key={i} className="w-[20px] h-[20px] text-[#FF9F19] fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="truncate">4.00 (100)</span>
                    </div>
                  </div>
                </div>

                {/* CTA Row (Frame 2147229011) */}
                <div className="w-full h-[34px] flex items-center gap-[15px]">
                  {/* Claim Offer CTA */}
                  <button
                    onClick={onClaimOffer || (() => console.log(`Claimed ${offer.title}!`))}
                    className="flex-grow h-[34px] bg-gradient-to-b from-[#3E3EDF] to-[#3E3EDF] hover:opacity-90 active:scale-[0.98] text-[#FEFEFE] text-[16px] font-medium leading-[24px] rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.12),inset_0_4px_4px_rgba(255,255,255,0.12)] flex items-center justify-center cursor-pointer focus:outline-none min-w-0"
                  >
                    Claim offer
                  </button>
                  
                  {/* View Offer CTA */}
                  <button
                    onClick={onViewOffer || (() => console.log(`Viewing ${offer.title}!`))}
                    className="w-[85px] h-[34px] border border-[#707070] bg-[#FFFFFF] hover:bg-gray-50 active:scale-[0.98] text-[#1F1D1D] text-[12px] font-medium leading-[15px] rounded-lg shadow-[inset_0px_4px_4px_rgba(255,255,255,0.12)] filter drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.12)) flex items-center justify-center cursor-pointer flex-shrink-0 focus:outline-none"
                  >
                    View Offer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-[23px] select-none">
          {/* Example wrapper with 306px width constraint */}
          <div className="w-[306px] h-[36px] flex items-center gap-4">
            
            {/* Back button */}
            <button
              onClick={() => setCurrentPage(1)}
              className={`w-[78px] h-[36px] border rounded-[4px] flex items-center justify-center gap-1 text-[14px] font-normal leading-[21px] font-poppins cursor-pointer focus:outline-none transition-all ${
                currentPage === 1
                  ? "bg-[#3E3EDF] text-white border-[#3E3EDF]"
                  : "bg-[#FFFFFF] border-[#FEFEFE] hover:bg-gray-50 shadow-[0px_2px_8px_rgba(0,0,0,0.1)] text-[#1F1D1D]"
              }`}
            >
              <svg className={`w-4 h-4 transform -rotate-90 ${currentPage === 1 ? 'text-white' : 'text-[#1F1D1D]'}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              Back
            </button>

            {/* Page number 1 */}
            <button
              onClick={() => setCurrentPage(1)}
              className={`w-[29px] h-[37px] border rounded-[4px] flex items-center justify-center text-[14px] font-normal leading-[21px] font-poppins cursor-pointer focus:outline-none transition-all ${
                currentPage === 1
                  ? "bg-[#3E3EDF] text-white border-[#3E3EDF]"
                  : "bg-[#FFFFFF] border-[#FEFEFE] hover:bg-gray-50 shadow-[0px_2px_8px_rgba(0,0,0,0.1)] text-[#1F1D1D]"
              }`}
            >
              1
            </button>

            {/* Ellipsis symbol */}
            <div className="w-[31px] h-[36px] bg-[#FFFFFF] border border-[#FEFEFE] shadow-[0px_2px_8px_rgba(0,0,0,0.1)] rounded-[4px] flex items-center justify-center text-[14px] font-normal text-[#1F1D1D] font-poppins">
              ...
            </div>

            {/* Active Page 12 */}
            <button
              onClick={() => setCurrentPage(12)}
              className={`w-[29px] h-[37px] border rounded-[4px] flex items-center justify-center text-[14px] font-normal leading-[21px] font-poppins cursor-pointer focus:outline-none transition-all ${
                currentPage === 12
                  ? "bg-[#3E3EDF] text-white border-[#3E3EDF]"
                  : "bg-[#FFFFFF] border-[#FEFEFE] hover:bg-gray-50 shadow-[0px_2px_8px_rgba(0,0,0,0.1)] text-[#1F1D1D]"
              }`}
            >
              12
            </button>

            {/* Next button */}
            <button
              onClick={() => setCurrentPage(12)}
              className={`w-[75px] h-[36px] border rounded-[4px] flex items-center justify-center gap-1 text-[14px] font-normal leading-[21px] font-poppins cursor-pointer focus:outline-none transition-all ${
                currentPage === 12
                  ? "bg-[#3E3EDF] text-white border-[#3E3EDF]"
                  : "bg-[#FFFFFF] border-[#FEFEFE] hover:bg-gray-50 shadow-[0px_2px_8px_rgba(0,0,0,0.1)] text-[#1F1D1D]"
              }`}
            >
              Next
              <svg className={`w-4 h-4 transform rotate-90 ${currentPage === 12 ? 'text-white' : 'text-[#1F1D1D]'}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
