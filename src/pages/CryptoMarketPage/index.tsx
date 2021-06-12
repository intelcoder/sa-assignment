import React, { useState, useEffect } from 'react'
import produce from 'immer'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { selectCoinId, deleteCoinId, setSelectedCoinIds } from 'redux/CryptoMarketPage/actions'
import { IQuote, TQuotes } from 'redux/CryptoMarketPage/types'
import { selectCoinIds } from 'redux/CryptoMarketPage/selectors'
import { useFetchQuote, useFetchSymbols, preFetchMultipleQuotes } from './apis'
import CryptoMarketTable from 'components/CryptoMarketTable'
import { useQueryClient } from 'react-query'

interface ICoinSymbol {
  id: number,
  symbol: string,
}

const useStyles = makeStyles({
  heading: {
    padding: '14px 0',
  }
});

const CryptoMarketPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const selectedCoins = useSelector(selectCoinIds)

  // states
  const [selectedCoinId, updateCoinId] = useState('')
  const [selectedQuotes, updateSelectedQuotes] = useState(new Map())

  // fetching symbol for the select
  const { data: symbols, isFetching: isSymbolFetching } =
    useFetchSymbols({ params: { sort: 'cmc_rank' } })

  // fetching quotes when something is selected
  const { isFetching: isQuoteFetching } =
    useFetchQuote({
      selectedCoinId,
      onQuoteFetchSuccess: (quote: IQuote) => {
        updateSelectedQuotes(produce(selectedQuotes, draft => {
          draft.set(quote.id, quote)
        }))
      }
    })

  // fetch first 5 coin quotes and set selectedQuotes
  useEffect(() => {
    if(symbols && symbols.length && !selectedQuotes.size) {
      const onQuotesFetchSuccess = (newQuoteMap: TQuotes) => updateSelectedQuotes(newQuoteMap)
      // get first 5 coin symbols
      const coinIds = symbols.slice(0, 5).map((symbol: { id: number }) => symbol.id)
      preFetchMultipleQuotes(
        queryClient,
        coinIds,
        onQuotesFetchSuccess,
        (coinIds) => dispatch(setSelectedCoinIds({ coinIds })),
      )
    }
  }, [symbols, selectedCoins])

  // remove quote from table on delete icon clicked
  const onDeleteQuoteClick = (coinId: number) => {
    updateSelectedQuotes(produce(selectedQuotes, draft => {
      // keep minimum 1
      if(draft.size > 1) draft.delete(coinId)
    }))
    // in order to use redux
    dispatch(deleteCoinId({ coinId }))
  }

  const onCoinSelected = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const coinId = e.target.value
    // max tracking count is 10
    if(!selectedQuotes.has(coinId) && selectedQuotes.size < 10) {
      updateCoinId(coinId)
      // save it in redux
      dispatch(selectCoinId({ coinId }))
    }
  }

  return (
    <main>
      <Container maxWidth="lg">
        <Box
          className={classes.heading}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" component="h1">Crypto Tracking</Typography>
          <div>
            {
              isSymbolFetching
                ? <CircularProgress/>
                : (
                  <select onChange={onCoinSelected} value={selectedCoinId}>
                    <option value="" selected>Select coin</option>
                    {
                      symbols && symbols.map((coin: ICoinSymbol) => {
                        if(selectedCoins[coin.id]) return null
                        return <option key={coin.id} value={coin.id}>{coin.symbol}</option>
                      })
                    }
                  </select>
                )
            }

          </div>
        </Box>
        <CryptoMarketTable
          quotes={selectedQuotes}
          isQuoteFetching={isQuoteFetching}
          onDeleteQuoteClick={onDeleteQuoteClick}
        />
      </Container>
    </main>
  )
}

export default CryptoMarketPage