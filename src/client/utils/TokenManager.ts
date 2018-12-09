import * as _ from "lodash";

export interface IStorage {
  set(key: string, val: string): void
  get(key: string): string | null
  remove(key: string)
}

export class Token {
  /**
   * Http header name to send and recieve the token value
   */
  tokenName: string

  /**
   * The key name in storage to access the token value
   */
  aliasName: string

  /**
   * Token storage util
   */
  storage?: IStorage
}

export class TokenManager {
  /**
   * instances of token
   */
  private static tokens: Token[] = []
  private static defaultStorage: IStorage = null

  /**
   * Register the token to token list.
   * @param token 
   */
  public static register(...tokens: Token[]): void {
    this.tokens.push(...tokens)
    this.tokens = _.uniqWith<Token>(this.tokens, _.isEqual)
  }

  /**
   * Set the default storage
   * @param storage 
   */
  public static setDefaultStorage(storage: IStorage) {
    this.defaultStorage = storage
  }

  /**
   * Store the token value to the storage.
   * @param tokenName 
   * @param tokenValue 
   */
  public static set(tokenName: string, tokenValue: string): boolean {
    let token: Token = this.tokens.find(token => token.tokenName === tokenName)
    if (!token) return false

    let storage = token.storage || this.defaultStorage
    if (!storage) return false

    let key = token.aliasName || token.tokenName
    storage.set(key, tokenValue)
    return true
  }

  /**
   * Get the token value
   * @param tokenName 
   */
  public static get(tokenName): string {
    let token: Token = this.tokens.find(token => token.tokenName === tokenName)
    if (!token) return null

    let storage = token.storage || this.defaultStorage
    if (!storage) return null

    let key = token.aliasName || token.tokenName
    let value = storage.get(key)
    return value || null
  }

  /**
   * Clear specified tokens or all tokens.
   * TODO: Clear the storage token values.
   * @param _token 
   */
  public static clear(...tokenNames: string[]): void {
    let tokens: Token[] = !tokenNames.length ? 
      this.tokens : 
      this.tokens.filter(token => _.includes(tokenNames, token.tokenName))

    tokens.forEach(token => {
      let storage = token.storage || this.defaultStorage
      if (!storage) return

      let key = token.aliasName || token.tokenName
      storage.remove(key)
    })
  }
}
