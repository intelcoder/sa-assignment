import React from 'react'
import { render, screen } from 'test/testUtils'
import userEvent from '@testing-library/user-event'
import CryptoSymbolDropdown from 'components/CryptoSymbolDropdown'
import { cryptoSymbol } from 'test/testData/cryptoMarket'

const dodge =  {
  ...cryptoSymbol,
  id: 10,
  symbol: 'DODGE',
  value: 10,
}
const symbols = [
  dodge,
  cryptoSymbol,
]

const getDropdownInput = () => screen.getByTestId('dropdown').querySelector('.MuiInput-input')

describe('<CryptoSymbolDropdown />', () => {
  it('shows dropdown item on dropdown open', () => {
    render(<CryptoSymbolDropdown
      symbols={symbols}
      selectedCryptoIds={[]}
      onItemSelect={() => {}}
      value={''}
    />)

    const dropdownInput = getDropdownInput()
    if(dropdownInput) userEvent.click(dropdownInput)
    expect(screen.getByText('DODGE'))
  })

  it('triggers onItemSelect on dropdown item click', () => {
    const onItemSelect = jest.fn()
    render(<CryptoSymbolDropdown
      symbols={symbols}
      selectedCryptoIds={[]}
      onItemSelect={onItemSelect}
      value={''}
    />)
    const dropdownInput = getDropdownInput()
    if(dropdownInput) userEvent.click(dropdownInput)
    userEvent.click(screen.getByText('DODGE'))
    expect(onItemSelect).toHaveBeenCalled()
    // check return value on click event
    expect(onItemSelect.mock.calls[0][0]).toEqual({
      value: dodge.id,
      label: dodge.symbol,
      id: dodge.id,
    })
  })


})