function createTimeInEvent(employeeRecord, dateTimeString) {
    if (!dateTimeString) {
      // Handle the case where dateTimeString is undefined
      console.error("Error: dateTimeString is undefined");
      return employeeRecord;
    }
  
    const [date, hour] = dateTimeString.split(" ");
    
    if (!employeeRecord.timeInEvents) {
      // Initialize timeInEvents array if undefined
      employeeRecord.timeInEvents = [];
    }
  
    employeeRecord.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour), date });
    return employeeRecord;
  }
  
function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour), date });
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour), date });
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find((event) => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map((event) => event.date);
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employeeRecord, date), 0);
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((employee) => employee.firstName === firstName);
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
  }
  
  // Example usage:
  // const employee = createEmployeeRecord(["John", "Doe", "Manager", 20]);
  // const employees = createEmployeeRecords([["John", "Doe", "Manager", 20], ["Jane", "Doe", "Developer", 25]]);
  // createTimeInEvent(employee, "2023-12-09 0800");
  // createTimeOutEvent(employee, "2023-12-09 1700");
  // console.log(hoursWorkedOnDate(employee, "2023-12-09")); // Output: 9
  // console.log(wagesEarnedOnDate(employee, "2023-12-09")); // Output: 180
  // console.log(allWagesFor(employee)); // Output: 180
  // console.log(findEmployeeByFirstName(employees, "John")); // Output: Object of John's employee record
  // console.log(calculatePayroll(employees)); // Output: Total payroll for all employees
  