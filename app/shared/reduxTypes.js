/* @flow */

export type Action = {
  type: string,
  payload: $Shape<{
    entities: Object,
    update: Function,
    uid: string
  }>,
  meta?: any,
  error?: ?boolean
}
