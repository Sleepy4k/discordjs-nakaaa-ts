const getCurrentDate = (): string => {
  const now = new Date();
  return now.toISOString()
    .split('T')[0] || '';
}

const getCurrentDateWithTime = (): string => {
  const now = new Date();
  return now.toISOString()
    .replace('T', ' ')
    .split('.')[0] || '';
}

export {
  getCurrentDate,
  getCurrentDateWithTime
};
