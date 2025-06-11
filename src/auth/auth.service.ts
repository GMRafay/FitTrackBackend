import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService) {}
   

    async signup(dto: AuthDto) {
        // generate the password hash
        const hash = await argon.hash(dto.password);
        try{



            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            });
    
            
    
            // return the saved user
            return user;


        } catch(error) {
            console.log(error.code);
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials Taken',);
                }
            }
            throw error;
        }
        
        
    }

    async signin(dto: AuthDto) {
        // find user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        // if user doesnt exist throw exception
        if (!user) throw new ForbiddenException('Credentials incorret',);

        // compare password
        const pwMatches = await argon.verify(user.hash,dto.password,);
        
        // if password incorrect throw exception
        if (!pwMatches)  throw new ForbiddenException('Credentials incorret',);

        // return user if everything is all good
        
        return user;
        
    }
}