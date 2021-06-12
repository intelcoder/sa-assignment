import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import { TQuotes } from 'redux/CryptoMarketPage/types'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

interface IProps {
  quotes: TQuotes,
  isQuoteFetching: boolean,
  onDeleteQuoteClick: (a: number) => void
}

const useStyles = makeStyles({
  deleteBtn: {
    padding: '6px',
    marginLeft: '4px',
  },
  table: {
    minWidth: 650,
  },

});

const CryptoMarketTable = (props: IProps) => {
  const classes = useStyles();
  const { quotes, onDeleteQuoteClick } = props

  const renderRows = () => {
    let rows = []
    if(quotes.size) {
      let i = 1
      for(let quote of quotes.values()) {
        rows.push(
          <TableRow key={quote.symbol}>

            <TableCell padding="checkbox" scope="row">
              <IconButton
                className={classes.deleteBtn}
                onClick={() => onDeleteQuoteClick(quote.id)}
              >
                <DeleteIcon/>
              </IconButton>
            </TableCell>
            <TableCell padding="checkbox" component="th" scope="row">
              <Box textAlign="center">
                {i++}
              </Box>
            </TableCell>
            <TableCell component="th" scope="row">
              {quote.cmc_rank}
            </TableCell>
            <TableCell component="th" scope="row">
              {quote.symbol}
            </TableCell>
            <TableCell component="th" scope="row">
              ${quote.quote.USD.price}
            </TableCell>
          </TableRow>
        )
      }
    }
    return rows
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell>Rank</TableCell>
            <TableCell align="left">Symbol</TableCell>
            <TableCell align="left">Price(USD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderRows()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CryptoMarketTable
