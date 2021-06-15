import { useQuery, QueryClient } from 'react-query'
import { IQuote, TQuotes } from 'types/cryptoTracking'
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

export const preFetchMultipleQuotes = async(
  queryClient: QueryClient,
  cryptoIds: number[],
): Promise<TQuotes | any> => {
  const callUniqKey = ['quotes', cryptoIds]
  await queryClient.prefetchQuery(['quotes', cryptoIds], () =>
    cryptoFetcher('/quotes', { params: { id: cryptoIds.join(',') } }))
  const quoteResponse = await queryClient.getQueryData(callUniqKey)
  return quoteResponse
}

export const useFetchSymbols = (
  {
    params = {}
  }: IFetchSymbolProps
) =>
  useQuery(['symbols', params], () => cryptoFetcher('/map', { params: { sort: 'cmc_rank'}}))

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
