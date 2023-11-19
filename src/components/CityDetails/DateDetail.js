const DateDetail = () => {
  const currentDate = new Date();
  const dayOptions = { weekday: 'long' };
  const monthOptions = { month: 'long' };

  const dayOfWeek = currentDate.toLocaleDateString('en-US', dayOptions);
  const month = currentDate.toLocaleDateString('en-US', monthOptions);
  const dayOfMonth = currentDate.getDate();
  const year = currentDate.getFullYear();

  return (
    <div className="date-wrapper">
      <div className="title">{dayOfWeek}</div>
      <div className="subtitle">{`${month} ${dayOfMonth}, ${year}`}</div>
    </div>
  );
};

export default DateDetail
