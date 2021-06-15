import React from 'react'
import { render, screen, waitFor } from 'test/testUtils'
import userEvent from '@testing-library/user-event'
import CryptoMarketPage from './index'
import { useFetchSymbols, useFetchQuote, preFetchMultipleQuotes } from 'pages/CryptoTrackingPage/apis'
import { quote, cryptoSymbol } from 'test/testData/cryptoMarket'
import { getDropdownInput } from 'components/Dropdown/dropdown.test'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'


// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
})

jest.mock('./apis', () => ({
  useFetchSymbols: jest.fn(),
  useFetchQuote: jest.fn(),
  preFetchMultipleQuotes: jest.fn(),
}))

const WithQueryClient = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CryptoMarketPage />
    </QueryClientProvider>
  )
}

describe('<CryptoMarketPage />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    React.useState = jest.fn()
      .mockReturnValueOnce([1, () => {}])
      .mockReturnValueOnce([new Map([
        [quote.id, quote],
        [2, {...quote, id: 4, symbol: 'DODGE'}]
      ]), () => {}])

    useFetchQuote.mockImplementation(() => ({ data: null }))
    useFetchSymbols.mockImplementation(() => ({ data: [], isFetching: false }))
    preFetchMultipleQuotes.mockImplementation(() => Promise.resolve({ 1: quote, 2: {...quote, symbol: 'DODGE', id: 2}}))

  })


  it('shows loading on symbol data fetching', () => {
    useFetchSymbols.mockImplementation(() => ({ data: [], isFetching: true }))
    render(<WithQueryClient />)
    expect(screen.getByTestId('symbolLoadingIcon')).toBeTruthy()

  })
  it('render table row from quotes', async() => {
    render(<WithQueryClient />)
    expect(screen.getAllByTestId('marketTableRow')).toHaveLength(2)
  })
  // it('display prefetched quotes and delete', async () => {
  //     const quotesMap = new Array(10).fill('').reduce((acc, v, index) => {
  //       acc[index] = {
  //         ...quote,
  //         id: index + 1,
  //         symbol: 'DODGE' + index
  //       }
  //       return acc
  //     }, {})
  //
  //     preFetchMultipleQuotes.mockImplementation(() => Promise.resolve(quotesMap))
  //
  //   const { debug } = render(<WithQueryClient />)
  //
  //   userEvent.click(screen.getAllByTestId('deleteBtn')[0])
  //   await waitFor(() => {
  //     debug()
  //     expect(screen.queryByText('BTC')).not.toBeInTheDocument()
  //     // try to delete last item
  //     userEvent.click(screen.getAllByTestId('deleteBtn')[0])
  //   })
  //   await waitFor(() => {
  //     expect(screen.getByText('DODGE')).toBeInTheDocument()
  //   })
  // })
  // it('should not be able to add more than 10 crypto on tracking table', async () => {
  //   const quotesMap = new Array(10).fill('').reduce((acc, v, index) => {
  //     acc[index] = {
  //       ...quote,
  //       id: index + 1,
  //       symbol: 'DODGE' + index
  //     }
  //     return acc
  //   }, {})
  //   React.useState = jest.fn()
  //     .mockReturnValueOnce([1, () => {}])
  //     .mockReturnValueOnce([new Map([
  //       [quote.id, quote],
  //       [2, {...quote, id: 4, symbol: 'DODGE'}]
  //     ]), () => {}])
  //
  //   useFetchSymbols.mockImplementation(() => ({ data: [{...cryptoSymbol, symbol: 'ABC'}], isFetching: false }))
  //   preFetchMultipleQuotes.mockImplementation(() => Promise.resolve(quotesMap))
  //
  //   const { debug, container } = render(<WithQueryClient />)
  //
  //   const dropdownInput = screen.getByTestId('dropdown').querySelector('.MuiInput-input')
  //   if(dropdownInput) userEvent.click(dropdownInput)
  //   const abcCoin = screen.queryByText('ABC')
  //   if(abcCoin) userEvent.click(abcCoin)
  //   await waitFor(() => {
  //     expect(screen.getAllByTestId('marketTableRow')).toHaveLength(10)
  //   })
  //
  //
  // })

})