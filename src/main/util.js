/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { BrowserWindow, clipboard } from 'electron';
const ITEM_MAX_LENGTH = 100;
var STACK_SIZE = 10;

export function resolveHtmlPath(htmlFileName) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export const getWindow = (env) => {
  const ID = 1 * Number(process.env[env]);
  return BrowserWindow.fromId(ID);
};

export function addToStack(item, stack = []) {
  if (item) {
    var index = stack.indexOf(item);
    if (index !== -1) stack.splice(index, 1);
    return [item].concat(
      stack.length >= STACK_SIZE ? stack.slice(0, stack.length - 1) : stack,
    );
  } else {
    return stack;
  }
}

