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
import { IQuote } from 'redux/CryptoMarketPage/types'
import reducer from 'redux/CryptoMarketPage/reducer'


interface IProps {
  quotes: IQuote[],

}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const CryptoMarketTable = (props: IProps) => {
  const classes = useStyles();
  const { quotes } = props
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
          {
            quotes && quotes.map(quote => {
              return (
                <TableRow key={quote.symbol}>
                  <TableCell padding="checkbox" scope="row">
                    <Checkbox
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

            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CryptoMarketTable
