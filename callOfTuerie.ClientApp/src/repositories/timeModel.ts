export default class TimeModel {
  public time = "00:00";
  constructor(time: string) {
    this.time = time;
  }

  public get hours() {
    return parseInt(this.time.split(":")[0]);
  }

  public get minutes() {
    return parseInt(this.time.split(":")[1]);
  }

  public get formatedString() {
    return this.hours + "h " + this.minutes;
  }

  public get totalMinutes() {
    return this.hours * 60 + this.minutes;
  }
}
