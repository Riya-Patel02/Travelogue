const DateTimePickerComponent = ({value, onDateChange}) => {
  const minimumDate = new Date();
  console.log('in');
  return (
    <DatePicker
      value={value}
      minimumDate={minimumDate}
      dateFormat="day month year"
      is24Hour={false}
      mode="date"
      display="calendar"
      onChange={onDateChange()}
    />
  );
};

export default DateTimePickerComponent;
