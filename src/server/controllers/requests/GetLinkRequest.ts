import { IsString, MaxLength } from 'class-validator'

export class GetLinkRequest {
  @IsString()
  @MaxLength(32)
  code: string
}
