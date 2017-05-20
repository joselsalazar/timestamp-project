// Initialize Firebase and change the values of the config values with your own Firebase config values.
var config = {
    apiKey: "AIzaSyBeCYfUyOHFwQZSWVHL6SqWWeJNNEjOQYQ",
    authDomain: "employee-reg.firebaseapp.com",
    databaseURL: "https://employee-reg.firebaseio.com",
    projectId: "employee-reg",
    storageBucket: "employee-reg.appspot.com",
    messagingSenderId: "466405680851"
  };

  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Variables (SET the first set IN FIREBASE FIRST)
// Note remember to create these same variables in Firebase!
var employee = "";
var role = "";
var startDate = "";
var monthlyRate = "";

// Click Button changes what is stored in firebase
$("#submit-employee").on("click", function() {
  // Prevent the page from refreshing
  event.preventDefault();

  // Get inputs
  employee = $("#employee").val().trim();
  role = $("#role").val().trim();
  startDate = $("#start-date").val().trim();
  monthsWorked = $("#months-worked").val().trim();
  monthlyRate = $("#monthly-rate").val().trim();

  // Change what is saved in firebase
  database.ref().push({
    employee: employee,
    role: role,
    startDate: startDate,
    monthsWorked: monthsWorked,
    monthlyRate: monthlyRate
  });
});

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref().on("child_added", function(snapshot) {

  // Print the initial data to the console.
  console.log(snapshot.val());

  var newRow = $('<tr>');
  $('.employee-form').append(newRow);
  newRow.append("<td>" + snapshot.val().employee + "</td>");
  newRow.append("<td>" + snapshot.val().role + "</td>");
  newRow.append("<td>" + snapshot.val().startDate + "</td>");
  newRow.append("<td>" + snapshot.val().monthsWorked + "</td>");
  newRow.append("<td>" + snapshot.val().monthlyRate + "</td>");
  newRow.append("<td>" + parseInt(snapshot.val().monthlyRate) * parseInt(snapshot.val().monthsWorked) + "</td>");

  // Log the value of the various properties
  console.log(snapshot.val().employee);
  console.log(snapshot.val().role);
  console.log(snapshot.val().startDate);
  console.log(snapshot.val().monthsWorked);
  console.log(snapshot.val().monthlyRate);

  // If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});
  