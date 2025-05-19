import prisma from '@/configs/db.config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRole } from "@prisma/client"
import TokenService from './token.service';


export class AuthService {
  static async register(data: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    phone?: string;
  }) {
    const { email, password, confirmPassword, name, phone } = data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }
    if (password.trim() !== confirmPassword) {
      throw new Error("Passwords should match!")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        confirmPassword,
        name,
        phone,
        role: UserRole.CITIZEN,
      },
    });

    return AuthService.generateToken(user);
  }
  static async registerAgencyStaff(data: {
    email: string;
    agencyId: number;
    password: string;
    confirmPassword: string;
    name: string;
    phone?: string;
    position?: string;
  }) {
    const { email, password, confirmPassword, name, phone, agencyId, position } = data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }
    if (password.trim() !== confirmPassword) {
      throw new Error("Passwords should match!")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        confirmPassword,
        name,
        phone,
        role: UserRole.AGENCY_STAFF,
      },
    });
    await prisma.agencyStaff.create({
      data: {
        agencyId,
        position,
        userId: user.id
      }
    })

    return AuthService.generateToken(user);
  }


  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return AuthService.generateToken(user);
  }

  static async fetchProfile (email:string){
    const user = await prisma.user.findUnique({ where: { email } ,include:{
      agencyStaff:{
        select:{
          agency:true
        }
      },

    },
    omit:{
      confirmPassword:true,
      password:true
    }
  },
  
  
);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  static async getAllUsers(){
    const users = await prisma.user.findMany({
      include:{
        agencyStaff:true
      }
    });
    return users;

  }

  static generateToken(user: { id: number; email: string; role: UserRole }) {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const token = TokenService.generateToken(payload);

    return { token, user: payload };
  }
}
