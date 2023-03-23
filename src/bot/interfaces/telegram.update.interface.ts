export interface TelegramUpdate {
  update_id: number;
  chat_member: {
    chat: {
      id: string;
      title: string;
      type: string;
    };
    new_chat_member: {
      status: string;
    };
  };
}
