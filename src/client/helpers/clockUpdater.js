export default function clockUpdater(interval = 60000) {
  let repeater;
  let timeout;

  return {
    start: (updateCallback) => {
      let now = new Date();
      updateCallback(now);
      let delay = interval - now.getSeconds() * 1000 - now.getMilliseconds();

      timeout = setTimeout(() => {
        updateCallback(new Date());
        repeater = setInterval(() => updateCallback(new Date()), interval);
      }, delay);
    },

    stop: () => {
      if (repeater != null) {
        clearInterval(repeater);
      }
      if (timeout != null) {
        clearTimeout(timeout);
      }
    },
  };
}
