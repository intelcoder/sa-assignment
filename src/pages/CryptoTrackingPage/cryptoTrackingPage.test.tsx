import React from 'react'
import { render, screen, waitFor } from 'test/testUtils'
import CryptoMarketPage from './index'
import { useFetchSymbols, useFetchQuote, preFetchMultipleQuotes } from 'pages/CryptoTrackingPage/apis'
import { quote } from 'test/testData/cryptoMarket'

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import userEvent from '@testing-library/user-event'


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
    useFetchSymbols.mockImplementation(() => ({ data: null, isFetching: false }))
    useFetchQuote.mockImplementation(() => ({ data: null }))
    preFetchMultipleQuotes.mockImplementation(() => ({ data: null }))

  })

  it('shows loading on symbol data fetchingg', () => {
    useFetchSymbols.mockImplementation(() => ({ data: null, isFetching: true }))
    render(<WithQueryClient />)
    expect(screen.getByTestId('symbolLoadingIcon')).toBeTruthy()

  })
  it('render table row from quotes', async() => {
    React.useState = jest.fn()
      .mockReturnValueOnce([1, () => {}])
      .mockReturnValueOnce([new Map([
        [quote.id, quote],
        [2, {...quote, id: 4, symbol: 'DODGE'}]
      ]), () => {}])
    render(<WithQueryClient />)
    expect(screen.getAllByTestId('marketTableRow')).toHaveLength(2)

  })
})