import icon from "./assets/icon-arrow.svg";
import { useFormik } from "formik";
import { initialValuesForm } from "./utils/values/initialValuesForm";
import { initialValidations } from "./utils/validations/initialValidationsForm";
import { useState } from "react";

const App = () => {
  const [edadResult, setEdadResult] = useState({
    años: "",
    meses: "",
    dias: "",
  });
  const { errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: initialValuesForm,
    onSubmit: (formData) => {
      calculateAge(formData);
    },
    validate: initialValidations,
  });

  const calculateAge = (formData) => {
    const { day, month, year } = formData;

    // Fecha actual
    var fechaActual = new Date();

    // Fecha de nacimiento
    var fechaNacimiento = new Date(year, month - 1, day); // Ejemplo de fecha de nacimiento

    // // Calcular la diferencia en milisegundos entre las fechas
    // var diferenciaTiempo = fechaActual - fechaNacimiento;

    // Convertir la diferencia de milisegundos a años, meses y días
    var edadEnAnios = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    var mesesDiferencia = fechaActual.getMonth() - fechaNacimiento.getMonth();
    var diasDiferencia = fechaActual.getDate() - fechaNacimiento.getDate();

    // Ajustar los valores si la diferencia de días es negativa
    if (diasDiferencia < 0) {
      mesesDiferencia--;
      var ultimoDiaDelMesAnterior = new Date(
        fechaActual.getFullYear(),
        fechaActual.getMonth(),
        0
      ).getDate();
      diasDiferencia = ultimoDiaDelMesAnterior + diasDiferencia;
    }

    // Ajustar los valores si la diferencia de meses es negativa
    if (mesesDiferencia < 0) {
      edadEnAnios--;
      mesesDiferencia = 12 + mesesDiferencia;
    }

    setEdadResult({
      ...edadResult,
      años: edadEnAnios,
      meses: mesesDiferencia,
      dias: diasDiferencia,
    });
  };

  return (
    <>
      <div className="containerApp">
        <form onSubmit={handleSubmit}>
          <section className="birthdayContainer">
            <div className="containerDay">
              <label className={errors.day && touched.day ? "lableInputError" : " lableInput"} htmlFor="day">day</label>
              <input
              className={errors.day && touched.day ? "errorInputBoder" : null }
                type="number"
                placeholder="DD"
                maxLength="2"
                onChange={handleChange}
                name="day"
              />
              <span className="errorInputField">
                {touched.day && errors.day ? errors.day : null}
              </span>
            </div>
            <div className="containerMonth">
              <label className={errors.month && touched.month ? "lableInputError" : " lableInput"} htmlFor="day">month</label>
              <input
              className={errors.month && touched.month ? "errorInputBoder" : null }
                type="number"
                placeholder="MM"
                maxLength="2"
                onChange={handleChange}
                name="month"
              />
              <span className="errorInputField">
                {touched.month && errors.month ? errors.month : null}
              </span>
            </div>
            <div className="containerYear">
              <label className={errors.year && touched.year ? "lableInputError" : " lableInput"} htmlFor="day">year</label>
              <input
              className={errors.year && touched.year ? "errorInputBoder" : null }
                type="number"
                placeholder="YYYY"
                maxLength="4"
                onChange={handleChange}
                name="year"
              />
              <span className="errorInputField">
                {touched.year && errors.year ? errors.year : null}
              </span>
            </div>
          </section>

          <section className="container-Icon-line">
            <hr className="separator" />
            <button type="submit">
              {" "}
              <img src={icon} alt="icon" />
            </button>
          </section>
        </form>

        <section className="resultContainer">
          <div className="resultYear">
            <span className={edadResult.años !== "" ? 'active' : "resultNumber"}>
              {edadResult.años !== "" ? edadResult.años : "--"}
            </span>
            <p>years</p>
          </div>
          <div className="resultMonth">
            <span className={edadResult.meses !== "" ? 'active' : "resultNumber"}>
              {edadResult.meses !== "" ? edadResult.meses : "--"}
            </span>
            <p>months</p>
          </div>
          <div className="resultDays">
            <span className={edadResult.dias !== "" ? 'active' : "resultNumber"}>
              {edadResult.dias !== "" ? edadResult.dias : "--"}
            </span>
            <p>days</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default App;
