import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { LoginDTO } from "./dto/login.dto";
import { AuthGuard } from "@nestjs/passport";


@Controller("/auth")
export class AuthController{
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @Post()
  register(@Body() createUserDTO: CreateUserDTO) {
    return this.authService.register(createUserDTO);
  }

  @Get("/test")
  @UseGuards(AuthGuard('jwt'))
  test(): string {
    return "test";
  }

}