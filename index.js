function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find((event) => event.date === date);
    let timeOut = employee.timeOutEvents.find((event) => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    let datesWorked = employee.timeInEvents.map((event) => event.date);
    let wages = datesWorked.map((date) => wagesEarnedOnDate(employee, date));
    return wages.reduce((total, wage) => total + wage, 0);
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
  }
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
  };
  

