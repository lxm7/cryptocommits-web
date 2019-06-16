import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import moment from 'moment';

const LastCommitCell = ({ coin }) => (
  <TableCell>
    {coin.github && coin.github.last_push !== 'no code repos' ?
      <div>
        {moment.unix(coin.github.last_push).fromNow()}
      </div> :
      <div style={{ color: '#cccccc' }}>
        {moment.unix(coin.last_updated).fromNow()}
      </div>
    }
  </TableCell>
);

LastCommitCell.propTypes = {
  coin: PropTypes.shape({
    github: PropTypes.shape({
      last_push: PropTypes.string,
    }),
    last_updated: PropTypes.string,
  }),
};

LastCommitCell.defaultProps = {
  coin: {},
};

export default LastCommitCell;
