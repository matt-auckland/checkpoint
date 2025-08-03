import type { CheckInFull, CheckInWithFullName, User } from 'shared';

export function attachFullName(
  checkIn: CheckInFull,
  users: User[]
): CheckInWithFullName {
  const userId = checkIn.userId;
  const user = users.find((user) => userId == user._id.toString());

  const updatedCheckIn: CheckInWithFullName = {
    ...checkIn,
    fullName: user?.fullName || '',
  };
  return updatedCheckIn;
}

// poorman's  date validation
// a better way would be to pass the components indivudually to the API perhaps?
export function dateValidation(dateStr: string): boolean {
  const [year, month, date] = dateStr.split('-');
  if (year.length != 4 || month.length != 2 || date.length != 2) {
    return false;
  }
  return true;
}

export function prepDateQuery(dateStr: string): { $gte: Date; $lt: Date } {
  const start = new Date(dateStr);
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 1);
  return { $gte: start, $lt: end };
}
