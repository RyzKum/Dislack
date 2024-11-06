import { create } from "zustand";

interface MessageState {
  messages: Map<string, string>;
  addMessage: (content: string) => void;
  setMessages: (newMessages: Map<string, string>) => void;
  removeMessage: (uid: string) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: new Map(),

  addMessage: (content) => {
    const uid = crypto.randomUUID();
    set((state) => {
      const newMessages = new Map(state.messages);
      newMessages.set(uid, content);
      return { messages: newMessages };
    });
    return uid;
  },

  setMessages: (newMessages) => set(() => ({ messages: newMessages })),

  removeMessage: (uid) =>
    set((state) => {
      const newMessages = new Map(state.messages);
      newMessages.delete(uid);
      return { messages: newMessages };
    }),
}));
