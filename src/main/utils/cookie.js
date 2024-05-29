import { pipe, split, startsWith, propOr, find, defaultTo } from "ramda";

export const getCookieValue = (cookieName) =>
  pipe(
    defaultTo(""),
    split("; "),
    find(startsWith(`${cookieName}=`)),
    defaultTo(""),
    split("="),
    propOr(null, 1)
  )(document.cookie);

export const setCookie = (label, value) => {
  document.cookie = `${label}=${value}`;
};
