import { createSelector } from 'reselect';
import moment from 'moment';

export const coinListSortBySelector = createSelector(
  (coins, sortBy) => ({ coins, sortBy }), // from list.jsx - coinList: coinListSortBySelector(coins, sort)
  (list) => {
    if (!list.coins) return null;

    return list.coins
      .map((coin) => coin)
      .sort((a, b) => {
        const first = a.github && a.github.last_push !== 'no code repos' ? a.github.last_push : a.last_updated;
        const second = b.github && b.github.last_push !== 'no code repos' ? b.github.last_push : b.last_updated;
          
        switch (list.sortBy.column) {
        case '#':
          return list.sortBy.desc
            ? b.cmc_rank - a.cmc_rank
            : a.cmc_rank - b.cmc_rank;
        case 'lastCommit':
          return list.sortBy.desc
            ? moment.unix(first) - moment.unix(second)
            : moment.unix(second) - moment.unix(first);
        case 'Tw_Followers':
          return list.sortBy.desc
            ? b.twitter.follower - a.twitter.follower
            : a.twitter.follower - b.twitter.follower;
        case 'Tw_Statuses':
          return list.sortBy.desc
            ? b.twitter.statuses - a.twitter.statuses
            : a.twitter.statuses - b.twitter.statuses;
        case 'posts_pd':
          return list.sortBy.desc
            ? b.reddit.posts_per_day - a.reddit.posts_per_day
            : a.reddit.posts_per_day - b.reddit.posts_per_day;
        case 'posts_phr':
          return list.sortBy.desc
            ? b.reddit.posts_per_hour - a.reddit.posts_per_hour
            : a.reddit.posts_per_hour - b.reddit.posts_per_hour;
        case 'comments_pd':
          return list.sortBy.desc
            ? b.reddit.comments_per_day - a.reddit.comments_per_day
            : a.reddit.comments_per_day - b.reddit.comments_per_day;
        case 'comments_phr':
          return list.sortBy.desc
            ? b.reddit.comments_per_hour - a.reddit.comments_per_hour
            : a.reddit.comments_per_hour - b.reddit.comments_per_hour;
        default:
          return list.coins;
          }
      });
  },
);
