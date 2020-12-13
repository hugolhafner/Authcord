import { Service } from 'typedi'

@Service()
export class AuthService {
  /**
   * getToken
   * * Create a token for user.
   * @param {TokenRequest} body login data from the client.
   * @returns {Promise.<Token>} the token
   * @async
   */
  public async getLinkFromCode(code: string): Promise<string> {
    return ''
  }
}
