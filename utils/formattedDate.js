import moment from 'moment';
import 'moment/locale/ko';

export function formattedDate(date) {
  const newDate = moment(date).format('YYYY.MM.DD');
  return newDate;
}
