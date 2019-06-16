import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from '@material-ui/core/Table';

import TableHeader from '../../components/Table/Header';
import TableBody from '../../components/Table/Body';
import { toggleSortColumn, toggleSortBy } from '../../store/List/actions';
import { addToWatchList } from '../../store/User/actions';

const watchList = ({ user, toggleSortColumn, toggleSortBy, addToWatchList, sort }) => {
  if (!user || !user.watchList || user.watchList.length === 0) return null;
  
  return (
    <Table size='small'>
      <TableHeader
        toggleSortColumn={toggleSortColumn}
        toggleSortBy={toggleSortBy}
        sort={sort}
      />

      <TableBody
        coinList={user.watchList}
        addToWatchList={() => {}}
        watchList={null}
      />
    </Table>
  );
};

export default connect(
  ({ user, sort }) => ({ user, sort }),
  (dispatch) => bindActionCreators({ toggleSortColumn, toggleSortBy, addToWatchList }, dispatch),
)(watchList);
