import React from 'react'
import { formatCurrency } from '@coingecko/cryptoformat'
import { render, screen } from 'test/testUtils'
import userEvent from '@testing-library/user-event'
import { quote } from 'test/testData/cryptoMarket'
import { TQuotes } from 'types/cryptoMarket'
import CryptoMarketTable from './index'

describe('<CryptoMarketTable />', () => {
  let quotes: TQuotes
  beforeEach(() => {
    quotes = new Map([[quote.id, {
      id: quote.id,
      cmc_rank: quote.cmc_rank,
      symbol: quote.symbol,
      quote: quote.quote,
    }]])
  })
  it('display quote data on table', () => {

    render(<CryptoMarketTable quotes={quotes} />)
    expect(screen.queryByText(quote.symbol)).toBeTruthy()
    expect(screen.queryByText(quote.cmc_rank)).toBeTruthy()
    expect(screen.queryByText(formatCurrency(quote.quote.USD.price, 'USD', 'en'))).toBeTruthy()
  })

  it('trigger click event on delete icon click', () => {
    const onDeleteQuoteClick = jest.fn()
    render(<CryptoMarketTable quotes={quotes} onDeleteQuoteClick={onDeleteQuoteClick} />)
    userEvent.click(screen.getByTestId('deleteBtn'))
    expect(onDeleteQuoteClick).toHaveBeenCalled()
  })
})
