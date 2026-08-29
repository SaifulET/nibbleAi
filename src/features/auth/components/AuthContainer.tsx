"use client";

import { useState } from "react";
import { AuthStage, SignInCredentials, SignUpCredentials } from "../types/auth.types";
import SplashScreen from "./SplashScreen";
import Onboarding from "./Onboarding";
import AuthLayout from "./AuthLayout";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import VerifyEmailForm from "./VerifyEmailForm";
import ResetPasswordForm from "./ResetPasswordForm";
import HomepageContainer from "@/features/homepage/components/HomepageContainer";
import ClaimDetails from "@/features/homepage/components/ClaimDetails";
import ViewDetails from "@/features/homepage/components/ViewDetails";
import ProfileContainer from "@/features/profile/components/ProfileContainer";
import MyRewardContainer from "@/features/myreward/components/MyRewardContainer";
import WalletContainer from "@/features/wallet/components/WalletContainer";

export default function AuthContainer() {
  const [stage, setStage] = useState<AuthStage>("splash");
  const [profileInitialView, setProfileInitialView] = useState<"menu" | "notifications">("menu");

  const [autoOpenReviewItem, setAutoOpenReviewItem] = useState<string | null>(null);

  const handleTabChange = (
    tab: "offer" | "wallet" | "scan" | "profile" | "brand" | "notification",
    extra?: string
  ) => {
    if (extra) {
      setAutoOpenReviewItem(extra);
    } else {
      setAutoOpenReviewItem(null);
    }

    if (tab === "offer" || tab === "brand") {
      setStage("home");
    } else if (tab === "wallet") {
      setStage("wallet");
    } else if (tab === "scan") {
      setStage("my-reward");
    } else if (tab === "profile") {
      setProfileInitialView("menu");
      setStage("profile");
    } else if (tab === "notification") {
      setProfileInitialView("notifications");
      setStage("profile");
    }
  };

  const handleSplashComplete = () => {
    setStage("onboarding");
  };

  const handleSignInSubmit = (data: SignInCredentials) => {
    console.log("Sign In data:", data);
    setStage("home");
  };

  const handleSignUpSubmit = (data: SignUpCredentials) => {
    console.log("Sign Up data:", data);
    setStage("signin");
  };

  const handleForgotPasswordSubmit = (email: string) => {
    console.log("Forgot Password email:", email);
    setStage("verify-email");
  };

  const handleVerifyEmailSubmit = (otp: string) => {
    console.log("Verified email with OTP:", otp);
    setStage("reset-password");
  };

  const handleResetPasswordSubmit = (password: string) => {
    console.log("Password reset success with password length:", password.length);
    setStage("signin");
  };

  // Render Splash Screen directly
  if (stage === "splash") {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Render Onboarding Screen directly
  if (stage === "onboarding") {
    return (
      <div className="animate-fade-in">
        <Onboarding onNavigate={setStage} />
      </div>
    );
  }

  // Render Homepage directly
  if (stage === "home") {
    return (
      <div className="animate-fade-in">
        <HomepageContainer
          onClaimOffer={() => setStage("claim-details")}
          onViewOffer={() => setStage("view-details")}
          onTabChange={handleTabChange}
        />
      </div>
    );
  }

  // Render Claim Details Page directly
  if (stage === "claim-details") {
    return (
      <div className="animate-fade-in">
        <ClaimDetails
          onBack={() => setStage("home")}
          onNavigate={setStage}
          onTabChange={handleTabChange}
        />
      </div>
    );
  }

  // Render View Details Page directly
  if (stage === "view-details") {
    return (
      <div className="animate-fade-in">
        <ViewDetails
          onBack={() => setStage("home")}
          onTabChange={handleTabChange}
        />
      </div>
    );
  }

  // Render Profile Container Page directly
  if (stage === "profile") {
    return (
      <div className="animate-fade-in">
        <ProfileContainer
          initialView={profileInitialView}
          onBack={() => setStage("home")}
          onSignOut={() => setStage("onboarding")}
          onClaimOffer={() => setStage("claim-details")}
          onTabChange={handleTabChange}
        />
      </div>
    );
  }

  // Render My Reward Page directly
  if (stage === "my-reward") {
    return (
      <div className="animate-fade-in">
        <MyRewardContainer
          onTabChange={handleTabChange}
          autoOpenReviewItem={autoOpenReviewItem}
          onClearAutoOpenReview={() => setAutoOpenReviewItem(null)}
        />
      </div>
    );
  }

  // Render Wallet Page directly
  if (stage === "wallet") {
    return (
      <div className="animate-fade-in">
        <WalletContainer
          onTabChange={handleTabChange}
        />
      </div>
    );
  }

  // Render all other forms inside the AuthLayout wrapper
  return (
    <AuthLayout>
      <div className="animate-fade-in w-full flex justify-center">
        {stage === "signin" && (
          <SignInForm
            onNavigate={setStage}
            onSubmit={handleSignInSubmit}
          />
        )}
        {stage === "signup" && (
          <SignUpForm
            onNavigate={setStage}
            onSubmit={handleSignUpSubmit}
          />
        )}
        {stage === "forgot-password" && (
          <ForgotPasswordForm
            onNavigate={setStage}
            onSubmit={handleForgotPasswordSubmit}
          />
        )}
        {stage === "verify-email" && (
          <VerifyEmailForm
            onNavigate={setStage}
            onSubmit={handleVerifyEmailSubmit}
          />
        )}
        {stage === "reset-password" && (
          <ResetPasswordForm
            onNavigate={setStage}
            onSubmit={handleResetPasswordSubmit}
          />
        )}
      </div>
    </AuthLayout>
  );
}
