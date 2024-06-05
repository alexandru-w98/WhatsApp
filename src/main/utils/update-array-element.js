import { curry, map, when, propEq, assoc } from "ramda";

const updateArrayElement = curry((id, propName, propValue, items) =>
  map(when(propEq(id, "id"), assoc(propName, propValue)), items)
);

export default updateArrayElement;
