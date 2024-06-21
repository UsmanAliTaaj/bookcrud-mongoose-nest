import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsEmail({}, {message: 'Please enter correct email'})
  readonly email: string;

  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

}
