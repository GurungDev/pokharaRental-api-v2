export enum UNIT_FOR_DATE_INTERVAL {
  SECOND = "second",
  MINUTE = "minute",
  HOUR = "hour",
  DAY = "day",
}

export function getDateInInterval(
  span: number,
  unit: UNIT_FOR_DATE_INTERVAL
): Date {
  let requiredDate: Date | number = new Date();

  switch (unit) {
    case UNIT_FOR_DATE_INTERVAL.DAY:
      requiredDate.setUTCDate(requiredDate.getUTCDate() + span);
      break;
    case UNIT_FOR_DATE_INTERVAL.HOUR:
      requiredDate.setUTCHours(requiredDate.getUTCHours() + span);
      break;
    case UNIT_FOR_DATE_INTERVAL.MINUTE:
      requiredDate.setUTCMinutes(requiredDate.getUTCMinutes() + span);
      break;
    case UNIT_FOR_DATE_INTERVAL.SECOND:
      requiredDate.setUTCSeconds(requiredDate.getUTCSeconds() + span);
      break;
    default:
      throw new Error(`unknown unit inputted.`);
  }

  return new Date(requiredDate);
}
