import { isEmpty, isNil } from "ramda";

const isEmptyOrNil = (val) => isNil(val) || isEmpty(val);

export default isEmptyOrNil;
