"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";

interface ViewDetailsProps {
  onBack: () => void;
  onTabChange: (tab: "offer" | "wallet" | "scan" | "profile" | "brand" | "notification", extra?: string) => void;
}

export default function ViewDetails({ onBack, onTabChange }: ViewDetailsProps) {
  const [email, setEmail] = useState("");

  const handleSaveReward = () => {
    onTabChange("scan");
  };

  return (
    <div className="w-full bg-[#FEFEFE] min-h-screen flex flex-col font-sans select-none">
      {/* Header */}
      <Header activeTab="offer" onTabChange={onTabChange} />

      {/* Main content viewport */}
      <main className="flex-grow flex flex-col items-center py-10 px-4 sm:px-6 max-w-[1440px] mx-auto w-full">
        
        {/* Main Details Wrapper (Frame 2147229209) */}
        <div className="w-full max-w-[535px] flex flex-col gap-6">
          
          {/* Section 1: Title & Description (Frame 2147229208) */}
          <div className="w-full flex flex-col gap-6">
            {/* Title Block (Frame 2147229029 / Frame 2147229028) */}
            <div className="w-full flex flex-col gap-[3px]">
              <h1 className="text-[32px] font-medium leading-[39px] text-[#2D2D2D] w-full">
                Summer Athletic Collection
              </h1>
              <span className="text-[18px] font-normal leading-[22px] text-[#4D4D4D]">
                Expires 2025-02-28
              </span>
            </div>

            {/* Description Block (Frame 2147229027) */}
            <div className="w-full flex flex-col gap-[3px]">
              <h2 className="text-[20px] font-medium leading-[24px] text-[#1F1D1D] w-full">
                Top Offer 10% OFF
              </h2>
              
              {/* Multiline description items */}
              <div className="text-[20px] font-normal leading-[24px] text-[#4D4D4D] w-full flex flex-col gap-1">
                <p>1. Step into summer with style and comfort.</p>
                <p>2. Get 10% OFF on Nike’s latest Summer Athletic Beast.</p>
                <p>3. Perfect for training, travel, and everyday movement.</p>
                <p>4. Hurry, this exclusive offer is valid till 28 Feb 2024.</p>
              </div>
            </div>
          </div>

          {/* Section 2: How It Works Card (Frame 2147229188) */}
          <div className="w-full max-w-[531px] bg-[#FEFEFE] shadow-[0px_4px_8.2px_rgba(0,0,0,0.2)] rounded-[12px] p-3 flex flex-col gap-2">
            <h3 className="text-[20px] font-medium leading-[24px] text-[#1F1D1D] w-full">
              How It Work
            </h3>

            {/* Steps Container (Frame 2147229187) */}
            <div className="w-full flex flex-col gap-2">
              
              {/* Step 1: Buy (Frame 2147229184) */}
              <div className="flex gap-2 items-center w-full">
                <span className="w-6 h-6 flex-shrink-0 text-[#3E3EDF]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm-2 4h4m8 0a2 2 0 10-2-2v2m0 0h2m-2 0a2 2 0 11-2-2v2m0 0h2m0 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V11" />
                  </svg>
                </span>
                <p className="text-[16px] font-normal leading-[19px] text-[#4D4D4D]">
                  Buy this product at any participating store or online retailer.
                </p>
              </div>

              {/* Step 2: Upload (Frame 2147229185) */}
              <div className="flex gap-2 items-center w-full">
                <span className="w-6 h-6 flex-shrink-0 text-[#3E3EDF]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </span>
                <p className="text-[16px] font-normal leading-[19px] text-[#4D4D4D]">
                  Upload your receipt through NibblAI to verify your purchase.
                </p>
              </div>

              {/* Step 3: Receive Reward (Frame 2147229186) */}
              <div className="flex gap-2 items-center w-full">
                <span className="w-6 h-6 flex-shrink-0 text-[#3E3EDF]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </span>
                <p className="text-[16px] font-normal leading-[19px] text-[#4D4D4D]">
                  Receive your instant reward directly in your Nibbl wallet.
                </p>
              </div>

            </div>
          </div>

          {/* Section 3: Reviews & Actions (Frame 2147229207) */}
          <div className="w-full flex flex-col gap-[18px]">
            <h3 className="text-[20px] font-medium leading-[24px] text-[#2D2D2D] w-full">
              Top Reviews
            </h3>

            {/* Review List wrapper (Frame 2147229200) */}
            <div className="w-full flex flex-col gap-6">
              
              {/* User Review 1 */}
              <div className="w-full flex flex-col gap-2 relative">
                {/* User Row */}
                <div className="w-full flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    {/* Circular Avatar (Ellipse 10) */}
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                      <Image
                        src="/homepage/cardImage.png"
                        alt="Flores, Juanita"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    {/* User name & Rating */}
                    <div className="flex flex-col">
                      <span className="text-[16px] font-medium leading-[24px] text-[#1F1D1D]">
                        Flores, Juanita
                      </span>
                      {/* Rating Stars */}
                      <div className="flex gap-[5px] items-center">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <svg key={i} className="w-[16px] h-[16px] text-[#FFB701] fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        {/* Gray outlined star */}
                        <svg className="w-[16px] h-[16px] text-[#C0C0C0] fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <span className="text-[14px] font-normal leading-[17px] text-[#4D4D4D] flex-shrink-0">
                    1 Days ago
                  </span>
                </div>
                
                {/* Review Text */}
                <p className="text-[16px] font-normal leading-[19px] text-[#4D4D4D] pl-1.5 mt-1.5">
                  Lorem ipsum dolor sit amet consectetur. Dolor volutpat tellus nunc nulla enim sit. Nunc ut pellentesque aliquet et. Nunc mattis molestie elit malesuada.
                </p>
              </div>

              {/* User Review 2 */}
              <div className="w-full flex flex-col gap-2 relative">
                {/* User Row */}
                <div className="w-full flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    {/* Circular Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                      <Image
                        src="/homepage/cardImage.png"
                        alt="Flores, Juanita"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    {/* User name & Rating */}
                    <div className="flex flex-col">
                      <span className="text-[16px] font-medium leading-[24px] text-[#1F1D1D]">
                        Flores, Juanita
                      </span>
                      {/* Rating Stars */}
                      <div className="flex gap-[5px] items-center">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <svg key={i} className="w-[16px] h-[16px] text-[#FFB701] fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <svg className="w-[16px] h-[16px] text-[#C0C0C0] fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <span className="text-[14px] font-normal leading-[17px] text-[#4D4D4D] flex-shrink-0">
                    1 Days ago
                  </span>
                </div>
                
                {/* Review Text */}
                <p className="text-[16px] font-normal leading-[19px] text-[#4D4D4D] pl-1.5 mt-1.5">
                  Lorem ipsum dolor sit amet consectetur. Dolor volutpat tellus nunc nulla enim sit. Nunc ut pellentesque aliquet et. Nunc mattis molestie elit malesuada.
                </p>
              </div>

            </div>

            {/* Email Address input wrapper (Frame 2147229199) */}
            <div className="w-[502px] max-w-full h-[45px] bg-[#FEFEFE] border border-[#E0E0E0] rounded-[4px] flex items-center px-[6px] py-[11px] gap-2.5 mt-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-none text-[#4D4D4D] placeholder-[#4D4D4D] text-[10px] font-normal leading-[12px] focus:outline-none w-full h-full"
              />
            </div>

            {/* Save My Reward button (CTA Large) */}
            <button
              onClick={handleSaveReward}
              className="w-full h-[56px] bg-white border border-[#3E3EDF] hover:bg-gray-50 active:scale-[0.98] text-[#1F1D1D] text-[20px] font-normal leading-[24px] rounded-lg shadow-[inset_0px_4px_4px_rgba(255,255,255,0.12)] filter drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.12)) transition-all flex items-center justify-center cursor-pointer focus:outline-none mt-2"
            >
              Save My Reward
            </button>
          </div>

          {/* Back Link */}
          <button
            onClick={onBack}
            className="text-[#3E3EDF] hover:underline text-sm font-medium text-center mt-4 cursor-pointer focus:outline-none"
          >
            &larr; Back to Offers
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer onTabChange={onTabChange} />
    </div>
  );
}
