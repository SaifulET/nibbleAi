"use client";

import { useState, useEffect } from "react";
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
import { useConsumerApiStore } from "@/stores/useConsumerApiStore";

export default function AuthContainer() {
  const [stage, setStage] = useState<AuthStage>("splash");
  const [profileInitialView, setProfileInitialView] = useState<"menu" | "notifications" | "privacy" | "terms" | "faq" | "help">("menu");

  const [autoOpenReviewItem, setAutoOpenReviewItem] = useState<string | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
  const [authFlow, setAuthFlow] = useState<"signup" | "password-reset" | null>(null);
  const [passwordResetCode, setPasswordResetCode] = useState("");
  const {
    login,
    register,
    forgotPassword,
    resetPassword,
    verifyEmail,
    logout,
    loadOfferDetails,
    error,
  } = useConsumerApiStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab) {
        const timer = setTimeout(() => {
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
          } else if (tab === "privacy" || tab === "terms" || tab === "faq") {
            setProfileInitialView(tab);
            setStage("profile");
          }
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, []);

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
      if (extra === "privacy" || extra === "terms" || extra === "faq" || extra === "help") {
        setProfileInitialView(extra);
      } else {
        setProfileInitialView("menu");
      }
      setStage("profile");
    } else if (tab === "notification") {
      setProfileInitialView("notifications");
      setStage("profile");
    }
  };

  const handleSplashComplete = () => {
    setStage("onboarding");
  };

  const handleSignInSubmit = async (data: SignInCredentials) => {
    if (!data.password) return;
    try {
      await login(data.email, data.password, data.rememberMe);
      setStage("home");
    } catch {
      // Store keeps the displayable error.
    }
  };

  const handleSignUpSubmit = async (data: SignUpCredentials) => {
    if (!data.password) return;
    try {
      await register(data.fullName, data.email, data.password);
      setAuthFlow("signup");
      setStage("verify-email");
    } catch {
      // Store keeps the displayable error.
    }
  };

  const handleForgotPasswordSubmit = async (email: string) => {
    try {
      await forgotPassword(email);
      setAuthFlow("password-reset");
      setStage("verify-email");
    } catch {
      // Store keeps the displayable error.
    }
  };

  const handleVerifyEmailSubmit = async (otp: string) => {
    if (authFlow === "password-reset") {
      setPasswordResetCode(otp);
      setStage("reset-password");
      return;
    }

    try {
      await verifyEmail(otp);
      setStage("signin");
    } catch {
      // Store keeps the displayable error.
    }
  };

  const handleResetPasswordSubmit = async (password: string) => {
    try {
      await resetPassword(passwordResetCode, password);
      setAuthFlow(null);
      setPasswordResetCode("");
      setStage("signin");
    } catch {
      // Store keeps the displayable error.
    }
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
          onClaimOffer={(campaignId) => {
            setSelectedCampaignId(campaignId || "");
            if (campaignId) void loadOfferDetails(campaignId);
            setStage("claim-details");
          }}
          onViewOffer={(campaignId) => {
            setSelectedCampaignId(campaignId || "");
            if (campaignId) void loadOfferDetails(campaignId);
            setStage("view-details");
          }}
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
          campaignId={selectedCampaignId}
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
          campaignId={selectedCampaignId}
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
          onSignOut={() => {
            void logout();
            setStage("onboarding");
          }}
          onClaimOffer={() => setStage("claim-details")}
          onSelectOffer={(campaignId) => {
            setSelectedCampaignId(campaignId);
            void loadOfferDetails(campaignId);
            setStage("claim-details");
          }}
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
        {error && (
          <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm text-red-600 shadow-lg">
            {error}
          </div>
        )}
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
