export default class ClockUpdater {
  repeater: NodeJS.Timeout | null = null;

  async start(update_cb: (date: Date) => any) {
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
    if (this.repeater != null) {
      clearInterval(this.repeater);
    }
  }
}
