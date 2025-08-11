function compareDate(actually, start, end) {
  if (!start && !end) {
    return true;
  }

  const dActually = new Date(actually);
  let [day, month, year] = start.split("/").map(Number);
  const dStart = new Date(year, month - 1, day+1 );

  [day, month, year] = end.split("/").map(Number);
  const dEnd = new Date(year, month - 1, day + 2);
  return dStart <= dActually && dActually <= dEnd;
}
export default compareDate;
