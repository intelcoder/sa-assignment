import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Container from '@material-ui/core/Container';
import { addCoinQuote } from 'redux/CryptoMarketPage/actions'
import { TQuotes } from 'redux/CryptoMarketPage/types'
import { selectQuotes } from 'redux/CryptoMarketPage/selectors'
import CryptoMarketTable from 'components/CryptoMarketTable'
import Dropdown from 'components/Dropdown'


const cryptoFetcher = async (url: string, options = {}) => {
  const response = await axios.get(process.env.REACT_APP_API_URL + url, options)
  if(response.data.status.error_code) return Promise.reject('Fail to fetch symbol')
  return Promise.resolve(response.data.data)
}


interface ICoinSymbol {
  id: number,
  symbol: string,
}

const CryptoMarketPage = () => {
  const dispatch = useDispatch()
  const quotes: TQuotes = useSelector(selectQuotes)

  const [selectedCoinId, updateCoinSymbol] = useState('')

  // fetching symbol for the select
  const { data, error, isFetching } =
   useQuery('symbols', () => cryptoFetcher('/map', {params: { limit: 5 }}))

  // fetching quotes when something is selected
  const { refetch } =
    useQuery(
     ['quotes', selectedCoinId],
      () => cryptoFetcher('/quotes', {params: { id: selectedCoinId }}),
      {
        enabled: Boolean(selectedCoinId),
        keepPreviousData: true,
        onSuccess: (data) => {
          if(data && data[selectedCoinId]) {
            // save it in reducer
            dispatch(addCoinQuote(data[selectedCoinId]))
          }
        }
      },
    )

  const onCoinSelected = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    if(!quotes.has(e.target.value)) {
      updateCoinSymbol(e.target.value)
    }
  }
  
  return (
    <div>
      <h1>Crypto market cap</h1>
      <select onChange={onCoinSelected}>
        {
          data && data.map((coin: ICoinSymbol) => {
            return <option key={coin.symbol} value={coin.id}>{coin.symbol}</option>
          })
        }
      </select>

      <Container maxWidth="lg">
        <CryptoMarketTable quotes={quotes} />
      </Container>
    </div>
  )
}

export default CryptoMarketPage