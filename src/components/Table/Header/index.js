import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import TableHeader from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import HeaderCell from '../HeaderCell';

const TableHeaderComponent = ({ toggleSortColumn, toggleSortBy, sort }) => (
  <TableHeader style={{ textAlign: 'center' }}>
    <TableRow>
      {['#', 'Coin', 'Cap', 'Price', 'lastCommit'].map((cellHeader) => {
        // 'Tw_Followers', 'Tw_Statuses', 'Reddit',
        return (
          <HeaderCell
            key={uuidv4()}
            cellHeader={cellHeader}
            toggleSortColumn={toggleSortColumn}
            toggleSortBy={toggleSortBy}
            sort={sort}
          />
        );
      })}
    </TableRow>
  </TableHeader>
);

TableHeaderComponent.propTypes = {
  toggleSortColumn: PropTypes.func,
  toggleSortBy: PropTypes.func,
  sort: PropTypes.shape({
    column: PropTypes.string,
    desc: PropTypes.bool,
  }),
};

TableHeaderComponent.defaultProps = {
  toggleSortColumn: () => {},
  toggleSortBy: () => {},
  sort: {},
};


export default TableHeaderComponent;
