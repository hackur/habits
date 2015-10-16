/* @flow */

export type Action = {
  type: number;
  description: string | Object;
  update: Function;
};
