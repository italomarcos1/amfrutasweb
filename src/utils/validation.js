import { getYear, isExists } from 'date-fns';

const dateValidation = new RegExp(
  /^[0-3][0-9]\/[0-1][0-9]\/[1-2][0|9][0-9][0-9]$/
);

const doesDateExists = date => {
  const [day, month, year] = date.split('/');

  const formattedMonth = Number(month) - 1;
  const formattedDay = Number(day);
  const formattedYear = Number(year);
  const currentYear = Number(getYear(new Date()));

  return (
    isExists(formattedYear, formattedMonth, formattedDay) &&
    currentYear >= formattedYear
  );
};

export const dateIsValid = date => {
  return dateValidation.test(date) && doesDateExists(date);
};

const mailValidation = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const mailIsValid = email => {
  return mailValidation.test(String(email).toLowerCase());
};

const nameValidation = new RegExp(/^\s+$/);

export const nameIsValid = name => {
  return nameValidation.test(name) || name === '';
};

const postcodeValidation = new RegExp(/^[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9]$/);

export const postcodeIsValid = postcode => {
  return postcodeValidation.test(postcode);
};

const phoneValidation = new RegExp(
  /^[0-9][0-9][\s][0-9][0-9][0-9][\s][0-9][0-9][\s][0-9][0-9]$/
);

export const phoneIsValid = phone => {
  return phoneValidation.test(phone);
};

const documentValidation = new RegExp(
  /^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/
);

export const documentIsValid = document => {
  return documentValidation.test(document);
};

const mailCodeValidation = new RegExp(
  /^[0-9][0-9][\s][0-9][0-9][\s][0-9][0-9]$/
);

export const mailCodeIsValid = mailCode => {
  return mailCodeValidation.test(mailCode);
};
