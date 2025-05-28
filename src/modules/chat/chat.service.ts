import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Chat } from "./schemas/chat.schema";
import { Message } from "./schemas/message.schema";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(Message.name) private messageModel: Model<Message>
  ) {}

  async getChats(user_id: string) {
    const chats = await this.chatModel.find({ user_id: user_id }).exec();
    return chats;
  }

  async getMessages(chat_id: string) {
    const objectId = new Types.ObjectId(chat_id);
    const messages = await this.messageModel.find({ chat_id: objectId }).exec();
    return messages;
  }
}