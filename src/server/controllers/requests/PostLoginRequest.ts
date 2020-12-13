import { IsEmail, IsString, Length } from 'class-validator'

export class PostLoginRequest {
  @IsEmail()
  email: string

  @IsString()
  @Length(8, 512)
  password: string
}
