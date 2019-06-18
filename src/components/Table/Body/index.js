import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import uuidv4 from 'uuid/v4';

import { shortCap, priceF } from '../../../helpers/formatData';
import LastCommitCell from '../LastCommitCell';

const TableBodyComponent = ({ coinList, addToWatchList, watchList }) => {
  if (!coinList || coinList.length === 0) { // !watchList || watchList.length === 0
    return null;
  }

  return (
    <TableBody>
      {coinList
        .map((coin) => (
          <TableRow
            key={uuidv4()}
            onClick={() => addToWatchList(coin)}
            className={(watchList && watchList.find(favCoin => favCoin.Id === coin.Id)) ? 'active' : ''}
          >
            <TableCell>{coin.cmc_rank}</TableCell>
            <TableCell>
              <List component="nav">
                <ListItem>
                  {coin.ImageUrl ?
                    <Avatar
                      style={{
                          height: '18px',
                          width: '18px',
                      }}
                      src={`https://www.cryptocompare.com/${coin.ImageUrl}`}
                      alt={coin.symbol}
                    /> : <span>listitemicon</span> // <ListItemIcon name='hashtag' style={{ color: '#ccc' }} />
                  }
                  <div>{coin.name}</div>
                </ListItem>
              </List>
            </TableCell>
            <TableCell>{`$ ${shortCap(coin.quote.USD.market_cap, 0, false, false)}`}</TableCell>
            <TableCell>{`$ ${priceF(coin.quote.USD.price)}`}</TableCell>

            {/* <TableCell>{(coin.twitter.followers)}</TableCell> */}
            {/* <TableCell>{(coin.twitter.statuses)}</TableCell> */}

            {/* <TableCell>{(coin.reddit.posts_per_day) }</TableCell>
            <TableCell>{(coin.reddit.posts_per_hour)}</TableCell>
            <TableCell>{(coin.reddit.comments_per_day)}</TableCell>
            <TableCell>{(coin.reddit.comments_per_hour)}</TableCell> */}

            <LastCommitCell coin={coin} />
          </TableRow>
        ))
      }
    </TableBody>
  );
};

TableBodyComponent.propTypes = {
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
};

TableBodyComponent.defaultProps = {
  addToWatchList: () => {},
  coinList: [],
};


export default TableBodyComponent;
