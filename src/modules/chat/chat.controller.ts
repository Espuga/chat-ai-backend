import { Controller, Get, Param, Req } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller("/chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getChats(@Req() req) {
    const user_id = req.user._id;
    return this.chatService.getChats(user_id);
  }

  @Get("/:chat_id/messages")
  getChatMessages(@Param('chat_id') chatId: string) {
    return this.chatService.getMessages(chatId);
  }

}