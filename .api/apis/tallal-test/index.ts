import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'tallal-test/1.0.0-oas3 (api/6.1.2)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Get activities of a collection
   *
   * @throws FetchError<400, types.GetCollectionsSymbolActivitiesResponse400> Invalid symbol
   */
  getCollectionsSymbolActivities(metadata: types.GetCollectionsSymbolActivitiesMetadataParam): Promise<FetchResponse<200, types.GetCollectionsSymbolActivitiesResponse200>> {
    return this.core.fetch('/collections/{symbol}/activities', 'get', metadata);
  }

  /**
   * Get stats of a collection
   *
   * @throws FetchError<400, types.GetCollectionsSymbolStatsResponse400> Invalid symbol
   * @throws FetchError<404, types.GetCollectionsSymbolStatsResponse404> Collection not found
   */
  getCollectionsSymbolStats(metadata: types.GetCollectionsSymbolStatsMetadataParam): Promise<FetchResponse<200, types.GetCollectionsSymbolStatsResponse200>> {
    return this.core.fetch('/collections/{symbol}/stats', 'get', metadata);
  }

  /**
   * Get attributes of a collection
   *
   * @throws FetchError<400, types.GetCollectionsCollectionsymbolAttributesResponse400> Invalid symbol
   * @throws FetchError<404, types.GetCollectionsCollectionsymbolAttributesResponse404> Collection not found
   */
  getCollectionsCollectionsymbolAttributes(metadata: types.GetCollectionsCollectionsymbolAttributesMetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionsymbolAttributesResponse200>> {
    return this.core.fetch('/collections/{collectionSymbol}/attributes', 'get', metadata);
  }

  /**
   * Get collections
   *
   */
  getCollections(metadata?: types.GetCollectionsMetadataParam): Promise<FetchResponse<200, types.GetCollectionsResponse200>> {
    return this.core.fetch('/collections', 'get', metadata);
  }

  /**
   * Get listings of a collection
   *
   * @throws FetchError<400, types.GetCollectionsSymbolListingsResponse400> Invalid symbol
   */
  getCollectionsSymbolListings(metadata: types.GetCollectionsSymbolListingsMetadataParam): Promise<FetchResponse<200, types.GetCollectionsSymbolListingsResponse200>> {
    return this.core.fetch('/collections/{symbol}/listings', 'get', metadata);
  }

  /**
   * Get batch listings of a collection
   *
   * @throws FetchError<400, types.PostCollectionsBatchListingsResponse400> Invalid symbol
   */
  postCollectionsBatchListings(body: types.PostCollectionsBatchListingsBodyParam, metadata?: types.PostCollectionsBatchListingsMetadataParam): Promise<FetchResponse<200, types.PostCollectionsBatchListingsResponse200>> {
    return this.core.fetch('/collections/batch/listings', 'post', body, metadata);
  }

  /**
   * Get holder stats of a collection
   *
   * @throws FetchError<400, types.GetCollectionsSymbolHolderStatsResponse400> Bad request
   */
  getCollectionsSymbolHolder_stats(metadata: types.GetCollectionsSymbolHolderStatsMetadataParam): Promise<FetchResponse<200, types.GetCollectionsSymbolHolderStatsResponse200>> {
    return this.core.fetch('/collections/{symbol}/holder_stats', 'get', metadata);
  }

  /**
   * Get wallets rank sorted by volume for one collection
   *
   * @throws FetchError<400, types.GetCollectionsSymbolLeaderboardResponse400> Bad request
   */
  getCollectionsSymbolLeaderboard(metadata: types.GetCollectionsSymbolLeaderboardMetadataParam): Promise<FetchResponse<200, types.GetCollectionsSymbolLeaderboardResponse200>> {
    return this.core.fetch('/collections/{symbol}/leaderboard', 'get', metadata);
  }

  /**
   * Get launchpad collections
   *
   */
  getLaunchpadCollections(metadata?: types.GetLaunchpadCollectionsMetadataParam): Promise<FetchResponse<200, types.GetLaunchpadCollectionsResponse200>> {
    return this.core.fetch('/launchpad/collections', 'get', metadata);
  }

  /**
   * Get the top popular collections for a time range
   *
   */
  getMarketplacePopular_collections(metadata?: types.GetMarketplacePopularCollectionsMetadataParam): Promise<FetchResponse<200, types.GetMarketplacePopularCollectionsResponse200>> {
    return this.core.fetch('/marketplace/popular_collections', 'get', metadata);
  }

  /**
   * Get AMM pools corresponding to an owner or collection symbol. At least one of required
   * collectionSymbol or owner is required!
   *
   */
  getMmmPools(metadata?: types.GetMmmPoolsMetadataParam): Promise<FetchResponse<200, types.GetMmmPoolsResponse200>> {
    return this.core.fetch('/mmm/pools', 'get', metadata);
  }

  /**
   * Get AMM pools grouped by a reference price corresponding to a collection symbol, summing
   * up the total buy side liquidity for each group.
   *
   */
  getMmmPoolsBuyWalls(metadata?: types.GetMmmPoolsBuyWallsMetadataParam): Promise<FetchResponse<200, types.GetMmmPoolsBuyWallsResponse200>> {
    return this.core.fetch('/mmm/pools/buy-walls', 'get', metadata);
  }

  /**
   * Get best offers for an NFT
   *
   */
  getMmmTokenMint_addressPools(metadata: types.GetMmmTokenMintAddressPoolsMetadataParam): Promise<FetchResponse<200, types.GetMmmTokenMintAddressPoolsResponse200>> {
    return this.core.fetch('/mmm/token/{mint_address}/pools', 'get', metadata);
  }

  /**
   * Get listings for a token
   *
   * @throws FetchError<400, types.GetTokensTokenMintListingsResponse400> Token not found
   */
  getTokensToken_mintListings(metadata: types.GetTokensTokenMintListingsMetadataParam): Promise<FetchResponse<200, types.GetTokensTokenMintListingsResponse200>> {
    return this.core.fetch('/tokens/{token_mint}/listings', 'get', metadata);
  }

  /**
   * Get received offers for a token
   *
   * @throws FetchError<400, types.GetTokensTokenMintOffersReceivedResponse400> Token not found
   */
  getTokensToken_mintOffers_received(metadata: types.GetTokensTokenMintOffersReceivedMetadataParam): Promise<FetchResponse<200, types.GetTokensTokenMintOffersReceivedResponse200>> {
    return this.core.fetch('/tokens/{token_mint}/offers_received', 'get', metadata);
  }

  /**
   * Get activities for a token
   *
   * @throws FetchError<400, types.GetTokensTokenMintActivitiesResponse400> Token not found
   */
  getTokensToken_mintActivities(metadata: types.GetTokensTokenMintActivitiesMetadataParam): Promise<FetchResponse<200, types.GetTokensTokenMintActivitiesResponse200>> {
    return this.core.fetch('/tokens/{token_mint}/activities', 'get', metadata);
  }

  /**
   * Get token metadata by mint address
   *
   * @throws FetchError<400, types.GetTokensTokenMintResponse400> Token not found
   */
  getTokensToken_mint(metadata: types.GetTokensTokenMintMetadataParam): Promise<FetchResponse<200, types.GetTokensTokenMintResponse200>> {
    return this.core.fetch('/tokens/{token_mint}', 'get', metadata);
  }

  /**
   * Get tokens owned by a wallet.
   *
   * @throws FetchError<400, types.GetWalletsWalletAddressTokensResponse400> Wallet not found
   */
  getWalletsWallet_addressTokens(metadata: types.GetWalletsWalletAddressTokensMetadataParam): Promise<FetchResponse<200, types.GetWalletsWalletAddressTokensResponse200>> {
    return this.core.fetch('/wallets/{wallet_address}/tokens', 'get', metadata);
  }

  /**
   * Get info about the wallet owner.
   *
   * @throws FetchError<400, types.GetWalletsWalletAddressResponse400> Wallet not found
   */
  getWalletsWallet_address(metadata: types.GetWalletsWalletAddressMetadataParam): Promise<FetchResponse<200, types.GetWalletsWalletAddressResponse200>> {
    return this.core.fetch('/wallets/{wallet_address}', 'get', metadata);
  }

  /**
   * Get activities of a wallet.
   *
   * @throws FetchError<400, types.GetWalletsWalletAddressActivitiesResponse400> Wallet not found
   */
  getWalletsWallet_addressActivities(metadata: types.GetWalletsWalletAddressActivitiesMetadataParam): Promise<FetchResponse<200, types.GetWalletsWalletAddressActivitiesResponse200>> {
    return this.core.fetch('/wallets/{wallet_address}/activities', 'get', metadata);
  }

  /**
   * Get offers made by a wallet.
   *
   * @throws FetchError<400, types.GetWalletsWalletAddressOffersMadeResponse400> Wallet not found
   */
  getWalletsWallet_addressOffers_made(metadata: types.GetWalletsWalletAddressOffersMadeMetadataParam): Promise<FetchResponse<200, types.GetWalletsWalletAddressOffersMadeResponse200>> {
    return this.core.fetch('/wallets/{wallet_address}/offers_made', 'get', metadata);
  }

  /**
   * Get offers received by a wallet.
   *
   * @throws FetchError<400, types.GetWalletsWalletAddressOffersReceivedResponse400> Wallet not found
   */
  getWalletsWallet_addressOffers_received(metadata: types.GetWalletsWalletAddressOffersReceivedMetadataParam): Promise<FetchResponse<200, types.GetWalletsWalletAddressOffersReceivedResponse200>> {
    return this.core.fetch('/wallets/{wallet_address}/offers_received', 'get', metadata);
  }

  /**
   * Get escrow balance for a wallet.
   *
   * @throws FetchError<400, types.GetWalletsWalletAddressEscrowBalanceResponse400> Wallet not found
   */
  getWalletsWallet_addressEscrow_balance(metadata: types.GetWalletsWalletAddressEscrowBalanceMetadataParam): Promise<FetchResponse<200, types.GetWalletsWalletAddressEscrowBalanceResponse200>> {
    return this.core.fetch('/wallets/{wallet_address}/escrow_balance', 'get', metadata);
  }

  /**
   * Get instruction to create a pool
   *
   */
  getInstructionsMmmCreatePool(metadata: types.GetInstructionsMmmCreatePoolMetadataParam): Promise<FetchResponse<200, types.GetInstructionsMmmCreatePoolResponse200>> {
    return this.core.fetch('/instructions/mmm/create-pool', 'get', metadata);
  }

  /**
   * Get instruction to update an existing pool
   *
   */
  getInstructionsMmmUpdatePool(metadata: types.GetInstructionsMmmUpdatePoolMetadataParam): Promise<FetchResponse<200, types.GetInstructionsMmmUpdatePoolResponse200>> {
    return this.core.fetch('/instructions/mmm/update-pool', 'get', metadata);
  }

  /**
   * Get instruction to deposit an sol payment into a pool
   *
   */
  getInstructionsMmmSolDepositBuy(metadata: types.GetInstructionsMmmSolDepositBuyMetadataParam): Promise<FetchResponse<200, types.GetInstructionsMmmSolDepositBuyResponse200>> {
    return this.core.fetch('/instructions/mmm/sol-deposit-buy', 'get', metadata);
  }

  /**
   * Get instruction to withdraw sol payment from a pool
   *
   */
  getInstructionsMmmSolWithdrawBuy(metadata: types.GetInstructionsMmmSolWithdrawBuyMetadataParam): Promise<FetchResponse<200, types.GetInstructionsMmmSolWithdrawBuyResponse200>> {
    return this.core.fetch('/instructions/mmm/sol-withdraw-buy', 'get', metadata);
  }

  /**
   * Get instruction to close a pool after all assets and payment have been withdrawn
   *
   */
  getInstructionsMmmSolClosePool(metadata: types.GetInstructionsMmmSolClosePoolMetadataParam): Promise<FetchResponse<200, types.GetInstructionsMmmSolClosePoolResponse200>> {
    return this.core.fetch('/instructions/mmm/sol-close-pool', 'get', metadata);
  }

  /**
   * Get instruction to have a pool fulfill a buy
   *
   */
  getInstructionsMmmSolFulfillBuy(metadata: types.GetInstructionsMmmSolFulfillBuyMetadataParam): Promise<FetchResponse<200, types.GetInstructionsMmmSolFulfillBuyResponse200>> {
    return this.core.fetch('/instructions/mmm/sol-fulfill-buy', 'get', metadata);
  }

  /**
   * Get instruction to have a pool fulfill a sell
   *
   */
  getInstructionsMmmSolFulfillSell(metadata: types.GetInstructionsMmmSolFulfillSellMetadataParam): Promise<FetchResponse<200, types.GetInstructionsMmmSolFulfillSellResponse200>> {
    return this.core.fetch('/instructions/mmm/sol-fulfill-sell', 'get', metadata);
  }

  /**
   * Get instruction to buy (bid)
   *
   */
  getInstructionsBuy(metadata: types.GetInstructionsBuyMetadataParam): Promise<FetchResponse<200, types.GetInstructionsBuyResponse200>> {
    return this.core.fetch('/instructions/buy', 'get', metadata);
  }

  /**
   * Get instruction to buy now and transfer nft to another owner
   *
   */
  getInstructionsBuy_now_transfer_nft(metadata: types.GetInstructionsBuyNowTransferNftMetadataParam): Promise<FetchResponse<200, types.GetInstructionsBuyNowTransferNftResponse200>> {
    return this.core.fetch('/instructions/buy_now_transfer_nft', 'get', metadata);
  }

  /**
   * Get instruction to buy now
   *
   */
  getInstructionsBuy_now(metadata: types.GetInstructionsBuyNowMetadataParam): Promise<FetchResponse<200, types.GetInstructionsBuyNowResponse200>> {
    return this.core.fetch('/instructions/buy_now', 'get', metadata);
  }

  /**
   * Get instruction to cancel a buy
   *
   */
  getInstructionsBuy_cancel(metadata: types.GetInstructionsBuyCancelMetadataParam): Promise<FetchResponse<200, types.GetInstructionsBuyCancelResponse200>> {
    return this.core.fetch('/instructions/buy_cancel', 'get', metadata);
  }

  /**
   * Get instruction to change a buy price
   *
   */
  getInstructionsBuy_change_price(metadata: types.GetInstructionsBuyChangePriceMetadataParam): Promise<FetchResponse<200, types.GetInstructionsBuyChangePriceResponse200>> {
    return this.core.fetch('/instructions/buy_change_price', 'get', metadata);
  }

  /**
   * Get instruction to sell (list)
   *
   */
  getInstructionsSell(metadata: types.GetInstructionsSellMetadataParam): Promise<FetchResponse<200, types.GetInstructionsSellResponse200>> {
    return this.core.fetch('/instructions/sell', 'get', metadata);
  }

  /**
   * Get instruction to change a sell price
   *
   */
  getInstructionsSell_change_price(metadata: types.GetInstructionsSellChangePriceMetadataParam): Promise<FetchResponse<200, types.GetInstructionsSellChangePriceResponse200>> {
    return this.core.fetch('/instructions/sell_change_price', 'get', metadata);
  }

  /**
   * Get instruction to sell now (accept offer)
   *
   */
  getInstructionsSell_now(metadata: types.GetInstructionsSellNowMetadataParam): Promise<FetchResponse<200, types.GetInstructionsSellNowResponse200>> {
    return this.core.fetch('/instructions/sell_now', 'get', metadata);
  }

  /**
   * Get instruction to cancel a sell
   *
   */
  getInstructionsSell_cancel(metadata: types.GetInstructionsSellCancelMetadataParam): Promise<FetchResponse<200, types.GetInstructionsSellCancelResponse200>> {
    return this.core.fetch('/instructions/sell_cancel', 'get', metadata);
  }

  /**
   * Get instruction to deposit to escrow
   *
   */
  getInstructionsDeposit(metadata: types.GetInstructionsDepositMetadataParam): Promise<FetchResponse<200, types.GetInstructionsDepositResponse200>> {
    return this.core.fetch('/instructions/deposit', 'get', metadata);
  }

  /**
   * Get instruction to withdraw from escrow
   *
   */
  getInstructionsWithdraw(metadata: types.GetInstructionsWithdrawMetadataParam): Promise<FetchResponse<200, types.GetInstructionsWithdrawResponse200>> {
    return this.core.fetch('/instructions/withdraw', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { GetCollectionsCollectionsymbolAttributesMetadataParam, GetCollectionsCollectionsymbolAttributesResponse200, GetCollectionsCollectionsymbolAttributesResponse400, GetCollectionsCollectionsymbolAttributesResponse404, GetCollectionsMetadataParam, GetCollectionsResponse200, GetCollectionsSymbolActivitiesMetadataParam, GetCollectionsSymbolActivitiesResponse200, GetCollectionsSymbolActivitiesResponse400, GetCollectionsSymbolHolderStatsMetadataParam, GetCollectionsSymbolHolderStatsResponse200, GetCollectionsSymbolHolderStatsResponse400, GetCollectionsSymbolLeaderboardMetadataParam, GetCollectionsSymbolLeaderboardResponse200, GetCollectionsSymbolLeaderboardResponse400, GetCollectionsSymbolListingsMetadataParam, GetCollectionsSymbolListingsResponse200, GetCollectionsSymbolListingsResponse400, GetCollectionsSymbolStatsMetadataParam, GetCollectionsSymbolStatsResponse200, GetCollectionsSymbolStatsResponse400, GetCollectionsSymbolStatsResponse404, GetInstructionsBuyCancelMetadataParam, GetInstructionsBuyCancelResponse200, GetInstructionsBuyChangePriceMetadataParam, GetInstructionsBuyChangePriceResponse200, GetInstructionsBuyMetadataParam, GetInstructionsBuyNowMetadataParam, GetInstructionsBuyNowResponse200, GetInstructionsBuyNowTransferNftMetadataParam, GetInstructionsBuyNowTransferNftResponse200, GetInstructionsBuyResponse200, GetInstructionsDepositMetadataParam, GetInstructionsDepositResponse200, GetInstructionsMmmCreatePoolMetadataParam, GetInstructionsMmmCreatePoolResponse200, GetInstructionsMmmSolClosePoolMetadataParam, GetInstructionsMmmSolClosePoolResponse200, GetInstructionsMmmSolDepositBuyMetadataParam, GetInstructionsMmmSolDepositBuyResponse200, GetInstructionsMmmSolFulfillBuyMetadataParam, GetInstructionsMmmSolFulfillBuyResponse200, GetInstructionsMmmSolFulfillSellMetadataParam, GetInstructionsMmmSolFulfillSellResponse200, GetInstructionsMmmSolWithdrawBuyMetadataParam, GetInstructionsMmmSolWithdrawBuyResponse200, GetInstructionsMmmUpdatePoolMetadataParam, GetInstructionsMmmUpdatePoolResponse200, GetInstructionsSellCancelMetadataParam, GetInstructionsSellCancelResponse200, GetInstructionsSellChangePriceMetadataParam, GetInstructionsSellChangePriceResponse200, GetInstructionsSellMetadataParam, GetInstructionsSellNowMetadataParam, GetInstructionsSellNowResponse200, GetInstructionsSellResponse200, GetInstructionsWithdrawMetadataParam, GetInstructionsWithdrawResponse200, GetLaunchpadCollectionsMetadataParam, GetLaunchpadCollectionsResponse200, GetMarketplacePopularCollectionsMetadataParam, GetMarketplacePopularCollectionsResponse200, GetMmmPoolsBuyWallsMetadataParam, GetMmmPoolsBuyWallsResponse200, GetMmmPoolsMetadataParam, GetMmmPoolsResponse200, GetMmmTokenMintAddressPoolsMetadataParam, GetMmmTokenMintAddressPoolsResponse200, GetTokensTokenMintActivitiesMetadataParam, GetTokensTokenMintActivitiesResponse200, GetTokensTokenMintActivitiesResponse400, GetTokensTokenMintListingsMetadataParam, GetTokensTokenMintListingsResponse200, GetTokensTokenMintListingsResponse400, GetTokensTokenMintMetadataParam, GetTokensTokenMintOffersReceivedMetadataParam, GetTokensTokenMintOffersReceivedResponse200, GetTokensTokenMintOffersReceivedResponse400, GetTokensTokenMintResponse200, GetTokensTokenMintResponse400, GetWalletsWalletAddressActivitiesMetadataParam, GetWalletsWalletAddressActivitiesResponse200, GetWalletsWalletAddressActivitiesResponse400, GetWalletsWalletAddressEscrowBalanceMetadataParam, GetWalletsWalletAddressEscrowBalanceResponse200, GetWalletsWalletAddressEscrowBalanceResponse400, GetWalletsWalletAddressMetadataParam, GetWalletsWalletAddressOffersMadeMetadataParam, GetWalletsWalletAddressOffersMadeResponse200, GetWalletsWalletAddressOffersMadeResponse400, GetWalletsWalletAddressOffersReceivedMetadataParam, GetWalletsWalletAddressOffersReceivedResponse200, GetWalletsWalletAddressOffersReceivedResponse400, GetWalletsWalletAddressResponse200, GetWalletsWalletAddressResponse400, GetWalletsWalletAddressTokensMetadataParam, GetWalletsWalletAddressTokensResponse200, GetWalletsWalletAddressTokensResponse400, PostCollectionsBatchListingsBodyParam, PostCollectionsBatchListingsMetadataParam, PostCollectionsBatchListingsResponse200, PostCollectionsBatchListingsResponse400 } from './types';
