export interface IQuote {
  cmc_rank: number,
  id: number,
  symbol: string,
  quote: {
    USD: {
      price: number,
    }
  }
}

export interface IState {
  quotes: IQuote[]

}