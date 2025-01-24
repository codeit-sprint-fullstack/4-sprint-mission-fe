function CalculateTimeDiff(updatedDate, currentDate, setTimeDiff) {
  const seconds = Math.floor((currentDate - updatedDate) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    setTimeDiff(`${seconds}초 전`);
  } else if (minutes < 60) {
    setTimeDiff(`${minutes}분 전`);
  } else if (hours < 24) {
    setTimeDiff(`${hours}시간 전`);
  } else {
    setTimeDiff(`${days}일 전`);
  }
}

export default CalculateTimeDiff;
