import {
  Authorized,
  Body,
  Get,
  JsonController,
  Post,
  QueryParams,
  UnauthorizedError,
} from 'routing-controllers'

import { LinkService } from '../services/LinkService'
import { GetLinkRequest } from './requests/GetLinkRequest'
import { PostLinkRequest } from './requests/PostLinkRequest'

@JsonController('/l')
export class LinkController {
  constructor(private linkService: LinkService) {}

  /**
   * getLink
   * * Route to redirect users to the link corresponding to the code in the request.
   * @param {GetLinkRequest} query
   * @returns {Promise.<HitInterface<ProductInterface>[]>} returns list of products matching criteria
   */
  @Get()
  @Authorized(['user']) // Admins and users
  public async getLink(@QueryParams() query: GetLinkRequest): Promise<void> {
    const link = await this.linkService.getLinkFromCode(query.code)
    if (typeof link === 'undefined')
      throw new UnauthorizedError('Invalid or expired authentication token.')
    // return user.toObject()
  }

  // @Post('/l')
  // @Authorized() // Empty roles means admin only
  // public async createLink(@Body() body: PostLinkRequest): Promise<void> {
  //   const insert = await this.linkService.createLink(body)
  // }
}
