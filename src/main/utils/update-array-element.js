import {
  curry,
  map,
  when,
  propEq,
  assoc,
  pipe,
  prop,
  equals,
  not,
} from "ramda";

const updateArrayElement = curry((id, propName, propValue, items) =>
  map(when(propEq(id, "id"), assoc(propName, propValue)), items)
);

export const updateMessages = curry((id, propName, propValue, items) =>
  map(
    when(
      propEq(id, "id") && pipe(prop("status"), equals("READ"), not),
      assoc(propName, propValue)
    ),
    items
  )
);

export default updateArrayElement;
