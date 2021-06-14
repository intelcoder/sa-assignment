import React from 'react'
import { render, screen } from 'test/testUtils'
import CryptoMarketPage from './index'
import { useFetchSymbols, useFetchQuote, preFetchMultipleQuotes } from 'pages/CryptoMarketPage/apis'
import { cryptoSymbol } from 'test/testData/cryptoMarket'

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
    useFetchSymbols.mockImplementation(() => ({ data: null, isFetching: false }))
    useFetchQuote.mockImplementation(() => ({ data: null }))

  })

  it('shows loading on symbol data fetchingg', () => {
    useFetchSymbols.mockImplementation(() => ({ data: null, isFetching: true }))
    render(<WithQueryClient />)
    expect(screen.getByTestId('symbolLoadingIcon')).toBeTruthy()

  })
  it('shows symbol dropdown', () => {
     useFetchSymbols.mockImplementation(() => ({ data: [cryptoSymbol] }))
    const { debug } = render(<WithQueryClient />)
    // cryptoSymbol
    debug()
  })
})