import React, { useState, useEffect } from 'react'
import produce from 'immer'
import { makeStyles } from '@material-ui/core/styles'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { selectCryptoId, deleteCryptoId, setSelectedCryptoIds } from 'redux/CryptoMarketPage/actions'
import { IQuote, TQuotes } from 'types/cryptoMarket'
import { selectSelectedCryptoIds } from 'redux/CryptoMarketPage/selectors'
import { useFetchQuote, useFetchSymbols, preFetchMultipleQuotes } from './apis'
import CryptoMarketTable from 'components/CryptoMarketTable'
import CryptoSymbolDropdown from 'components/CryptoSymbolDropdown'
import { useQueryClient } from 'react-query'

const useStyles = makeStyles({
  heading: {
    padding: '14px 0',
  }
});

const CryptoMarketPage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const selectedCryptoIds = useAppSelector(selectSelectedCryptoIds)
  // states
  const [selectedCryptoId, updateCryptoId] = useState('')
  const [selectedQuotes, updateSelectedQuotes] = useState(new Map())

  // fetching symbol for the select
  const { data: symbols, isFetching: isSymbolFetching } =
    useFetchSymbols({ params: { sort: 'cmc_rank' } })

  // fetching quotes when something is selected
  const { isFetching: isQuoteFetching } =
    useFetchQuote({
      selectedCryptoId,
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
      const cryptoIds = symbols.slice(0, 5).map((symbol: { id: number }) => symbol.id)
      preFetchMultipleQuotes(
        queryClient,
        cryptoIds,
        onQuotesFetchSuccess,
        (coinIds) => dispatch(setSelectedCryptoIds({ cryptoIds })),
      )
    }
  }, [symbols, selectedCryptoIds])

  // remove quote from table on delete icon clicked
  const onDeleteQuoteClick = (cryptoId: number) => {
    updateSelectedQuotes(produce(selectedQuotes, draft => {
      // keep minimum 1
      if(draft.size > 1) draft.delete(cryptoId)
    }))
    // in order to use redux
    dispatch(deleteCryptoId({ cryptoId }))
  }

  const handleSymbolSelect = (e: React.ChangeEvent<{ value: unknown }>) => {

  }

  const onItemSelect = (symbol: any) => {
    if(!selectedQuotes.has(symbol.id) && selectedQuotes.size < 10) {
      updateCryptoId(symbol.id)
      // save it in redux
      dispatch(selectCryptoId({ cryptoId: Number(symbol.id) }))
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
          {
            isSymbolFetching
              ? <CircularProgress data-test-id="symbolLoadingIcon"/>
              : (
                <div>
                  <CryptoSymbolDropdown
                    value={selectedCryptoId || ''}
                    symbols={symbols || []}
                    onItemSelect={onItemSelect}
                    handleChange={handleSymbolSelect}
                    selectedCryptoIds={selectedCryptoIds || {}}
                  />
                </div>
              )
          }

        </Box>
        {
          selectedQuotes && (
            <CryptoMarketTable
              quotes={selectedQuotes}
              isQuoteFetching={isQuoteFetching}
              onDeleteQuoteClick={onDeleteQuoteClick}
            />
          )
        }
      </Container>
    </main>
  )
}

export default CryptoMarketPage