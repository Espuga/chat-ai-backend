import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { LoginDTO } from "./dto/login.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { UserDTO } from "./dto/user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async login(loginDTO: LoginDTO): Promise<UserDTO> {
    const user = await this.userModel.findOne({ email: loginDTO.email }).exec();

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(loginDTO.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload, { expiresIn: '1d' });

    return { name: user.name, token: token };
  }

  async register(createUserDto: CreateUserDTO): Promise<UserDTO> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password!, 10);
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await user.save();

    const payload = { sub: savedUser.id, email: savedUser.email };
    const token = await this.jwtService.signAsync(payload, { expiresIn: '1d' });

    return {
      name: savedUser.name,
      token
    };
  }

  async getUserById(id: string) {
    return this.userModel.findById(id).select('-password').exec();
  }
}