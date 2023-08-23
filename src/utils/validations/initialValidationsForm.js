function isValidDate(year1, month1, day1) {
  const date = new Date(year1, month1 - 1, day1);

  if (
    // Si cualquiera de estas condiciones se cumple, significa que la fecha ha sido ajustada
    //  automáticamente durante la creación del objeto de fecha debido a valores inválidos
    //  (por ejemplo, un día como el 31 de junio se ajustaría al 1 de julio).
    //  En ese caso, la función retorna false, indicando que la fecha no es válida.
    //   Si ninguna de estas condiciones se cumple, la función retorna true,
    //    lo que significa que la fecha es válida.
    date.getFullYear() !== year1 ||
    date.getMonth() !== month1 - 1 ||
    date.getDate() !== day1
  ) {
    return false;
  }

  return true;
}

export const initialValidations = (validations) => {
  const { day, month, year } = validations;
  const year1 = year;
  const month1 = month;
  const day1 = day;
  const actualDate = new Date();
  const myBirthDay = new Date(year, month - 1, day);

  let errores = {};

  if (!validations.day) {
    errores.day = "This field is required";
  } else if (validations.day > 31) {
    errores.day = "Must be a valid day";
  }

  if (!validations.month) {
    errores.month = "This field is required";
  } else if (validations.month > 12) {
    errores.month = "Must be a valid month";
  }

  if (!validations.year) {
    errores.year = "This field is required";
  } else if (validations.year > actualDate.getFullYear()) {
    errores.year = "Must be in the past";
  }

  if (myBirthDay > actualDate) {
    errores.day = "Must be a valid date";
  }

  if (isValidDate(year1, month1, day1)) {
    // console.log("Fecha válida.");
  } else if (validations.day <= 31) {
    // console.log("Fecha inválida.");
    errores.day = "Must be a valid date";
  }

  return errores;
};
