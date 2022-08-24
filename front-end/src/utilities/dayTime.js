const calculateTime = (timeString) => {
  const postTime = new Date(timeString);
  var diff = Math.abs(new Date() - postTime);
  if (diff < 1000 * 60) {
    return "0 minutes ago";
  } else if (diff < 1000 * 60 * 60) {
    return Math.floor(diff / 1000 / 60) + " minutes ago";
  } else if (diff < 1000 * 60 * 60 * 24) {
    return Math.floor(diff / 1000 / 60 / 60) + " hours ago";
  } else if (diff < 1000 * 60 * 60 * 24 * 30) {
    return Math.floor(diff / 1000 / 60 / 60 / 24) + " days ago";
  } else if (diff < 1000 * 60 * 60 * 24 * 365) {
    return Math.floor(diff / 1000 / 60 / 60 / 24 / 30) + " months ago";
  } else {
    return Math.floor(diff / 1000 / 60 / 60 / 24 / 365) + " years ago";
  }
};
//TODO: Làm một hàm tính ngày và thời gian để sử dụng chung ở đây
const toReadAbleDate = (dateString) => {
  const splitInfo = dateString.slice(0, 10).split("-");
  return splitInfo[2] + "/" + splitInfo[1] + "/" + splitInfo[0];
};

const toReadAbleDateTime = (dateString) => {
  const dateObject = new Date(dateString);
  const splitInfo = dateString.slice(0, 10).split("-");
  return `${dateObject.getDate()}/${
    dateObject.getMonth() + 1
  }/${dateObject.getFullYear()} ${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}${(
    dateObject.getMilliseconds() / 1000
  )
    .toString()
    .slice(1)}`;
};

module.exports = {
  toReadAbleDate,
  calculateTime,
  toReadAbleDateTime,
};
