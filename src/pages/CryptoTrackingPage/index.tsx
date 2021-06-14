import React, { useEffect } from 'react'
import produce from 'immer'
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { selectCryptoId, deleteCryptoId, setSelectedCryptoIds } from 'redux/CryptoTrackingPage/actions'
import { IQuote, TQuotes } from 'types/cryptoTracking'
import { selectSelectedCryptoIds } from 'redux/CryptoTrackingPage/selectors'
import { useFetchQuote, useFetchSymbols, preFetchMultipleQuotes } from './apis'
import CryptoTrackingTable from 'components/CryptoTrackingTable'
import CryptoSymbolDropdown from 'components/CryptoSymbolDropdown'
import { useQueryClient } from 'react-query'

const useStyles = makeStyles({
  heading: {
    padding: '14px 0',
  }
});

const CryptoTrackingPage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const selectedCryptoIds = useAppSelector(selectSelectedCryptoIds)

  // states
  const [selectedCryptoId, updateCryptoId] = React.useState('')
  const [selectedQuotes, updateSelectedQuotes] = React.useState(new Map())
  // fetching symbol for the select
  const { data: symbols, isFetching: isSymbolFetching } =
    useFetchSymbols({ params: { sort: 'cmc_rank' } })

  // fetching quotes when crypto is selected
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
        (cryptoIds) => dispatch(setSelectedCryptoIds({ cryptoIds })),
      )
    }
      // eslint-disable-next-line
  }, [symbols, selectedCryptoIds])

  // remove quote from table on delete icon clicked
  const onDeleteQuoteClick = (cryptoId: number) => {
    if(selectedQuotes.size <= 1) {
      return toast.warn('You must have one crypto on tracking', { })
    }
    updateSelectedQuotes(produce(selectedQuotes, draft => {
      // keep minimum 1
      draft.delete(cryptoId)
    }))
    // in order to use redux
    dispatch(deleteCryptoId({ cryptoId }))
  }

  const onItemSelect = (symbol: any) => {

    if(selectedQuotes.size >= 10) {
      return toast.warn('You cannot track more than 10 crypto', { })
    }
    if(!selectedQuotes.has(symbol.id)) {
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
                    selectedCryptoIds={selectedCryptoIds || {}}
                  />
                </div>
              )
          }

        </Box>
        {
          selectedQuotes && (
            <CryptoTrackingTable
              quotes={selectedQuotes}
              onDeleteQuoteClick={onDeleteQuoteClick}
            />
          )
        }
      </Container>
    </main>
  )
}

export default CryptoTrackingPage