import { deleteCookie, getCookies } from "cookies-next";
import moment from "moment";

type NUMBERFORMAT = {
  amount: string | number;
  notation?: "standard" | "scientific" | "engineering" | "compact" | undefined;
  style?: any;
  currency?: string;
};

export const formatDate = (date: any, format: string) => {
  return moment(date).format(format);
};

export const formatDateAgo = (date: any, format?: string) => {
  return moment(date).startOf("day").fromNow();
};

export const removeComma = (input: string) => {
  if (input === undefined || input === null) {
    return "";
  }
  const stringInput = input.toString();

  const formattedValue = stringInput.replace(/,/g, "");

  return formattedValue;
};

export const formatAmount = ({
  amount,
  currency,
  notation,
  style,
}: NUMBERFORMAT) => {
  const numberFormat = new Intl.NumberFormat("en-NG", {
    ...(notation && { notation }),
    ...(style && { style }),
    ...(currency && { currency }),
    ...(style && { maximumFractionDigits: 2 }),
    ...(style && { minimumFractionDigits: 2 }),
  });

  return numberFormat.format(Number(amount));
  // return Number(amount) ? numberFormat.format(Number(amount)) : amount;
};

export const getOrdinal = (count: any) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return "st";
  } else if (count % 10 === 2 && count % 100 !== 12) {
    return "nd";
  } else if (count % 10 === 3 && count % 100 !== 13) {
    return "rd";
  } else {
    return "th";
  }
};

export const removeExtension = (filename: string) => {
  const dotIndex = filename?.lastIndexOf(".");
  if (dotIndex !== -1) {
    return filename?.substring(0, dotIndex);
  }
  return filename;
};

export const validatePassword = (inputPassword: string) => {
  if (!inputPassword) {
    return "Password is required";
  }

  if (inputPassword.startsWith(".") || inputPassword.includes("\n")) {
    return "Password cannot start with a dot (.) or newline character";
  }

  const hasDigitOrSpecialChar = /[0-9\W]/.test(inputPassword);
  const hasUppercase = /[A-Z]/.test(inputPassword);
  const hasLowercase = /[a-z]/.test(inputPassword);

  if (!hasDigitOrSpecialChar) {
    return "Password must contain at least one digit or special character";
  }

  if (!hasUppercase) {
    return "Password must contain at least one uppercase letter";
  }

  if (!hasLowercase) {
    return "Password must contain at least one lowercase letter";
  }

  if (inputPassword.length < 8) {
    return "Password must contain a minimum of 8 characters";
  }

  return true;
};

export const isValidUrl = (urlString: string) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

export const checkImageLink = (url: string) => {
  const urlParts = url.split(".");
  const extension = urlParts[urlParts.length - 1].toLowerCase();

  // prettier-ignore
  // List of common image file extensions
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "tif", "WebP", "svg", "ico"];

  if (imageExtensions.includes(extension)) {
    return true;
  } else {
    return false;
  }
};

export function getNumberOfPages(
  rowCount: number,
  rowsPerPage: number
): number {
  return Math.ceil(rowCount / rowsPerPage);
}

export function clearCookies() {
  const cookies = getCookies();
  Object.keys(cookies).forEach((key) => {
    deleteCookie(key);
  });
}

export const decodeJWT = (jwtToken: any) => {
  if (jwtToken !== undefined) {
    const payloadBase64 = jwtToken?.split(".")[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
  }
};
