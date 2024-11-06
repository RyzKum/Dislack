import { create } from "zustand";

export type MessageType = {
  id: string;
  content: string;
  emitterId: string;
  sendAt: string;
}

interface MessageState {
  messages: MessageType[];
  addMessage: (content: string, emitterId: string) => void;
  setMessages: (newMessages: MessageType[]) => void;
  removeMessage: (uid: string) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],

  addMessage: (content, id) => {
    const uid = crypto.randomUUID();
    const newMessage: MessageType = {
      id: uid,
      content: content,
      emitterId: id,
      sendAt: '',
    }
    set((state) => {
      const newMessages = state.messages;
      newMessages.push(newMessage);
      return { messages: newMessages }
    });
    return uid;
  },

  setMessages: (newMessages) => set(() => ({ messages: newMessages })),

  removeMessage: (uid) =>
    set((state) => {
      const newMessages = state.messages;
      const index = newMessages.findIndex((e) => e.id == uid);
      newMessages.splice(index, 1);
      return { messages: newMessages };
    }),
}));
