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

export type TQuotes = Map<string, IQuote>
export interface IState {
  quotes: TQuotes
}