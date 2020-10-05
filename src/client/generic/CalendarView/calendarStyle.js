export default function calendarStyle(rows, columns) {
  return {
    display: 'grid',
    gridAutoFlow: 'row',
    gridTemplateColumns: `repeat(${columns + 1},100px)`,
    gridTemplateRows: `repeat(${rows + 1},50px)`,
  };
}
