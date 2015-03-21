/**
 * @flow
 */

const moment = require('moment');
const curry = require('lodash/function/curry');
const compose = require('lodash/function/compose');

function formatMomentDef(formatString: string, momentDate): string {
  return momentDate.format(formatString);
}

const formatMoment = curry(formatMomentDef);

function getCurrentMoment() {
  return moment();
}

const getCurrentDayKey = compose(formatMoment('YYYYMMDD'), getCurrentMoment);

function parseStringDef(format: string, string: string) {
  return moment(string, format);
}

const parseString = curry(parseStringDef);

function parseDayKey(dayKey: string): any {
  return parseString('YYYYMMDD', dayKey);
}

function getStartOfDef(unit: string, momentDate: Object) {
  return momentDate.startOf(unit);
}

const getStartOf = curry(getStartOfDef);

/**
 * momentDate should only be specific down to the day
 */
function isInFuture(momentDate: Object): boolean {
  return moment().isBefore(momentDate, 'day');
}

function isToday(momentDate: Object): boolean {
  return moment().isSame(momentDate, 'day');
}

function isSameDayDef(momentToCompare: Object, momentDate: Object): boolean {
  return momentToCompare.isSame(momentDate, 'day');
}

const isSameDay = curry(isSameDayDef);

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
  isSameDay,
  getDayParams,
  getPreviousDay,
  getNextDay,
  getPreviousDayLinkParams,
  getNextDayLinkParams
};

