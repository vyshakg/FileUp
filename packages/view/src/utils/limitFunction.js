function limit(value) {
  return this.filter((arr, index) => {
    if (index <= value - 1) return true;
    else return false;
  });
}

export default limit;
