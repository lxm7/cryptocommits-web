import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleSortColumn, toggleSortBy } from './../../store/List/actions';
import { addToWatchList } from '../../store/User/actions';
import TableFooter from './Footer';
import TableHeader from './Header';
import TableBody from './Body';
import Paper from '@material-ui/core/Paper';

class TableList extends Component {
  componentDidMount() {
    // eslint-disable-next-line no-unused-expressions
    this.props.toggleSortColumn('#') &&
    this.props.toggleSortBy() &&
    this.props.toggleSortBy();
  }

  render() {
    const {
      coinList,
      onLoadMore,
      loading,
      user: { watchList },
      list: { sort },
    } = this.props;

    if (coinList && coinList.length === 0) return <CircularProgress />
    return (
      <Paper>
        <Table size='small'>
          <TableHeader
            toggleSortColumn={this.props.toggleSortColumn}
            toggleSortBy={this.props.toggleSortBy}
            sort={sort}
          />

          <TableBody
            coinList={coinList}
            addToWatchList={this.props.addToWatchList}
            watchList={watchList}
          />

          <TableFooter loading={loading} onLoadMore={onLoadMore} />
        </Table>
      </Paper>
    );
  }
}

TableList.propTypes = {
  toggleSortColumn: PropTypes.func,
  toggleSortBy: PropTypes.func,
  addToWatchList: PropTypes.func,
  coinList: PropTypes.arrayOf(PropTypes.shape({
    Id: PropTypes.string,
    ImageUrl: PropTypes.string,
    last_updated: PropTypes.string,
    market_cap_usd: PropTypes.string,
    name: PropTypes.string,
    price_usd: PropTypes.string,
    cmc_rank: PropTypes.string,
  })),
  onLoadMore: PropTypes.func,
  loading: PropTypes.bool,
  user: PropTypes.shape({
    watchList: PropTypes.arrayOf(PropTypes.shape({
      Id: PropTypes.string,
      ImageUrl: PropTypes.string,
      last_updated: PropTypes.string,
      market_cap_usd: PropTypes.string,
      name: PropTypes.string,
      price_usd: PropTypes.string,
      cmc_rank: PropTypes.string,
    })),
  }),
  list: PropTypes.shape({
    sort: PropTypes.shape({
      column: PropTypes.string,
      desc: PropTypes.bool,
    }),
  }),
};

TableList.defaultProps = {
  toggleSortColumn: () => {},
  toggleSortBy: () => {},
  addToWatchList: () => {},
  coinList: [],
  user: {
    watchlist: [],
  },
  onLoadMore: () => {},
  loading: false,
  list: {
    sort: {
      column: null,
      desc: false,
    },
  },
};

export default connect(
  ({ list, sort }) => ({ list, sort }),
  (dispatch) => bindActionCreators({
    toggleSortColumn,
    toggleSortBy,
    addToWatchList,
  }, dispatch),
)(TableList);
