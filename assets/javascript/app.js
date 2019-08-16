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
          var firstTrain = $("#time-text").val().trim();
          var frequency = $("#freq-text").val().trim();

          var trainSchedule = {
              name: trainName,
              destination: destination,
              time: firstTrain,
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


      database.ref().on("child_added", function(childSnapshot) {

        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().time;
        var frequency =childSnapshot.val().frequency;

        var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

        var diffTime = moment().diff(moment(firstTrainConverted), "minutes");

        var remainder = diffTime % frequency;

        var minAway = frequency - remainder;

        var nextTrain = moment().add(minAway, "minutes")

        var nextTrainTime = moment(nextTrain).format("hh:mm a");
        
        
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency + " min"),
            $("<td>").text(nextTrainTime),
            $("<td>").text(minAway + " min")
        );
       

        $("#train-table > tbody").append(newRow);


      }), function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }

      setInterval(function() {
        $("td").load();
      
      }, 2*1000);

      
      
});