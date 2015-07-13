/* @flow */

import moment from 'moment';

export function getTodayString() {
  return moment().format('YYYYMMDD');
}
