function addEventListener(event, func) {
  switch (event) {
    case "click":
      while (true) {
        if (angelSaysBoomClick === true) {
          func({
            offsetX: 67,
            offsetY: 78,
            type: event,
          });
        }
      }
    case "dblclick":
      while (true) {
        if (angelSaysBoomDoubleClick === true) {
          func({
            offsetX: 67,
            offsetY: 78,
            type: event,
          });
        }
      }

    default:
      break;
  }
}
