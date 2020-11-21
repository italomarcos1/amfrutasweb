import { getMonth, isLeapYear } from 'date-fns';

export const hours = [
  { value: '08:00', label: '08:00' },
  { value: '09:00', label: '09:00' },
  { value: '10:00', label: '10:00' },
  { value: '11:00', label: '11:00' },
  { value: '12:00', label: '12:00' },
  { value: '13:00', label: '13:00' },
  { value: '14:00', label: '14:00' },
  { value: '15:00', label: '15:00' },
  { value: '16:00', label: '16:00' },
  { value: '17:00', label: '17:00' },
  { value: '18:00', label: '18:00' },
  { value: '19:00', label: '19:00' },
  { value: '20:00', label: '20:00' },
];

export function returnNumberOfDays(date) {
  // jan = 31
  // fev = 29/28
  // mar = 31
  // abr = 30
  // mai = 31
  // jun = 30
  // jul = 31
  // ago = 31
  // set = 30
  // out = 31
  // nov = 30
  // dez = 31
  // 2 eh o primeiro subcaso
  // %==2 30
  // >7 inverte
  /// /%==2 31

  const thirtyDaysArray = [
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '03', label: '03' },
    { value: '04', label: '04' },
    { value: '05', label: '05' },
    { value: '06', label: '06' },
    { value: '07', label: '07' },
    { value: '08', label: '08' },
    { value: '09', label: '09' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },
    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
    { value: '25', label: '25' },
    { value: '26', label: '26' },
    { value: '27', label: '27' },
    { value: '28', label: '28' },
    { value: '29', label: '29' },
    { value: '30', label: '30' },
    { value: '31', label: '31' },
  ];

  const month = getMonth(date) + 1;
  console.tron.log(month);
  if (month === 2) {
    if (isLeapYear(date)) {
      console.tron.log('leap');
      thirtyDaysArray.splice(29);
    } else {
      console.tron.log('not leap');

      thirtyDaysArray.splice(28);
    }

    return thirtyDaysArray;
  }

  if ((month > 7 && month % 2 === 0) || (month < 7 && month % 2 !== 0)) {
    thirtyDaysArray.splice(30);
    console.tron.log('30 dias');

    return thirtyDaysArray;
  }
  console.tron.log('31 dias');

  return thirtyDaysArray;
}
