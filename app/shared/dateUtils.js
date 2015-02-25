/**
 * @flow
 */

'use strict';

var moment = require('moment');
var curry = require('lodash/function/curry');
var compose = require('lodash/function/compose');

function formatMomentDef(formatString: string, momentDate): string {
  return momentDate.format(formatString);
}

var formatMoment = curry(formatMomentDef);

function getCurrentMoment() {
  return moment();
}

var getCurrentDayKey = compose(formatMoment('YYYYMMDD'), getCurrentMoment);

function parseStringDef(format: string, string: string) {
  return moment(string, format);
}

var parseString = curry(parseStringDef);

function parseDayKey(dayKey: string): any {
  return parseString('YYYYMMDD', dayKey);
}

function getStartOfDef(unit: string, momentDate: Object) {
  return momentDate.startOf(unit);
}

var getStartOf = curry(getStartOfDef);

/**
 * momentDate should only be specific down to the day
 */
function isInFuture(momentDate: Object): boolean {
  return moment().isBefore(momentDate, 'day');
}

function isToday(momentDate: Object): boolean {
  return moment().isSame(momentDate, 'day');
}

function getDayParams(momentDate: Object): Object {
  return {
    year: formatMoment('YYYY')(momentDate),
    month: formatMoment('MM')(momentDate),
    day: formatMoment('DD')(momentDate)
  };
}

function getNextDay(momentDate: Object): Object {
  return momentDate.clone().add(1, 'days');
}

function getPreviousDay(momentDate: Object): Object {
  return momentDate.clone().subtract(1, 'days');
}

function getPreviousDayLinkParams(momentDate: Object): Object {
  return compose(getDayParams, getPreviousDay)(momentDate);
}

function getNextDayLinkParams(momentDate: Object): Object {
  return compose(getDayParams, getNextDay)(momentDate);
}

module.exports = {
  formatMoment,
  getCurrentMoment,
  getCurrentDayKey,
  parseString,
  parseDayKey,
  getStartOf,
  isInFuture,
  isToday,
  getDayParams,
  getPreviousDay,
  getNextDay,
  getPreviousDayLinkParams,
  getNextDayLinkParams
};

