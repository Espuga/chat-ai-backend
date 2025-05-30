import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Chat } from "./schemas/chat.schema";
import { Message } from "./schemas/message.schema";
import { MessageDTO } from "./dto/message.dto";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(Message.name) private messageModel: Model<Message>
  ) {}

  async getChats(user_id: string) {
    const chats = await this.chatModel
      .find({ user_id: user_id })
      .sort({ updatedAt: -1 }) // <-- sort in query
      .exec();
    return chats;
  }

  async createChat(user_id: string) {
    const chat = await this.chatModel.insertOne({ description: "New Chat", user_id: new Types.ObjectId(user_id) });
    return chat;
  }
  

  async getMessages(chat_id: string) {
    const objectId = new Types.ObjectId(chat_id);
    const messages = await this.messageModel.find({ chat_id: objectId }).exec();
    return messages;
  }

  async sleep (ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  async newMessage(message: MessageDTO) {
    const messageDB = await this.messageModel.insertOne({ chat_id: new Types.ObjectId(message.chat_id), role: message.role, message: message.message });
    await this.sleep(10000);
    return messageDB;
  }
}