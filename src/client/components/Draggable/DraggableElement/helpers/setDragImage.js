export default function setDragImage(e) {
  e.dataTransfer.setDragImage(document.createElement('div'), 0, 0);
}
