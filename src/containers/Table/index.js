import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import gql from 'graphql-tag';

import { toggleSortColumn, toggleSortBy } from '../../store/List/actions';
import { addToWatchList } from '../../store/User/actions';
import { coinListSortBySelector } from './selectors';
import List from '../../components/Table/index';

const CoinListQuery = gql`
  query CoinList($limit: Float, $offset: Int) {
    coins(limit: $limit, offset: $offset) {
      id
      cmc_rank
      ImageUrl
      name
      quote {
        USD {
          market_cap
          price
        }
      }
      last_updated
      github {
        created_at
        last_push
        stars
      #     size
      #     language
      }
      # twitter {
          # following
          # account_creation
          # name
          # lists
          # statuses
          # favourites
          # followers
          # link
      # }
      # reddit {
          #  posts_per_hour
          # comments_per_hour
          # posts_per_day
          # comments_per_day
          # name
          # link
          # active_users
          # community_creation
          # subscribers
      # }
    }
  }
`;

// The HOC's below allows us to compose apollo and redux in a way that tracks filter actions in redux
// with the data we get from the graphql query via Apollo. The only downside is that we still
// need to manually disaptch actions in the component.
const reduxWrapper = connect(
  ({ list, user }) => ({ list, user }),
  (dispatch) => bindActionCreators({ toggleSortColumn, toggleSortBy, addToWatchList }, dispatch),
);

const gqlWrapper = graphql(CoinListQuery, {
    // set offset and limit as CONSTANTS
  options: () => ({
    variables: {
      offset: 1,
      limit: 10,
    },
    fetchPolicy: 'cache-first',
  }),
  props: ({
    data: { loading, coins, fetchMore },
    ownProps: { list: { sort } },
  }) => ({
    coinList: coinListSortBySelector(coins, sort),
    coins,
    loading,
    onLoadMore: () =>
      fetchMore({
        variables: {
          offset: coins && coins.length + 1,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            coins: [...prev.coins, ...fetchMoreResult.coins],
          });
        },
      }),
  }),
});

export default compose(
  reduxWrapper,
  gqlWrapper,
)(List);
