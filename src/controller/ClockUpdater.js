export default class ClockUpdater {
  async start(update_cb, evey_min_1_every_sec_2 = 1, pass_date = true) {
    let now = new Date();
    update_cb(now);
    let interval = 0;
    let delay = 0;
    if (evey_min_1_every_sec_2 === 1) {
      interval = 60000;
      delay = interval - now.getSeconds() * 1000 - now.getMilliseconds();
      console.log(delay);
    } else if (evey_min_1_every_sec_2 === 2) {
      interval = 1000;
      delay = interval - now.getMilliseconds();
    } else {
      throw Error('Wrong argument "evey_min_1_every_sec_2" provided');
    }
    setTimeout(() => {
      update_cb(new Date());
      this.interval = setInterval(() => update_cb(pass_date ? new Date() : null), interval);
    }, delay);
  }
}
