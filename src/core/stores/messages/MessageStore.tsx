import { create } from "zustand";
import { Message } from "../../../types/Message";
interface MessageState {
  messages: Message[];
  addMessage: (content: string, emitterId: string) => string;
  setMessages: (newMessages: Message[]) => void;
  removeMessage: (uid: string) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],

  addMessage: (content, id) => {
    const uid = crypto.randomUUID();
    const newMessage: Message = {
      id: uid,
      content: content,
      emitterId: id,
      sendAt:  new Date().toDateString(),
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
