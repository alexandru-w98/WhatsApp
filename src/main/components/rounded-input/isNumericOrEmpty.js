const isNumericOrEmpty = (val) => {
  if (/^\d+$/.test(val) || val === "") {
    return true;
  }

  return false;
};

export default isNumericOrEmpty;
