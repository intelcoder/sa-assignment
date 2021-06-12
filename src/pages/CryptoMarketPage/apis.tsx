import { useQuery, QueryClient } from 'react-query'
import { IQuote, TQuotes } from 'redux/CryptoMarketPage/types'
import { cryptoFetcher } from 'services/api'

interface IFetchQuoteProps {
  selectedCoinId: number | string,
  onQuoteFetchSuccess: (a: IQuote) => void,
}

interface IFetchSymbolProps {
  params?: {
    limit?: number,
    sort?: string,
  }
}

interface IQuoteResponse {
  [key: number]: IQuote[],
}

type TOnQuotesFetchSuccess = (a: TQuotes) => void
type TSetSelectedCoinIds = (a: number[]) => void

export const preFetchMultipleQuotes = async(
  queryClient: QueryClient,
  coinIds: number[],
  onQuotesFetchSuccess: TOnQuotesFetchSuccess,
  setSelectedCoinIds: TSetSelectedCoinIds,
) => {
  const callUniqKey = ['quotes', coinIds]
  await queryClient.prefetchQuery(['quotes', coinIds], () =>
    cryptoFetcher('/quotes', { params: { id: coinIds.join(',') } }))
  const quotesResponse: IQuoteResponse | undefined = queryClient.getQueryData(callUniqKey)
  if(quotesResponse) {
    const newQuoteMap = new Map()
    const selectedCoinIds = []
    for(let [key, quote] of Object.entries(quotesResponse)) {
      selectedCoinIds.push(quote.id)
      newQuoteMap.set(quote.id, quote)
    }
    setSelectedCoinIds(selectedCoinIds)
    onQuotesFetchSuccess(newQuoteMap)
  }
}

export const useFetchSymbols = (
  {
    params = {}
  }: IFetchSymbolProps
) =>
  useQuery(['symbols', params], () => cryptoFetcher('/map'))

export const useFetchQuote = (props: IFetchQuoteProps) => {
  const { selectedCoinId, onQuoteFetchSuccess } = props
  return useQuery(
    ['quotes', selectedCoinId],
    () => cryptoFetcher('/quotes', { params: { id: selectedCoinId } }),
    {
      enabled: Boolean(selectedCoinId),
      keepPreviousData: true,
      onSuccess: (data) => {
        if(data && data[selectedCoinId]) {
          // save it in reducer
          onQuoteFetchSuccess(data[selectedCoinId])
        }
      }
    },
  )
}
