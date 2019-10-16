export default class ClockUpdater {
  async start(update_cb) {
    let now = new Date();
    update_cb(now);
    let interval = 60000;
    let delay = interval - now.getSeconds() * 1000 - now.getMilliseconds();

    setTimeout(() => {
      update_cb(new Date());
      this.repeater = setInterval(() => update_cb(new Date()), interval);
    }, delay);
  }

  stop() {
    clearInterval(this.repeater);
  }
}
