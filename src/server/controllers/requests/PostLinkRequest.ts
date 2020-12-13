import {
  IsEnum,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ValidateIf,
} from 'class-validator'

import { Obfuscation } from '../../../types'

export class PostLinkRequest {
  @IsString()
  @IsOptional()
  @MaxLength(32)
  code: string | undefined

  @IsEnum(Obfuscation)
  obfuscation: Obfuscation

  @IsUrl()
  destination: string

  @IsIn(['GET', 'POST'])
  method: string

  @ValidateIf((o) => o.method === 'POST')
  @IsObject()
  body: Record<string, unknown>
}
