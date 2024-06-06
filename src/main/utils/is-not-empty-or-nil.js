import { pipe, not } from "ramda";
import isEmptyOrNil from "./is-empty-or-nil";

const isNotEmptyOrNil = pipe(isEmptyOrNil, not);

export default isNotEmptyOrNil;
