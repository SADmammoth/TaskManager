export default function setTransferData(data, dropEffect, e) {
  e.dataTransfer.setData(
    'application/json',
    JSON.stringify({ data, dropEffect })
  );
}
