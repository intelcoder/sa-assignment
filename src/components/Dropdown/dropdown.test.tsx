import React from 'react'
import { render, screen, waitFor } from 'test/testUtils'
import userEvent from '@testing-library/user-event'
import Dropdown from './'

const options = [
  {
    id: 100,
    label: 'TO THE MOON',
    value: 100,
  },
  {
    id: 99,
    label: 'Siva Coin',
    value: 99
  }
]

export const getDropdownInput = () => screen.getByTestId('dropdown').querySelector('.MuiInput-input')

describe('<Dropdown />', () => {
  const label = 'Test Label'
  it('renders dropdown items correctly', () => {

    render(
      <Dropdown
        value={99}
        options={options}
        label={label}
      />)
    const dropdownInput = getDropdownInput()
    if(dropdownInput) userEvent.click(dropdownInput)
    expect(screen.getByText('Siva Coin')).toBeTruthy()
    expect(screen.getByText('TO THE MOON')).toBeTruthy()

  })
  it('correctly select dropdown item', async () => {
    const onItemSelect = jest.fn()
    render(
      <Dropdown
        value={99}
        options={options}
        label={label}
        onItemSelect={onItemSelect}
      />)
    const dropdownInput = getDropdownInput()
    if(dropdownInput) userEvent.click(dropdownInput)
    const sivaCoin = screen.queryByText('Siva Coin')
    if(sivaCoin) userEvent.click(sivaCoin)
    expect(onItemSelect).toHaveBeenCalled()
  })
})