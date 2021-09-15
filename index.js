// const arr = ["Jenny", "Kim", "Software Engineer", 45];

// let allEmployees = [
//   ["Jenny", "Kim", "Software Engineer", 45],
//   ["John", "Smith", "Oral Surgeon", 200],
//   ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
//   ["Natalia", "Romanov", "CEO", 150],
// ];

function createEmployeeRecord(arr) {
  const employeeObj = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employeeObj;
}

// const jenny = createEmployeeRecord(arr);

function createEmployeeRecords(arrs) {
  const newArr = arrs.map((arr) => createEmployeeRecord(arr));
  return newArr;
}

// createEmployeeRecords(allEmployees);

function createTimeInEvent(employeeObj, dateStamp) {
  const date = dateStamp.split(" ")[0];
  const hour = Number(dateStamp.split(" ")[1]);
  employeeObj.timeInEvents.push({
    type: "TimeIn",
    hour,
    date,
  });
  return employeeObj;
}

function createTimeOutEvent(employeeObj, dateStamp) {
  const date = dateStamp.split(" ")[0];
  const hour = Number(dateStamp.split(" ")[1]);
  employeeObj.timeOutEvents.push({
    type: "TimeOut",
    hour,
    date,
  });
  return employeeObj;
}

// createTimeInEvent(jenny, "2021-09-12 0845");
// createTimeInEvent(jenny, "2021-09-13 0850");
// createTimeInEvent(jenny, "2021-09-14 0855");
// createTimeInEvent(jenny, "2021-09-15 0900");
// createTimeOutEvent(jenny, "2021-09-12 1715");
// createTimeOutEvent(jenny, "2021-09-13 1710");
// createTimeOutEvent(jenny, "2021-09-14 1705");
// createTimeOutEvent(jenny, "2021-09-15 1700");

function hoursWorkedOnDate(employeeObj, date) {
  const timeIn = employeeObj.timeInEvents.find(
    (allDates) => allDates.date === date
  );
  const timeOut = employeeObj.timeOutEvents.find(
    (allDates) => allDates.date === date
  );
  return (timeOut.hour - timeIn.hour) / 100;
}

// console.log(jenny);
// console.log(hoursWorkedOnDate(jenny, "2021-09-12"));
// console.log(hoursWorkedOnDate(jenny, "2021-09-13"));
// console.log(hoursWorkedOnDate(jenny, "2021-09-14"));
// console.log(hoursWorkedOnDate(jenny, "2021-09-15"));

// console.log(jenny);

function wagesEarnedOnDate(employeeObj, date) {
  const pay = employeeObj.payPerHour;
  return hoursWorkedOnDate(employeeObj, date) * pay;
}

// console.log(wagesEarnedOnDate(jenny, "2021-09-15"));

function allWagesFor(employeeObj) {
  let payArr = [];
  for (const workDay of employeeObj.timeInEvents) {
    payArr.push(wagesEarnedOnDate(employeeObj, workDay.date));
  }
  const allPay = payArr.reduce((total, pay) => total + pay);
  return allPay;
}

// console.log(allWagesFor(jenny));

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
}

// const allEmployeeRecords = createEmployeeRecords(allEmployees);
// console.log(allEmployeeRecords);
// console.log(findEmployeeByFirstName(allEmployeeRecords, "Andrew"));

function calculatePayroll(arr) {
  return arr.reduce(function (total, employee) {
    return total + allWagesFor(employee);
  }, 0);
}

// calculatePayroll(allEmployeeRecords);
