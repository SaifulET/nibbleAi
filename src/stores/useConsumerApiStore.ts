"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ApiError,
  ApiRecord,
  backendApi,
  nibblApi,
  apiClient,
  tokenStorage,
} from "@/lib/api/backendApi";

export type LoadState = "idle" | "loading" | "success" | "error";

export interface ConsumerApiState {
  accessToken: string | null;
  refreshToken: string | null;
  pendingEmail: string | null;
  user: ApiRecord | null;
  wallet: ApiRecord | null;
  offers: ApiRecord[];
  selectedOffer: ApiRecord | null;
  savedOffers: ApiRecord[];
  categories: string[];
  reservations: ApiRecord[];
  receipts: ApiRecord[];
  activities: ApiRecord[];
  reviewOpportunities: ApiRecord[];
  redemptions: ApiRecord[];
  payoutMethods: ApiRecord[];
  notifications: ApiRecord[];
  notificationPreferences: ApiRecord | null;
  unreadCount: number;
  config: ApiRecord | null;
  status: LoadState;
  error: string | null;
  setTokens: (access: string, refresh: string) => void;
  clearAuth: () => void;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  resendEmailVerification: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (code: string, newPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  loadProfile: () => Promise<void>;
  loadHome: (search?: string, category?: string) => Promise<void>;
  loadOfferDetails: (campaignId: string) => Promise<void>;
  loadSavedOffers: () => Promise<void>;
  loadRewardsHub: () => Promise<void>;
  loadWallet: () => Promise<void>;
  loadNotifications: () => Promise<void>;
  updateProfile: (body: ApiRecord) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  saveOffer: (campaignId: string) => Promise<ApiRecord>;
  claimOffer: (campaignId: string) => Promise<ApiRecord>;
  uploadReceipt: (reservationId: string, file: File) => Promise<ApiRecord>;
  submitReview: (sessionId: string, rating: number, content?: string) => Promise<ApiRecord>;
  inviteFriend: (fullName: string, contact: string) => Promise<void>;
  createPayoutMethod: (provider: "paypal" | "venmo", handle: string) => Promise<ApiRecord>;
  requestWithdrawal: (payoutMethodId: string, amount: string) => Promise<ApiRecord>;
  updateNotificationPreferences: (body: ApiRecord) => Promise<void>;
}

const listResults = (response: unknown): ApiRecord[] => {
  if (Array.isArray(response)) return response as ApiRecord[];
  if (
    response &&
    typeof response === "object" &&
    Array.isArray((response as { results?: unknown }).results)
  ) {
    return (response as { results: ApiRecord[] }).results;
  }
  return [];
};

const readError = (error: unknown) =>
  error instanceof ApiError ? error.message : "Something went wrong.";

export const useConsumerApiStore = create<ConsumerApiState>()(
  persist(
    (set, get) => ({
      accessToken: tokenStorage.getAccess(),
      refreshToken: tokenStorage.getRefresh(),
      pendingEmail: null,
      user: null,
      wallet: null,
      offers: [],
      selectedOffer: null,
      savedOffers: [],
      categories: [],
      reservations: [],
      receipts: [],
      activities: [],
      reviewOpportunities: [],
      redemptions: [],
      payoutMethods: [],
      notifications: [],
      notificationPreferences: null,
      unreadCount: 0,
      config: null,
      status: "idle",
      error: null,
      setTokens: (access, refresh) => {
        tokenStorage.set(access, refresh);
        set({ accessToken: access, refreshToken: refresh });
      },
      clearAuth: () => {
        tokenStorage.clear();
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          wallet: null,
          offers: [],
          selectedOffer: null,
          savedOffers: [],
          reservations: [],
          receipts: [],
          activities: [],
          reviewOpportunities: [],
          redemptions: [],
          payoutMethods: [],
          notifications: [],
          unreadCount: 0,
        });
      },
      login: async (email, password, rememberMe = false) => {
        set({ status: "loading", error: null });
        try {
          const tokens = await nibblApi.login({
            email,
            password,
            remember_me: rememberMe,
          });
          get().setTokens(tokens.access, tokens.refresh);
          const user = await nibblApi.me();
          set({ user, status: "success" });
        } catch (error) {
          set({ status: "error", error: readError(error) });
          throw error;
        }
      },
      register: async (fullName, email, password) => {
        set({ status: "loading", error: null });
        try {
          await nibblApi.register({
            full_name: fullName,
            email,
            password,
            accept_terms: true,
          });
          set({ pendingEmail: email, status: "success" });
        } catch (error) {
          set({ status: "error", error: readError(error) });
          throw error;
        }
      },
      verifyEmail: async (code) => {
        const email = get().pendingEmail;
        if (!email) throw new Error("No email is waiting for verification.");
        set({ status: "loading", error: null });
        try {
          const user = await nibblApi.verifyEmail({ email, code });
          set({ user, status: "success" });
        } catch (error) {
          set({ status: "error", error: readError(error) });
          throw error;
        }
      },
      resendEmailVerification: async () => {
        const email = get().pendingEmail;
        if (!email) return;
        await nibblApi.resendEmailVerification(email);
      },
      forgotPassword: async (email) => {
        set({ status: "loading", error: null });
        try {
          await nibblApi.forgotPassword(email);
          set({ pendingEmail: email, status: "success" });
        } catch (error) {
          set({ status: "error", error: readError(error) });
          throw error;
        }
      },
      resetPassword: async (code, newPassword) => {
        const email = get().pendingEmail;
        if (!email) throw new Error("No email is waiting for password reset.");
        set({ status: "loading", error: null });
        try {
          await nibblApi.resetPassword({ email, code, new_password: newPassword });
          set({ status: "success" });
        } catch (error) {
          set({ status: "error", error: readError(error) });
          throw error;
        }
      },
      logout: async () => {
        const refresh = get().refreshToken;
        try {
          if (refresh) await nibblApi.logout(refresh);
        } finally {
          get().clearAuth();
        }
      },
      loadProfile: async () => {
        set({ status: "loading", error: null });
        try {
          const [user, notificationPreferences] = await Promise.all([
            nibblApi.me(),
            nibblApi.notificationPreferences(),
          ]);
          set({ user, notificationPreferences, status: "success" });
        } catch (error) {
          set({ status: "error", error: readError(error) });
        }
      },
      loadHome: async (search, category) => {
        set({ status: "loading", error: null });
        try {
          const [wallet, offers, categories, unread, config] = await Promise.all([
            nibblApi.wallet(),
            nibblApi.offers({ page: 1, search, category: category === "All" ? undefined : category }),
            nibblApi.offerCategories(),
            nibblApi.unreadCount(),
            nibblApi.config(),
          ]);
          set({
            wallet,
            offers: listResults(offers),
            categories: ["All", ...categories.map((item) => String(item.category || "")).filter(Boolean)],
            unreadCount: Number(unread.unread_count || 0),
            config,
            status: "success",
          });
        } catch (error) {
          set({ status: "error", error: readError(error) });
        }
      },
      loadOfferDetails: async (campaignId) => {
        set({ status: "loading", error: null });
        try {
          const details = await nibblApi.offerDetails(campaignId);
          set({ selectedOffer: details, status: "success" });
        } catch {
          try {
            const detail = await nibblApi.offerDetail(campaignId);
            set({ selectedOffer: detail, status: "success" });
          } catch (fallbackError) {
            set({ status: "error", error: readError(fallbackError) });
          }
        }
      },
      loadSavedOffers: async () => {
        set({ status: "loading", error: null });
        try {
          const savedOffers = await nibblApi.savedOffers();
          set({ savedOffers: listResults(savedOffers), status: "success" });
        } catch (error) {
          set({ status: "error", error: readError(error) });
        }
      },
      loadRewardsHub: async () => {
        set({ status: "loading", error: null });
        try {
          const [reservations, reviewOpportunities, receipts, activities] =
            await Promise.all([
              nibblApi.reservations({ status: "active", page: 1 }),
              nibblApi.reviewOpportunities(),
              nibblApi.receipts({ page: 1 }),
              nibblApi.activity({ page: 1 }),
            ]);
          set({
            reservations: listResults(reservations),
            reviewOpportunities: listResults(reviewOpportunities),
            receipts: listResults(receipts),
            activities: listResults(activities),
            status: "success",
          });
        } catch (error) {
          set({ status: "error", error: readError(error) });
        }
      },
      loadNotifications: async () => {
        set({ status: "loading", error: null });
        try {
          const [notifications, unread] = await Promise.all([
            nibblApi.notifications({ page: 1 }),
            nibblApi.unreadCount(),
          ]);
          set({
            notifications: listResults(notifications),
            unreadCount: Number(unread.unread_count || 0),
            status: "success",
          });
        } catch (error) {
          set({ status: "error", error: readError(error) });
        }
      },
      updateProfile: async (body) => {
        set({ status: "loading", error: null });
        try {
          const user = await nibblApi.updateMe(body);
          set({ user, status: "success" });
        } catch (error) {
          set({ status: "error", error: readError(error) });
          throw error;
        }
      },
      changePassword: async (currentPassword, newPassword) => {
        set({ status: "loading", error: null });
        try {
          await nibblApi.changePassword({
            current_password: currentPassword,
            new_password: newPassword,
          });
          set({ status: "success" });
        } catch (error) {
          set({ status: "error", error: readError(error) });
          throw error;
        }
      },
      saveOffer: async (campaignId) => {
        const saved = await nibblApi.saveOffer(campaignId);
        await get().loadSavedOffers();
        return saved;
      },
      loadWallet: async () => {
        set({ status: "loading", error: null });
        try {
          const [wallet, redemptions, payoutMethods] = await Promise.all([
            nibblApi.wallet(),
            nibblApi.redemptions({ page: 1 }),
            nibblApi.payoutMethods(),
          ]);
          set({
            wallet,
            redemptions: listResults(redemptions),
            payoutMethods: listResults(payoutMethods),
            status: "success",
          });
        } catch (error) {
          set({ status: "error", error: readError(error) });
        }
      },
      claimOffer: async (campaignId) => {
        const reservation = await nibblApi.createReservation(campaignId);
        await get().loadRewardsHub();
        return reservation;
      },
      uploadReceipt: async (reservationId, file) => {
        const receipt = await nibblApi.uploadReceipt(reservationId, file);
        await get().loadRewardsHub();
        if (receipt.status === "verified") await get().loadWallet();
        return receipt;
      },
      submitReview: async (sessionId, rating, content) => {
        const review = await nibblApi.submitReview(sessionId, { rating, content });
        await get().loadRewardsHub();
        await get().loadWallet();
        return review;
      },
      inviteFriend: async (fullName, contact) => {
        await nibblApi.inviteReferral({ full_name: fullName, contact });
      },
      createPayoutMethod: async (provider, handle) => {
        const payoutMethod = await nibblApi.createPayoutMethod({
          provider,
          handle,
          is_default: true,
        });
        await get().loadWallet();
        return payoutMethod;
      },
      requestWithdrawal: async (payoutMethodId, amount) => {
        const withdrawal = await nibblApi.createWithdrawal({
          payout_method: payoutMethodId,
          amount,
        });
        await get().loadWallet();
        return withdrawal;
      },
      updateNotificationPreferences: async (body) => {
        const notificationPreferences =
          await apiClient.request<ApiRecord>(
            backendApi.consumer.updateNotificationPreferences,
            { body }
          );
        set({ notificationPreferences });
      },
    }),
    {
      name: "nibbl-consumer-api",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        pendingEmail: state.pendingEmail,
      }),
    }
  )
);
