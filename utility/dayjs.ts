import dayjs from "dayjs";

export function formatDate(date: Date | string, format: string) {
  return dayjs(date).format(format);
}

export function isOlderDate(dateA: Date | string, dateB: Date | string) {
  return dayjs(dateA).isBefore(dateB);
}

export function isNewerDate(dateA: Date | string, dateB: Date | string) {
  return dayjs(dateA).isAfter(dateB);
}
