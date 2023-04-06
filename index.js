const createEmployeeRecord = (array) => {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = (arrayOfArrays) => {
  return arrayOfArrays.map((x) => createEmployeeRecord(x));
};

function createTimeInEvent(timeData) {
  const [date, hour] = timeData.split(" ");
  const timeInEvent = {
    type: "TimeIn",
    date: date,
    hour: parseInt(hour),
  };
  this.timeInEvents.push(timeInEvent);
  return this;
}

function createTimeOutEvent(timeData) {
  const [date, hour] = timeData.split(" ");
  const timeOutEvent = {
    type: "TimeOut",
    date: date,
    hour: parseInt(hour),
  };
  this.timeOutEvents.push(timeOutEvent);
  return this;
}

const hoursWorkedOnDate = function (tarDate) {
  const inEvent = this.timeInEvents.find(
    (eventDate) => eventDate.date === tarDate
  );
  const outEvent = this.timeOutEvents.find(
    (eventDate) => eventDate.date === tarDate
  );
  const hoursWorked = (outEvent.hour - inEvent.hour) / 100;
  return hoursWorked;
};

const wagesEarnedOnDate = function (dateOf) {
  return hoursWorkedOnDate.call(this, dateOf) * this.payPerHour;
};

/* 
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

const findEmployeeByFirstName = function (srcArray, firstName) {
  const matchedRecord = srcArray.find(
    (record) => record.firstName === firstName
  );
  console.log(matchedRecord);
  return matchedRecord;
};

const calculatePayroll = function (arrayOfrecords) {
  return arrayOfrecords.reduce((total, rec) => {
    return total + allWagesFor.call(rec);
  }, 0);
};
