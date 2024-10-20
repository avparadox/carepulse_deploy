import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combine class names with clsx and tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Parse and stringify a value, useful for deep copying
export const parseStringify = (value: any) => {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    console.error("Failed to parse and stringify:", error);
    return null; // Return null if serialization fails
  }
};

// Convert a File object to a URL string for display or download purposes
export const convertFileToUrl = (file: File | null) => {
  if (!file) {
    console.error("Invalid file provided");
    return null;
  }
  return URL.createObjectURL(file);
};

// Format date and time based on provided date string and time zone
export const formatDateTime = (
  dateString: Date | string,
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
) => {
  try {
    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) {
      throw new Error("Invalid date provided");
    }

    // Ensure timeZone is valid, fallback to 'UTC' if not
    const validTimeZone = timeZone || "UTC";

    const dateTimeOptions: Intl.DateTimeFormatOptions = {
      weekday: "short", // abbreviated weekday name (e.g., 'Mon')
      month: "short",   // abbreviated month name (e.g., 'Oct')
      day: "numeric",   // numeric day of the month (e.g., '25')
      year: "numeric",  // numeric year (e.g., '2023')
      hour: "numeric",  // numeric hour (e.g., '8')
      minute: "numeric", // numeric minute (e.g., '30')
      hour12: true,     // use 12-hour clock (true) or 24-hour clock (false)
      timeZone: validTimeZone, // use the provided timezone
    };

    const dateDayOptions: Intl.DateTimeFormatOptions = {
      weekday: "short",  // abbreviated weekday name (e.g., 'Mon')
      year: "numeric",   // numeric year (e.g., '2023')
      month: "2-digit",  // two-digit month (e.g., '10')
      day: "2-digit",    // two-digit day (e.g., '25')
      timeZone: validTimeZone,  // use the provided timezone
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
      month: "short",   // abbreviated month name (e.g., 'Oct')
      year: "numeric",  // numeric year (e.g., '2023')
      day: "numeric",   // numeric day of the month (e.g., '25')
      timeZone: validTimeZone,  // use the provided timezone
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",  // numeric hour (e.g., '8')
      minute: "numeric", // numeric minute (e.g., '30')
      hour12: true,     // use 12-hour clock (true) or 24-hour clock (false)
      timeZone: validTimeZone,  // use the provided timezone
    };

    const formattedDateTime = dateObject.toLocaleString("en-US", dateTimeOptions);
    const formattedDateDay = dateObject.toLocaleString("en-US", dateDayOptions);
    const formattedDate = dateObject.toLocaleString("en-US", dateOptions);
    const formattedTime = dateObject.toLocaleString("en-US", timeOptions);

    return {
      dateTime: formattedDateTime,
      dateDay: formattedDateDay,
      dateOnly: formattedDate,
      timeOnly: formattedTime,
    };
  } catch (error) {
    console.error("Error formatting date:", error);
    return {
      dateTime: "",
      dateDay: "",
      dateOnly: "",
      timeOnly: "",
    };
  }
};

// Encrypt a string using base64 encoding
export function encryptKey(passkey: string) {
  try {
    return btoa(passkey);
  } catch (error) {
    console.error("Failed to encrypt key:", error);
    return null; // Return null in case of failure
  }
}

// Decrypt a base64 encoded string
export function decryptKey(passkey: string) {
  try {
    return atob(passkey);
  } catch (error) {
    console.error("Failed to decrypt key:", error);
    return null; // Return null in case of failure
  }
}
