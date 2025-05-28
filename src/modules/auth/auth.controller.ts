import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { LoginDTO } from "./dto/login.dto";
import { UserDTO } from "./dto/user.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("/auth")
export class AuthController{
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @Post("/register")
  register(@Body() createUserDTO: CreateUserDTO) {
    return this.authService.register(createUserDTO);
  }

  @Get('me')
  me(@Req() req) {
    return new UserDTO({ 
      name: req.user.name, 
      token: req.headers.authorization.split(' ')[1]
    });
  }

}