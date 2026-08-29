"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "../../homepage/components/Header";
import Footer from "../../homepage/components/Footer";

interface ProfileContainerProps {
  initialView?: "menu" | "notifications" | "privacy" | "terms" | "faq" | "help";
  onBack: () => void;
  onSignOut: () => void;
  onClaimOffer?: () => void;
  onTabChange?: (tab: "offer" | "wallet" | "scan" | "profile" | "brand" | "notification", extra?: string) => void;
}

export default function ProfileContainer({
  initialView = "menu",
  onBack,
  onSignOut,
  onClaimOffer,
  onTabChange,
}: ProfileContainerProps) {
  const [activeView, setActiveView] = useState<"menu" | "edit" | "saved" | "privacy" | "terms" | "notifications" | "help" | "faq" | "contract-us">(() => {
    if (initialView === "notifications") return "notifications";
    if (initialView === "privacy" || initialView === "terms" || initialView === "faq" || initialView === "help") return initialView;
    return "menu";
  });
  const [prevInitialView, setPrevInitialView] = useState(initialView);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  
  // Adjust state in render when initialView prop changes
  if (initialView !== prevInitialView) {
    setPrevInitialView(initialView);
    if (initialView === "notifications") {
      setActiveView("notifications");
    } else if (initialView === "privacy" || initialView === "terms" || initialView === "faq" || initialView === "help") {
      setActiveView(initialView);
    } else {
      setActiveView("menu");
    }
  }

  // Form states for Edit Profile
  const [fullName, setFullName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const handleSaveChange = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveView("menu");
  };

  const handleDeleteAccount = () => {
    // Verbatim user decision: don't make confirmation alert box
    onSignOut();
  };

  const handleTabClick = (tab: "offer" | "wallet" | "scan" | "profile" | "brand" | "notification") => {
    if (tab === "notification") {
      setActiveView("notifications");
    } else if (tab === "profile") {
      setActiveView("menu");
    } else if (onTabChange) {
      onTabChange(tab);
    }
  };

  // Mock Lorem Ipsum content for Policies
  const policyText = `Lorem ipsum dolor sit amet consectetur. Ultrices id feugiat venenatis habitant mattis viverra elementum purus volutpat. Lacus eu molestie pulvinar rhoncus integer proin elementum. Pretium sit fringilla massa tristique aenean commodo leo. Aliquet viverra amet sit porta elementum et pellentesque posuere. Ullamcorper viverra tortor lobortis viverra auctor egestas. Nulla condimentum ac metus quam turpis gravida ut velit. Porta justo lacus consequat sed platea. Ut dui massa quam elit faucibus consectetur sapien aenean auctor. Felis ipsum amet justo in. Netus amet in egestas sed auctor lorem. Justo ullamcorper velit habitasse lorem eu arcu. Non enim a elit urna eget nibh quisque donec condimentum. Elit ut pellentesque neque in quis at viverra. Nisl etiam tristique odio eget convallis.Lorem ipsum dolor sit amet consectetur. Ultrices id feugiat venenatis habitant mattis viverra elementum purus volutpat. Lacus eu molestie pulvinar rhoncus integer proin elementum. Pretium sit fringilla massa tristique aenean commodo leo. Aliquet viverra amet sit porta elementum et pellentesque posuere. Ullamcorper viverra tortor lobortis viverra auctor egestas. Nulla condimentum ac metus quam turpis gravida ut velit. Porta justo lacus consequat sed platea. Ut dui massa quam elit faucibus consectetur sapien aenean auctor. Felis ipsum amet justo in. Netus amet in egestas sed auctor lorem. Justo ullamcorper velit habitasse lorem eu arcu. Non enim a elit urna eget nibh quisque donec condimentum. Elit ut pellentesque neque in quis at viverra. Nisl etiam tristique odio eget convallis.`;

  return (
    <div className="w-full bg-[#FEFEFE] min-h-screen flex flex-col font-sans select-none">
      {/* Header */}
      <Header
        activeTab={activeView === "notifications" ? "notification" : "profile"}
        onTabChange={handleTabClick}
      />

      {/* Main Page Layout Wrapper */}
      <main className="flex-grow flex flex-col items-center py-10 px-4 sm:px-6 max-w-[1440px] mx-auto w-full relative">
        
        {/* Render View: MAIN MENU */}
        {activeView === "menu" && (
          <div className="w-full max-w-[608px] flex flex-col items-center gap-6 mt-4">
            
            {/* User Header Block (Frame 2147228445) */}
            <div className="flex flex-col items-center gap-2">
              {/* Circular Avatar (Ellipse 13) */}
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden border border-gray-150 relative">
                <Image
                  src="/homepage/cardImage.png"
                  alt="Tamim Sarker"
                  fill
                  sizes="100px"
                  className="object-cover"
                />
                {/* Camera icon overlay */}
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#3E3EDF] border border-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-90">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </div>
              </div>

              {/* Text Frame 2147228444 */}
              <div className="flex flex-col items-center">
                <span className="text-[18px] font-medium leading-[22px] text-[#000000] text-center">
                  Tamim Sarker
                </span>
                <span className="text-[12px] font-normal leading-[15px] text-[#575757] text-center mt-0.5">
                  Tamim257@gmail.com
                </span>
              </div>
            </div>

            {/* List Group: Account Information (Frame 2147228467) */}
            <div className="w-full bg-[#FEFEFE] shadow-[0px_2px_4px_rgba(0,0,0,0.1)] rounded-[12px] p-4 flex flex-col gap-5 border border-gray-50">
              <span className="text-[16px] font-medium leading-[24px] text-[#1F1D1D]">
                Account Information
              </span>
              
              <div className="flex flex-col gap-4">
                {/* Edit Profile item */}
                <button
                  onClick={() => setActiveView("edit")}
                  className="w-full flex justify-between items-center text-left hover:bg-gray-50 p-1.5 rounded-lg transition-colors cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center text-[#575757]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </span>
                    <span className="text-[18px] font-medium leading-[22px] text-[#575757]">
                      Edit Profile
                    </span>
                  </div>
                  <span className="text-[#4D4D4D] w-6 h-6 flex items-center justify-center">&rarr;</span>
                </button>

                {/* Saved Offers item */}
                <button
                  onClick={() => setActiveView("saved")}
                  className="w-full flex justify-between items-center text-left hover:bg-gray-50 p-1.5 rounded-lg transition-colors cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center text-[#575757]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                      </svg>
                    </span>
                    <span className="text-[18px] font-medium leading-[22px] text-[#575757]">
                      Saved
                    </span>
                  </div>
                  <span className="text-[#4D4D4D] w-6 h-6 flex items-center justify-center">&rarr;</span>
                </button>
              </div>
            </div>

            {/* List Group: Policy Center (Frame 2147228465) */}
            <div className="w-full bg-[#FEFEFE] shadow-[0px_2px_4px_rgba(0,0,0,0.1)] rounded-[12px] p-4 flex flex-col gap-5 border border-gray-50">
              <span className="text-[16px] font-medium leading-[24px] text-[#1F1D1D]">
                Policy Center
              </span>
              
              <div className="flex flex-col gap-4">
                {/* Privacy Policy item */}
                <button
                  onClick={() => setActiveView("privacy")}
                  className="w-full flex justify-between items-center text-left hover:bg-gray-50 p-1.5 rounded-lg transition-colors cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center text-[#4D4D4D]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </span>
                    <span className="text-[18px] font-medium leading-[22px] text-[#575757]">
                      Privacy Policy
                    </span>
                  </div>
                  <span className="text-[#4D4D4D] w-6 h-6 flex items-center justify-center">&rarr;</span>
                </button>

                {/* Terms & Condition item */}
                <button
                  onClick={() => setActiveView("terms")}
                  className="w-full flex justify-between items-center text-left hover:bg-gray-50 p-1.5 rounded-lg transition-colors cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center text-[#4D4D4D]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </span>
                    <span className="text-[18px] font-medium leading-[22px] text-[#575757]">
                      Terms &amp; Condition
                    </span>
                  </div>
                  <span className="text-[#4D4D4D] w-6 h-6 flex items-center justify-center">&rarr;</span>
                </button>
              </div>
            </div>

            {/* List Group: Settings (Frame 2147228461) */}
            <div className="w-full bg-[#FEFEFE] shadow-[0px_2px_4px_rgba(0,0,0,0.11)] rounded-[12px] p-4 flex flex-col gap-5 border border-gray-50">
              <span className="text-[16px] font-medium leading-[24px] text-[#000000]">
                Settings
              </span>
              
              <div className="flex flex-col gap-4">
                {/* Notification item with Toggle Switch */}
                <div className="w-full flex justify-between items-center p-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center text-[#575757]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                      </svg>
                    </span>
                    <span className="text-[18px] font-medium leading-[22px] text-[#575757]">
                      Notification
                    </span>
                  </div>
                  
                  {/* Toggle Switch */}
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-all cursor-pointer focus:outline-none ${
                      notificationsEnabled ? "bg-[#3E3EDF] justify-end" : "bg-gray-200 justify-start"
                    }`}
                  >
                    <span className="w-4 h-4 bg-white rounded-full shadow-sm" />
                  </button>
                </div>

                {/* Help & Support item */}
                <button
                  onClick={() => setActiveView("help")}
                  className="w-full flex justify-between items-center text-left hover:bg-gray-50 p-1.5 rounded-lg transition-colors cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center text-[#575757]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                      </svg>
                    </span>
                    <span className="text-[18px] font-medium leading-[22px] text-[#575757]">
                      Help &amp; Support
                    </span>
                  </div>
                  <span className="text-[#575757] w-6 h-6 flex items-center justify-center">&rarr;</span>
                </button>

                {/* Log Out item */}
                <button
                  onClick={onSignOut}
                  className="w-full flex justify-between items-center text-left hover:bg-gray-50 p-1.5 rounded-lg transition-colors cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center text-[#575757]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                      </svg>
                    </span>
                    <span className="text-[18px] font-medium leading-[22px] text-[#575757]">
                      Log Out
                    </span>
                  </div>
                  <span className="text-[#525252] w-6 h-6 flex items-center justify-center">&rarr;</span>
                </button>

                {/* Delete Account item (RED) */}
                <button
                  onClick={handleDeleteAccount}
                  className="w-full flex justify-between items-center text-left hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center text-[#FF6363]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </span>
                    <span className="text-[18px] font-medium leading-[22px] text-[#FF6363]">
                      Delete Account
                    </span>
                  </div>
                  <span className="text-[#525252] w-6 h-6 flex items-center justify-center">&rarr;</span>
                </button>
              </div>
            </div>

            {/* Back to offers trigger */}
            <button
              onClick={onBack}
              className="text-[#3E3EDF] hover:underline text-sm font-medium mt-2 focus:outline-none"
            >
              &larr; Back to Offers
            </button>
          </div>
        )}

        {/* Render View: EDIT PROFILE */}
        {activeView === "edit" && (
          <div className="w-full max-w-[608px] bg-[#FEFEFE] border border-[#E0E0E0] shadow-[0px_4px_4px_rgba(0,0,0,0.08)] rounded-[12px] p-6 flex flex-col gap-6 mt-4">
            <h2 className="text-[24px] font-semibold leading-[29px] text-[#1F1D1D] w-full text-center">
              Edit Profile
            </h2>

            <form onSubmit={handleSaveChange} className="w-full flex flex-col items-center gap-6">
              
              {/* Circular Avatar Selector (Ellipse 14) */}
              <div className="w-[112px] h-[112px] rounded-full overflow-hidden border border-gray-200 relative">
                <Image
                  src="/homepage/cardImage.png"
                  alt="Tamim Sarker"
                  fill
                  sizes="112px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10 hover:bg-black/25 flex items-center justify-center cursor-pointer transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  </svg>
                </div>
              </div>

              {/* Form Input fields */}
              <div className="w-full flex flex-col gap-[14px]">
                {/* Full Name input */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-[16px] font-medium leading-[24px] text-[#1F1D1D]">
                    Full Name
                  </label>
                  <div className="w-full h-[50px] border border-[#959595] rounded-lg bg-[#F9F9F9] flex items-center px-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-transparent border-none text-[#1F1D1D] placeholder-[#737373] text-[14px] leading-[17px] focus:outline-none w-full"
                    />
                  </div>
                </div>

                {/* Old Password Input */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-[16px] font-medium leading-[24px] text-[#1F1D1D]">
                    Old Password
                  </label>
                  <div className="w-full h-[50px] border border-[#959595] rounded-lg bg-[#F9F9F9] flex items-center px-4 justify-between">
                    <input
                      type={showOldPass ? "text" : "password"}
                      placeholder="********"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="bg-transparent border-none text-[#575757] placeholder-[#575757] text-[14px] leading-[17px] focus:outline-none w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPass(!showOldPass)}
                      className="text-gray-400 hover:text-black focus:outline-none cursor-pointer"
                    >
                      {showOldPass ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password Input */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-[16px] font-medium leading-[24px] text-[#1F1D1D]">
                    New Password
                  </label>
                  <div className="w-full h-[50px] border border-[#959595] rounded-lg bg-[#F9F9F9] flex items-center px-4 justify-between">
                    <input
                      type={showNewPass ? "text" : "password"}
                      placeholder="********"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-transparent border-none text-[#575757] placeholder-[#575757] text-[14px] leading-[17px] focus:outline-none w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="text-gray-400 hover:text-black focus:outline-none cursor-pointer"
                    >
                      {showNewPass ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit CTA button (CTA Large) */}
              <button
                type="submit"
                className="w-full h-[54px] bg-gradient-to-b from-[#3E3EDF] to-[#3E3EDF] hover:opacity-90 active:scale-[0.98] text-[#FEFEFE] text-[18px] font-medium leading-[22px] rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.12),inset_0px_4px_4px_rgba(255,255,255,0.12)] flex items-center justify-center cursor-pointer transition-all focus:outline-none"
              >
                Save &amp; Change
              </button>

              {/* Back to main Profile menu */}
              <button
                type="button"
                onClick={() => setActiveView("menu")}
                className="text-[#3E3EDF] hover:underline text-sm font-medium focus:outline-none cursor-pointer"
              >
                Cancel &amp; Go Back
              </button>

            </form>
          </div>
        )}

        {/* Render View: SAVED OFFERS */}
        {activeView === "saved" && (
          <div className="w-full max-w-[772px] bg-[#FEFEFE] shadow-[0px_4px_4px_rgba(0,0,0,0.08)] rounded-[12px] p-6 flex flex-col items-center gap-6 mt-4">
            <h2 className="text-[24px] font-semibold leading-[29px] text-[#1F1D1D] w-full text-center">
              Saved Offer
            </h2>

            {/* List grid */}
            <div className="flex flex-col gap-8 w-full items-center">
              
              {/* Card 1: Beast By (Frame 2147229129) */}
              <div className="w-full max-w-[396px] bg-[#FFFFFF] shadow-[0px_2px_4px_rgba(0,0,0,0.12)] rounded-[14px] flex flex-col overflow-hidden relative border border-gray-100">
                {/* Image header */}
                <div className="w-full h-[180px] bg-[#D9D9D9] relative overflow-hidden flex-shrink-0">
                  <Image
                    src="/homepage/rewardImage.svg"
                    alt="Popcorn Image"
                    fill
                    sizes="396px"
                    className="object-cover"
                  />
                  {/* Discount Badge */}
                  <span className="absolute right-4 top-4 w-[64px] h-[30px] bg-[#E65353] shadow-[0px_4px_4px_rgba(0,0,0,0.12)] rounded-lg text-white text-[12px] font-semibold flex items-center justify-center z-10">
                    20% OFF
                  </span>
                </div>

                {/* Body (Frame 2147228498) */}
                <div className="p-3 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    {/* Brand & Expiry */}
                    <div className="flex justify-between items-center text-[12px] font-normal leading-[15px] text-[#4D4D4D]">
                      <span>Beast By</span>
                      <span>Expires 2025-02-28</span>
                    </div>
                    {/* Title */}
                    <h3 className="text-[16px] font-semibold leading-[19px] text-[#2D2D2D] truncate">
                      Tech Essentials Sale
                    </h3>
                  </div>

                  {/* Claim Offer CTA */}
                  <button
                    onClick={onClaimOffer || (() => console.log("Opening claim details..."))}
                    className="w-full h-[34px] bg-gradient-to-b from-[#3E3EDF] to-[#3E3EDF] hover:opacity-90 active:scale-[0.98] text-[#FEFEFE] text-[16px] font-medium leading-[24px] rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.12),inset_0px_4px_4px_rgba(255,255,255,0.12)] flex items-center justify-center cursor-pointer transition-all focus:outline-none"
                  >
                    Claim offer
                  </button>
                </div>
              </div>

              {/* Card 2: McDonald's (Frame 2147229011) */}
              <div className="w-full max-w-[396px] bg-[#FFFFFF] shadow-[0px_2px_4px_rgba(0,0,0,0.12)] rounded-[14px] flex flex-col overflow-hidden relative border border-gray-100">
                {/* Image header */}
                <div className="w-full h-[180px] bg-[#D9D9D9] relative overflow-hidden flex-shrink-0">
                  <Image
                    src="/homepage/rewardImage.svg"
                    alt="Popcorn Image"
                    fill
                    sizes="396px"
                    className="object-cover"
                  />
                  {/* Discount Badge */}
                  <span className="absolute right-4 top-4 w-[62px] h-[30px] bg-[#E65353] shadow-[0px_4px_4px_rgba(0,0,0,0.12)] rounded-lg text-white text-[12px] font-semibold flex items-center justify-center z-10">
                    10% OFF
                  </span>
                </div>

                {/* Body (Frame 2147228498) */}
                <div className="p-3 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    {/* Brand & Expiry */}
                    <div className="flex justify-between items-center text-[12px] font-normal leading-[15px] text-[#4D4D4D]">
                      <span>McDonald&apos;s</span>
                      <span>Expires 2025-01-30</span>
                    </div>
                    {/* Title */}
                    <h3 className="text-[16px] font-semibold leading-[19px] text-[#2D2D2D] truncate">
                      Happy Meal Deal
                    </h3>
                  </div>

                  {/* Claim Offer CTA */}
                  <button
                    onClick={onClaimOffer || (() => console.log("Opening claim details..."))}
                    className="w-full h-[34px] bg-gradient-to-b from-[#3E3EDF] to-[#3E3EDF] hover:opacity-90 active:scale-[0.98] text-[#FEFEFE] text-[16px] font-medium leading-[24px] rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.12),inset_0px_4px_4px_rgba(255,255,255,0.12)] flex items-center justify-center cursor-pointer transition-all focus:outline-none"
                  >
                    Claim offer
                  </button>
                </div>
              </div>

            </div>

            {/* Back link */}
            <button
              onClick={() => setActiveView("menu")}
              className="text-[#3E3EDF] hover:underline text-sm font-medium mt-4 focus:outline-none cursor-pointer"
            >
              &larr; Back to Profile Menu
            </button>
          </div>
        )}

        {/* Render View: PRIVACY POLICY */}
        {activeView === "privacy" && (
          <div className="w-full max-w-[1052px] flex flex-col gap-6 mt-4">
            
            {/* Title / Back row (Frame 1000004952) */}
            <div className="w-full flex items-center gap-4 border-b border-gray-150 pb-4">
              <button
                onClick={() => setActiveView("menu")}
                className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-[0.95] cursor-pointer focus:outline-none"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h2 className="text-[24px] font-semibold leading-[29px] text-[#1F1D1D]">
                Privacy Policy
              </h2>
            </div>

            {/* Body text paragraph */}
            <p className="text-[14px] font-normal leading-[22px] text-[#575757] text-justify whitespace-pre-line tracking-wide">
              {policyText}
            </p>

            <button
              onClick={() => setActiveView("menu")}
              className="text-[#3E3EDF] hover:underline text-sm font-medium self-center focus:outline-none cursor-pointer"
            >
              &larr; Back to Profile Menu
            </button>
          </div>
        )}

        {/* Render View: TERMS & CONDITION */}
        {activeView === "terms" && (
          <div className="w-full max-w-[1052px] flex flex-col gap-6 mt-4">
            
            {/* Title / Back row */}
            <div className="w-full flex items-center gap-4 border-b border-gray-150 pb-4">
              <button
                onClick={() => setActiveView("menu")}
                className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-[0.95] cursor-pointer focus:outline-none"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h2 className="text-[24px] font-semibold leading-[29px] text-[#1F1D1D]">
                Terms &amp; Condition
              </h2>
            </div>

            {/* Body text paragraph */}
            <p className="text-[14px] font-normal leading-[22px] text-[#575757] text-justify whitespace-pre-line tracking-wide">
              {policyText}
            </p>

            <button
              onClick={() => setActiveView("menu")}
              className="text-[#3E3EDF] hover:underline text-sm font-medium self-center focus:outline-none cursor-pointer"
            >
              &larr; Back to Profile Menu
            </button>
          </div>
        )}

        {/* Render View: NOTIFICATION */}
        {activeView === "notifications" && (
          <div className="w-full max-w-[772px] flex flex-col gap-6 mt-4">
            
            {/* Title / Back Header */}
            <div className="w-full flex items-center justify-center relative border-b border-gray-100 pb-4">
              <button
                onClick={() => setActiveView("menu")}
                className="absolute left-0 w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-[0.95] cursor-pointer focus:outline-none"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h2 className="text-[24px] font-semibold leading-[29px] text-[#1F1D1D]">
                Notification
              </h2>
            </div>

            {/* Empty space */}
            <div className="w-full min-h-[350px] flex flex-col items-center justify-center text-gray-400 gap-2">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <p className="text-sm font-normal">You have no new notifications.</p>
            </div>

            <button
              onClick={() => setActiveView("menu")}
              className="text-[#3E3EDF] hover:underline text-sm font-medium self-center focus:outline-none cursor-pointer"
            >
              &larr; Back to Profile Menu
            </button>
          </div>
        )}

        {/* Render View: HELP & SUPPORT */}
        {activeView === "help" && (
          <div className="w-full max-w-[631px] bg-[#FEFEFE] border border-[#E0E0E0] rounded-[12px] p-6 sm:py-[29px] sm:px-[12px] flex flex-col gap-[21px] mx-auto mt-4 shadow-sm">
            <div className="w-full flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-[24px] font-semibold leading-[29px] text-[#1F1D1D]">
                Help &amp; Support
              </h2>
              <button
                onClick={() => setActiveView("menu")}
                className="w-8 h-8 rounded-full border border-gray-150 flex items-center justify-center hover:bg-gray-50 active:scale-[0.95] cursor-pointer focus:outline-none"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            </div>

            {/* List group (Frame 2147228392) */}
            <div className="flex flex-col gap-4 w-full">
              {/* FAQ item (Frame 1000005262) */}
              <button
                onClick={() => setActiveView("faq")}
                className="w-full h-[48px] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.11)] border border-gray-100 rounded-[10px] px-4 flex items-center justify-between hover:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer focus:outline-none"
              >
                <span className="text-[16px] font-medium leading-[24px] text-[#1F1D1D]">
                  FAQ
                </span>
                <span className="text-lg text-[#1F1D1D]">&rarr;</span>
              </button>

              {/* Contract Us item (Frame 1000005535) */}
              <button
                onClick={() => setActiveView("contract-us")}
                className="w-full h-[48px] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.11)] border border-gray-100 rounded-[10px] px-4 flex items-center justify-between hover:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer focus:outline-none"
              >
                <span className="text-[16px] font-medium leading-[24px] text-[#1F1D1D]">
                  Contract Us
                </span>
                <span className="text-lg text-[#1F1D1D]">&rarr;</span>
              </button>
            </div>

            <button
              onClick={() => setActiveView("menu")}
              className="text-[#3E3EDF] hover:underline text-sm font-medium self-center focus:outline-none cursor-pointer mt-2"
            >
              &larr; Back to Profile Menu
            </button>
          </div>
        )}

        {/* Render View: FAQ */}
        {activeView === "faq" && (
          <div className="w-full max-w-[885px] bg-[#FEFEFE] border border-[#E0E0E0] rounded-[12px] p-6 sm:py-[29px] sm:px-[12px] flex flex-col gap-6 mx-auto mt-4 shadow-sm">
            <div className="w-full flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-[24px] font-semibold leading-[29px] text-[#1F1D1D]">
                FAQ
              </h2>
              <button
                onClick={() => setActiveView("help")}
                className="w-8 h-8 rounded-full border border-gray-150 flex items-center justify-center hover:bg-gray-50 active:scale-[0.95] cursor-pointer focus:outline-none"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            </div>

            {/* FAQ Accordion List */}
            <div className="flex flex-col gap-3.5 w-full">
              {[
                {
                  q: "Where can I find ongoing offers and deals?",
                  a: "You can find all active offers and deals on the Offer tab on the homepage dashboard. Simply scroll through the 'Your Rewards' grid or filter by categories like Fashion, Food, or Electronics.",
                },
                {
                  q: "What should I do if a QR code doesn’t scan properly?",
                  a: "Ensure that your camera has proper lighting and is aligned with the QR code. If the scan still fails, try uploading the receipt image manually using the 'Upload Receipt' option.",
                },
                {
                  q: "Can I use the app offline inside a store?",
                  a: "Yes, you can browse previously loaded offers and saved details. However, to claim new offers, scan QR codes, or upload receipts, a stable internet connection is required.",
                },
                {
                  q: "How do I contact support if I face a problem?",
                  a: "You can reach out to our support team directly via email or our social media handles listed on the 'Contract Us' page under Help & Support.",
                },
                {
                  q: "Is my personal information safe?",
                  a: "Absolutely. We encrypt all user data and transaction details. We never share your personal information or purchase history with third-party advertising companies.",
                },
              ].map((faq, index) => {
                const isOpen = activeFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="w-full bg-[#FEFEFE] shadow-[0px_2px_4px_rgba(0,0,0,0.11)] rounded-[11px] overflow-hidden border border-gray-100 transition-all duration-300"
                  >
                    {/* FAQ Header Button */}
                    <button
                      onClick={() => setActiveFaqIndex(isOpen ? null : index)}
                      className="w-full p-5 flex items-center justify-between text-left hover:bg-gray-50 focus:outline-none cursor-pointer"
                    >
                      <span className="text-[16px] font-medium leading-[19px] text-[#1F1D1D]">
                        {faq.q}
                      </span>
                      <span
                        className={`w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500 transform transition-transform duration-200 ${
                          isOpen ? "rotate-90 text-[#3E3EDF]" : "-rotate-90"
                        }`}
                      >
                        &rarr;
                      </span>
                    </button>

                    {/* FAQ Answer Details */}
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-[12px] sm:text-[14px] font-normal leading-[20px] text-[#575757] border-t border-gray-50 bg-gray-50/30">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setActiveView("help")}
              className="text-[#3E3EDF] hover:underline text-sm font-medium self-center focus:outline-none cursor-pointer mt-2"
            >
              &larr; Back to Help &amp; Support
            </button>
          </div>
        )}

        {/* Render View: CONTRACT US */}
        {activeView === "contract-us" && (
          <div className="w-full max-w-[463px] bg-[#FEFEFE] border border-[#E0E0E0] rounded-[12px] p-6 sm:py-[29px] sm:px-[12px] flex flex-col gap-4 mx-auto mt-4 shadow-sm">
            <div className="w-full flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-[24px] font-semibold leading-[29px] text-[#1F1D1D]">
                Contract Us
              </h2>
              <button
                onClick={() => setActiveView("help")}
                className="w-8 h-8 rounded-full border border-gray-150 flex items-center justify-center hover:bg-gray-50 active:scale-[0.95] cursor-pointer focus:outline-none"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            </div>

            {/* Social List (Frame 2147228388) */}
            <div className="flex flex-col gap-3.5 w-full">
              {/* Instagram (Frame 2147228384) */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-full h-[48px] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.1)] border border-gray-100 rounded-lg px-4 flex items-center gap-3 hover:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer focus:outline-none text-[#1F1D1D]"
              >
                <span className="w-6 h-6 flex-shrink-0 text-black flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                  </svg>
                </span>
                <span className="text-[16px] font-medium leading-[24px]">
                  Instagram
                </span>
              </a>

              {/* Website (Frame 2147228386) */}
              <a
                href="https://nibbl.ai"
                target="_blank"
                rel="noreferrer"
                className="w-full h-[48px] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.1)] border border-gray-100 rounded-lg px-4 flex items-center gap-3 hover:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer focus:outline-none text-[#1F1D1D]"
              >
                <span className="w-6 h-6 flex-shrink-0 text-black flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                </span>
                <span className="text-[16px] font-medium leading-[24px]">
                  Website
                </span>
              </a>

              {/* Twitter (Frame 2147228387) */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-full h-[48px] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.1)] border border-gray-100 rounded-lg px-4 flex items-center gap-3 hover:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer focus:outline-none text-[#1F1D1D]"
              >
                <span className="w-6 h-6 flex-shrink-0 text-black flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </span>
                <span className="text-[16px] font-medium leading-[24px]">
                  Twitter
                </span>
              </a>

              {/* Email (Frame 2147228388) */}
              <a
                href="mailto:support@nibbl.ai"
                className="w-full h-[48px] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.1)] border border-gray-100 rounded-lg px-4 flex items-center gap-3 hover:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer focus:outline-none text-[#1F1D1D]"
              >
                <span className="w-6 h-6 flex-shrink-0 text-black flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <span className="text-[16px] font-medium leading-[24px]">
                  Email
                </span>
              </a>
            </div>

            <button
              onClick={() => setActiveView("help")}
              className="text-[#3E3EDF] hover:underline text-sm font-medium self-center focus:outline-none cursor-pointer mt-2"
            >
              &larr; Back to Help &amp; Support
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer onTabChange={onTabChange} />
    </div>
  );
}
