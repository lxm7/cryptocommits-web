import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import TableCell from '@material-ui/core/TableCell';
import SvgIcon from '@material-ui/core/SvgIcon';

const TableHeader = ({ cellHeader, toggleSortColumn, toggleSortBy, sort }) => (
  <TableCell
    key={uuidv4()}
    style={{
        position: 'relative',
    }}
    colSpan={(cellHeader === 'Reddit') ? 4 : null}
    rowSpan={(cellHeader === 'Reddit') ? 1 : 2}
  >
    {(cellHeader !== 'Reddit') &&
      <div
        variant="text"
        style={{
          float: 'right',
          background: 'transparent',
          padding: '3px 3px 3px 10px',
        }}
        onClick={() =>
          toggleSortColumn(cellHeader) &&
          toggleSortBy()
        }
      >
        {cellHeader !== 'Coin'
          ? <SvgIcon
            key={uuidv4()}
            style={{
              position: 'absolute',
              top: '50%',
              right: '-5px',
              marginTop: '-11px',
            }}
          >
          {sort.desc && sort.column === cellHeader 
            ? <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            : <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
          }
          </SvgIcon>
          : <span></span>
        }
      </div>
    }

    <div>{(cellHeader === 'lastCommit') ?
      <div>
        <div>Last Github commit</div>
      </div>
      : cellHeader}
    </div>
  </TableCell>
);

TableHeader.propTypes = {
  cellHeader: PropTypes.string,
  toggleSortColumn: PropTypes.func,
  toggleSortBy: PropTypes.func,
  sort: PropTypes.shape({
    column: PropTypes.string,
    desc: PropTypes.bool,
  }),
};

TableHeader.defaultProps = {
  cellHeader: '',
  toggleSortColumn: () => {},
  toggleSortBy: () => {},
  sort: {},
};


export default TableHeader;
