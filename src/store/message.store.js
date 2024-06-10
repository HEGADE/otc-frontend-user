import { create } from "zustand";

export const useConversation = create((set) => ({
  unreadMessages: [],
  setUnreadMessages: (unreadMessages) => set({ unreadMessages }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));
