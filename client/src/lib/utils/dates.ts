import dayjs from "dayjs";
import customerParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customerParseFormat)

export function formatShortDate(date: any) {
  const format = "d/m/YYYY";
  const formattedDate = dayjs(date).format(format);
  if (dayjs(formattedDate, format).isValid()) return formattedDate;
  return date;
}

export function formatShortYear(date: any) {
  const format = "DD/MM/YY";
  const formattedDate = dayjs(date).format(format);
  if (dayjs(formattedDate, format).isValid()) return formattedDate;
  return date;
}

export function formatDate(date: any) {
  const format = "DD/MM/YYYY";
  const formattedDate = dayjs(date).format(format);
  if (dayjs(formattedDate, format).isValid()) return formattedDate;
  return date;
}

export function formatShortDateTime(date: any) {
  const format = "DD/MM HH:mm";
  const formattedDate = dayjs(date).format(format);
  if (dayjs(formattedDate, format).isValid()) return formattedDate;
  return date;
}

export function formatDateTime(date: any, withSeconds?: boolean) {
  if (!date) return null;
  const format = withSeconds ? "DD/MM/YYYY HH:mm:ss" : "DD/MM/YYYY HH:mm";
  const formattedDate = dayjs(new Date(date).toISOString()).format(format);
  if (dayjs(formattedDate, format).isValid()) return formattedDate;
  return date;
}

export function convertDateToEpoch(date: any, format?: string) {
  const inputFormat = format || "DD/MM/YYYY HH:mm:ss";
  const epoch = dayjs(date, inputFormat).valueOf();
  return epoch;
}
export function formatShortDateDayMonth(date: any) {
  const format = "DD/MM ";
  const formattedDate = dayjs(date).format(format);
  if (dayjs(formattedDate, format).isValid()) return formattedDate;
  return date;
}

export default {};
