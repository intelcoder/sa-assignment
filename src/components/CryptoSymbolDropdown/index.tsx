import React, { useMemo } from 'react'
import Dropdown, { IOption } from 'components/Dropdown'
import { ISymbol } from 'types/cryptoMarket'

interface IProps {
  symbols: ISymbol[],
  handleChange: (e: React.ChangeEvent<{ value: unknown }>) => void,
  selectedCryptoIds: {
    [key: number]: boolean
  },
  onItemSelect: (e: IOption) => void,
  value: number | string,
}

const CryptoSymbolDropdown = (
  {
    symbols,
    handleChange,
    selectedCryptoIds,
    onItemSelect,
    value,
  }: IProps
) => {
  const options = useMemo(() => {
    return symbols
      .map(symbol => ({
        value: symbol.id,
        label: symbol.symbol,
        id: symbol.id,
      }))
      .filter(symbol => !selectedCryptoIds[symbol.id])
  }, [symbols, selectedCryptoIds])
  if(!options || !options.length) return null
  return (
    <Dropdown label="Crypto Symbol" value={value} options={options} handleChange={handleChange} onItemSelect={onItemSelect} />
  )
}


export default CryptoSymbolDropdown