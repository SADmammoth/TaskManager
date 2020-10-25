export default function moveDate(date, r, c, timeStep) {
  let arrangeDate = new Date(date);

  arrangeDate.setDate(arrangeDate.getDate() + c - 1);
  arrangeDate.setHours(arrangeDate.getHours() + (r - 1) * timeStep);

  return arrangeDate;
}
