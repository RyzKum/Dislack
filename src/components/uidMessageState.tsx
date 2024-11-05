import { create } from "zustand";

interface MessageState {
  messages: Map<string, string>;
  addMessage: (uid: string, content: string) => void;
  removeMessage: (uid: string) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: new Map(),
  addMessage: (uid, content) =>
    set((state) => {
      const newMessages = new Map(state.messages);
      newMessages.set(uid, content);
      return { messages: newMessages };
    }),
  removeMessage: (uid) =>
    set((state) => {
      const newMessages = new Map(state.messages);
      newMessages.delete(uid);
      return { messages: newMessages };
    }),
}));
