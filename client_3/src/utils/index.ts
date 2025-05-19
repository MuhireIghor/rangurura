/* eslint-disable @typescript-eslint/no-explicit-any */

import store from "store";
import { cypherText, decypherText } from "./auth";
// store data in the store withouth overwriting the old data
export const storeData = (
  key: string,
  value: any,
  isArray: boolean = false,
  encrypt: boolean = false
) => {
  const data = store.get(key) || (isArray ? [] : {});
  const newData = isArray ? value : { ...data, ...value };
  if (encrypt) {
    return store.set(key, cypherText(newData));
  }
  return store.set(key, newData);
};

export const clearStoreData = (key: string) => {
  store.remove(key);
};

// get data in the local store
export const getStoredData = (key: string, descrypt: boolean = false) => {
  const data = store.get(key);
  if (data && descrypt) {
    return decypherText(data);
  }
  return data;
};

// delete a specific subkey in the store
export const emptyStoreData = (key: string) => {
  store.remove(key);
};

export const formatDate = (isoDate: Date) => {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
export const getResError = (error?: any) => {
  if (!error) return "Something Went Wrong";
  const isNetError = error?.message?.includes("Network Error");
  if (isNetError) return "Network Error";
  return (
    error?.response?.data?.error ??
    error?.response?.data?.message ??
    error?.message ??
    "Something Went Wrong"
  );
};

/**
 *
 * @param str
 * @returns for example: "FIRST_TERM" => "First Term"
 */
export const enumToCamelCase = (str: string | null | undefined) => {
  if (!str) return "";
  return str
    ?.split(/[\s_]+/)
    .map((word) => {
      return word?.charAt(0).toUpperCase() + word?.slice(1)?.toLowerCase();
    })
    .join(" ");
};

/**
 * function that takes a key string like 'name' or 'name.first' and returns a function that takes an object and returns the value of the key in the object
 * @param key - the key to get the value of
 * @param obj - the object to get the value from
 */
export const getObjValue = (key: string | number, obj: any) => {
  const keys = key.toString().split(".");
  let result = obj;
  for (const key of keys) {
    if (result && Object.prototype.hasOwnProperty.call(result, key)) {
      result = result[key];
    } else {
      return undefined;
    }
  }
  return result as string;
};
