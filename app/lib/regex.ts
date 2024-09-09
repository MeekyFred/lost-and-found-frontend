export const firstNameRegEx = new RegExp(/^[A-Z][A-Za-z]{2,15}$/);

export const lastNameRegEx = new RegExp(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/);

export const fullNameRegEx = new RegExp(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/);

export const emailRegEx = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/); // prettier-ignore

// export const phoneNumberRegEx = new RegExp(
//   /^([0-9]{4})[-]?([0-9]{3})[-]?([0-9]{4})$/
// );

// export const phoneNumberRegEx = new RegExp(/^([0-9]{4})([0-9]{3})([0-9]{4})$/);

export const phoneNumberRegEx = new RegExp(/(\d{4})(\d{3})(\d{4})/);

// prettier-ignore
export const strongPasswordRegEx = new RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);

export const mediumRegEx = new RegExp(
  /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
);

const urlExpression =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const urlRegEx = new RegExp(urlExpression);

export const regNoRegEx = new RegExp(/^(RC|BN)\d{3,}$/);
