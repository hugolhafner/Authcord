import { Body, JsonController, Post } from 'routing-controllers'

import { AuthService } from '../services/AuthService'
import { PostLoginRequest } from './requests/PostLoginRequest'

@JsonController('/auth')
export class LinkController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  public async login(@Body() body: PostLoginRequest): Promise<boolean> {
    return true
  }
}
