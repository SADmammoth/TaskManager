export default function toLinearIndex(index, columns) {
  return (index.x - 1) * columns + index.y;
}
