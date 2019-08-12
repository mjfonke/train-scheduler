$(document).ready(function(){

    var firebaseConfig = {
        apiKey: "AIzaSyAgl_86YNIaTi-evYI6h0mrfUVcXOfwgGc",
        authDomain: "train-scheduler-51d99.firebaseapp.com",
        databaseURL: "https://train-scheduler-51d99.firebaseio.com",
        projectId: "train-scheduler-51d99",
        storageBucket: "",
        messagingSenderId: "833532507667",
        appId: "1:833532507667:web:e60e0edefa919ce2"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      var database = firebase.database();

      $("#submit-btn").on("click", function(event){
          event.preventDefault();

          var trainName = $("#name-text").val().trim();
          var destination = $("#dst-text").val().trim();
          var trainTime = $("#time-text").val().trim();
          var frequency = $("#freq-text").val().trim();

          var trainSchedule = {
              name: trainName,
              destination: destination,
              time: trainTime,
              frequency: frequency
          };

          database.ref().push(trainSchedule);


          console.log(trainSchedule.name);
          console.log(trainSchedule.destination);
          console.log(trainSchedule.time);
          console.log(trainSchedule.frequency);

          $("#name-text").val("");
          $("#dst-text").val("");
          $("#time-text").val("");
          $("#freq-text").val("");
      });

      

});