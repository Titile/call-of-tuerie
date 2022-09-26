import TimeModel from "@/repositories/timeModel";

declare global {
  interface String {
    isNullOrEmpty(): boolean;
    toTimeModel(): TimeModel;
  }
}

String.prototype.isNullOrEmpty = function () {
  return !this || this == undefined || this == "";
};

String.prototype.toTimeModel = function () {
  return new TimeModel(this as string);
};

export {};
