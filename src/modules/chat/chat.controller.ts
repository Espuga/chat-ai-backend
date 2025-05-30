import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { MessageDTO } from "./dto/message.dto";

@Controller("/chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getChats(@Req() req) {
    const user_id = req.user._id;
    return this.chatService.getChats(user_id);
  }

  @Post()
  createChat(@Req() req) {
    const user_id = req.user._id;
    return this.chatService.createChat(user_id);
  }

  @Get("/:chat_id/messages")
  getChatMessages(@Param('chat_id') chatId: string) {
    return this.chatService.getMessages(chatId);
  }

  @Post("/message")
  newMessage(@Body() message: MessageDTO) {
    return this.chatService.newMessage(message);
  }

}