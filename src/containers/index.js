import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';

import ListContainer from '../containers/Table';
import WatchListTable from '../containers/WatchListTable';
import { store } from '../store';

class App extends Component {
  state = { tabIndex: 0 }

  handleTabchange = (tabIndex) => this.setState(() => ({ tabIndex }))

  render() {
    return (
      <div>
        <h2>CryptoCurrency ShitList</h2>
        <h3>List of cryptos and shitcoins sortable by their activity</h3>
        <br />
        <div>
          {['all'].map((tab, i) => ( // , 'watchlist'
            <div
              key={i}
              className={`tabs__tab ${(this.state.tabIndex === i ? 'tabs__tab--active' : '')}`}
              onClick={() => this.handleTabchange(i)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className='tabs__body'>
          {['all'].map((panel, i) => { // , 'watchlist'
            const index = i + 2;
            return (
              <div
                key={index}
                type='button'
                className={`tabs__panel ${(this.state.tabIndex === i ? 'tabs__panel--active' : '')}`}
                onClick={() => this.handleTabchange(i)}
                onKeyPress={() => this.handleTabchange(i)}
                role='button'
                tabIndex={i}
              >
                {panel === 'all' && <ListContainer {...this.props} />}
                {panel === 'watchlist' && <WatchListTable {...this.props} />}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRedux(
  store,
  null,
  null,
)(App);

