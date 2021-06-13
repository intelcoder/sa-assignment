import { useQuery, QueryClient } from 'react-query'
import { IQuote, TQuotes } from 'types/cryptoMarket'
import { cryptoFetcher } from 'services/api'

interface IFetchQuoteProps {
  selectedCryptoId: number | string,
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
  cryptoIds: number[],
  onQuotesFetchSuccess: TOnQuotesFetchSuccess,
  setSelectedCryptoIds: TSetSelectedCoinIds,
) => {
  const callUniqKey = ['quotes', cryptoIds]
  await queryClient.prefetchQuery(['quotes', cryptoIds], () =>
    cryptoFetcher('/quotes', { params: { id: cryptoIds.join(',') } }))
  const quotesResponse: IQuoteResponse | undefined = queryClient.getQueryData(callUniqKey)
  if(quotesResponse) {
    const newQuoteMap = new Map()
    const selectedCryptoIds = []
    for(let [key, quote] of Object.entries(quotesResponse)) {
      selectedCryptoIds.push(quote.id)
      newQuoteMap.set(quote.id, quote)
    }
    setSelectedCryptoIds(selectedCryptoIds)
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
  const { selectedCryptoId, onQuoteFetchSuccess } = props
  return useQuery(
    ['quotes', selectedCryptoId],
    () => cryptoFetcher('/quotes', { params: { id: selectedCryptoId } }),
    {
      enabled: Boolean(selectedCryptoId),
      keepPreviousData: true,
      onSuccess: (data) => {
        if(data && data[selectedCryptoId]) {
          // save it in reducer
          onQuoteFetchSuccess(data[selectedCryptoId])
        }
      }
    },
  )
}
