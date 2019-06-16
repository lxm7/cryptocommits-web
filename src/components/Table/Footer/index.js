import React from 'react';
import PropTypes from 'prop-types';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const TableFooterComponent = ({ loading, onLoadMore }) => (
  <TableFooter>
    <TableRow>
    <TableCell colSpan='10'>
        <div style={{ position: 'relative', textAlign: 'center', height: '38px' }}>
          {loading ? <CircularProgress /> : <Button variant="contained" onClick={onLoadMore}>Load more</Button>}
        </div>
      </TableCell>
    </TableRow>
  </TableFooter>
);

TableFooterComponent.propTypes = {
  loading: PropTypes.bool,
  onLoadMore: PropTypes.func,
};

TableFooterComponent.defaultProps = {
  loading: false,
  onLoadMore: () => {},
};

export default TableFooterComponent;
