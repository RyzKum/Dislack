import { create } from "zustand";

export interface MessageContent {
  content: string;
  emitterId: string;
  sendAt?: string;
}

interface MessageState {
  messages: Map<string, MessageContent>;
  addMessage: (content: MessageContent) => void;
  setMessages: (newMessages: Map<string, MessageContent>) => void;
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
