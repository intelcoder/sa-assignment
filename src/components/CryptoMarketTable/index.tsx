import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { TQuotes } from 'redux/CryptoMarketPage/types'


interface IProps {
  quotes: TQuotes,

}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const CryptoMarketTable = (props: IProps) => {
  const classes = useStyles();
  const { quotes } = props

  const renderRows = () => {
    let rows = []
    if(quotes.size) {
        for(let quote of quotes.values()) {
          rows.push(
            <TableRow key={quote.symbol}>
            <TableCell padding="checkbox" scope="row">
              <Checkbox
                onChange={(e) => {}}
                 inputProps={{ 'aria-label': 'select all desserts' }}
              />
            </TableCell>
            <TableCell component="th" scope="row">
              {quote.cmc_rank}
            </TableCell>
            <TableCell component="th" scope="row">
              {quote.symbol}
            </TableCell>
            <TableCell component="th" scope="row">
              {quote.quote.USD.price}
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
            <TableCell></TableCell>
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
