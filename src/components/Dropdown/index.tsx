import React, { useState } from 'react';
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
  onItemSelect?: (e: IOption) => void,
  dropdownItemHeight: number,
  dropdownWidth: number,
  dropdownContainerHeight: number,
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
    select: {
      textAlign: 'left',
      paddingLeft: '2px'
    }
  }),
);

const Dropdown = (
  {
    value,
    label,
    options,
    onItemSelect = () => {},
    dropdownItemHeight,
    dropdownWidth,
    dropdownContainerHeight,
  }: IProps
) => {
  const [open, updateOpen] = useState(false)
  const [selectedItemLabel, updateSelectedItemLabel] = useState('')
  const classes = useStyles();

  const handleClose = () => {
    updateOpen(false)
  }

  const handleOpen = () => {
    updateOpen(true)
  }

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
        onClick={() => {
          onItemSelect(option)
          updateOpen(false)
          updateSelectedItemLabel(option.label)
        }}
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
        data-test-id="dropdown"
        className={classes.select}
        renderValue={() => selectedItemLabel}
        value={String(value)}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        {
          options && (
            <List
              height={dropdownContainerHeight}
              rowHeight={dropdownItemHeight}
              width={dropdownWidth}
              rowCount={options.length}
              rowRenderer={rowRenderer}
            />
          )
        }

      </Select>
    </FormControl>
  )
}

Dropdown.defaultProps = {
  dropdownItemHeight: 36,
  dropdownWidth: 140,
  dropdownContainerHeight: 300,
}

export default Dropdown