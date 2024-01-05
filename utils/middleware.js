export function camelCase(str) {
  return str
    ?.toLowerCase() // Convert the entire string to lowercase
    .replace(/\b\w/g, function (word) {
      return word.toUpperCase(); // Convert the first character of each word to uppercase
    });
}

export const dateFormatter = (date) => {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


export function timeAgo(date) {
  const currentDate = new Date();
  const timestamp = date.getTime();
  const currentTimestamp = currentDate.getTime();
  const difference = currentTimestamp - timestamp;

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months > 0) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else if (days > 0) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
  }
}


export function formatDate(inputDate) {
  const dateObj = new Date(inputDate);
  const day = dateObj.getUTCDate().toString().padStart(2, '0');
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const year = dateObj.getUTCFullYear();

  return `${day}/${month}/${year}`;
}