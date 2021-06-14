import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { List } from 'react-virtualized'

export interface IOption {
  id: number,
  label: string,
  value: string | number,
}
interface IProps {
  value: string | number,
  label: string,
  options: IOption[] | [],
  handleChange: (e: React.ChangeEvent<{ value: unknown }>) => void,
  onItemSelect?: (e: IOption) => void,
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 140,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const Dropdown = (
  {
    value,
    label,
    options,
    handleChange,
    onItemSelect = () => {},
  }: IProps
) => {
  const classes = useStyles();
  const rowRenderer = (
    {
      index, // Index of row
      key, // Unique key within array of rendered rows
      style,
    }: any
  ) => {
    const option = options[index]
    return (
      <MenuItem
        key={key}
        style={style}
        onClick={() => onItemSelect(option)}
        value={option.value}
      >
        {option.label}
      </MenuItem>
    )
  }
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>


      <Select
        value={String(value)}
        onChange={(e) => { console.log(e)}}
      >
        {
          options && (
            <List
              height={300}
              rowHeight={36}
              width={120}
              rowCount={options.length}
              rowRenderer={rowRenderer}
            />
          )
        }

      </Select>
    </FormControl>
  )
}

export default Dropdown