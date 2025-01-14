// Array of Random Jokes
const randomJokes = [
  "Why don’t scientists trust atoms? Because they make up everything!",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "What’s orange and sounds like a parrot? A carrot.",
  "Why don’t skeletons fight each other? They don’t have the guts.",
  "What do you call fake spaghetti? An impasta.",
  "Why did the bicycle fall over? It was two tired!",
  "How does a penguin build its house? Igloos it together.",
  "What do you call a fish wearing a bowtie? Sofishticated.",
  "Why did the math book look sad? Because it had too many problems.",
  "Why can’t your nose be 12 inches long? Because then it would be a foot.",
  "Why did the tomato turn red? Because it saw the salad dressing!",
  "What do you call a bear with no teeth? A gummy bear.",
  "Why do we never tell secrets on a farm? Because the potatoes have eyes, and the corn has ears!",
  "How do you organize a space party? You planet.",
];

// Array of random motivation
const randomQuotes = [
  "Quitting is never easy, but giving up on yourself is harder.",
  "The moment you want to quit is the moment you need to keep going.",
  "Don’t quit. You’re closer than you think.",
  "Every step you take is one step closer to freedom.",
  "The hardest part is starting, but once you begin, the journey becomes worth it.",
  "Quitting is hard, but staying stuck is even harder.",
  "Your past doesn’t define you. Your future is in your hands.",
  "Great things never come from comfort zones. Keep going, you're doing amazing.",
  "If you want something you’ve never had, you must be willing to do something you’ve never done.",
  "Success is the sum of small efforts, repeated day in and day out. Keep pushing forward.",
  "Believe in the process. Every small victory is a step towards a bigger success.",
  "The struggle you’re in today is developing the strength you need for tomorrow.",
  "It’s not about being perfect. It’s about making progress.",
  "You’re not quitting, you’re freeing yourself from something that no longer serves you.",
  "Progress is progress, no matter how small. Keep moving forward.",
];

$(document).ready(function () {
  $("#main-content").show();
  $("#about, #contact").addClass("hidden");

  // Utility functions to save and load data
  function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function loadData(key) {
    const data = JSON.parse(localStorage.getItem(key)) || {};
    return data;
  }

  // Initial app data
  const appData = loadData("quitBuddy") || { quitDate: null, milestones: [] };

  // Ensure appData.milestones is an array
  if (!Array.isArray(appData.milestones)) {
    appData.milestones = [];
    saveData("quitBuddy", appData); // Save corrected structure to localStorage
  }

  // Navigation event bindings
  $("#home-link").on("click", showHome);
  $("#journey-link").on("click", showJourney);
  $("#milestones-link").on("click", showMilestones);
  $("#motivation-link").on("click", function () {
    showRandomQuote(); 
  });

  $("#start-your-journey")
    .off("click")
    .on("click", function () {
      showJourney();
    });

  // Home Page
  function showHome() {
    $("#main-content").html(`
            <h2>Hi, how are you feeling today?</h2>
            <div class="btn">
                <button id="great">Great</button>
                <button id="low">Low</button>
                <button id="extremely-low">Extremely Low</button>
                <button class="btnn" id="start-your-journey">Start Your Journey</button>
            </div>
        `);

    // Bind events for dynamically generated buttons
    $("#great")
      .off("click")
      .on("click", function () {
        great("Awesome! Keep going, you can do it!");
      });

    $("#low")
      .off("click")
      .on("click", function () {
        showRandomJoke();
      });

    $("#extremely-low")
      .off("click")
      .on("click", function () {
        extremelyLow("extremely-low");
      });

    $("#start-your-journey")
      .off("click")
      .on("click", function () {
        showJourney();
      });
  }

  // Function to Get a Random Quote
  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * randomQuotes.length);
    return randomQuotes[randomIndex];
  }

  // Function to Show Random Quote with "Next Quote" Option
  function showRandomQuote() {
    const quote = getRandomQuote();
    $("#main-content").html(
      `<h2>Motivation Quote of the Day!</h2>
        <p>${quote}</p>
        <button id="next-quote">Next Quote</button>
        <button id="back-to-home">Back to Home</button>`
    );

    // Attach "Next Quote" functionality
    $("#next-quote")
      .off("click")
      .on("click", function () {
        showRandomQuote(); // Fetch and show a new quote
      });

    // Attach "Back to Home" functionality
    $("#back-to-home")
      .off("click")
      .on("click", function () {
        showHome(); // Navigate back to the home page
      });
  }

  // Function to Get a Random Joke
  function getRandomJoke() {
    const randomIndex = Math.floor(Math.random() * randomJokes.length);
    return randomJokes[randomIndex];
  }

  // Function to Show Random Joke with "Next Joke" Option
  function showRandomJoke() {
    const joke = getRandomJoke();
    $("#main-content").html(`
        <h2>Joke Of The Day!</h2>
        <p>${joke}</p>
        <button id="next-joke">Read Another Joke</button>
        <button id="back-to-home">Back to Home</button>
    `);

    // Attach "Next Joke" functionality
    $("#next-joke")
      .off("click")
      .on("click", function () {
        showRandomJoke(); // Fetch and show a new joke
      });

    // Attach "Back to Home" functionality
    $("#back-to-home")
      .off("click")
      .on("click", function () {
        showHome();
      });
  }

// function for playing the song for extremely low button
  function extremelyLow(message) {
    if (message === "extremely-low") {
      $("#main-content").html(`
                <h3>It’s a tough moment, but we’re here for you!</h3>
                <p>Take a moment to listen to this relaxing tune:</p>
                <audio controls autoplay>
                    <source src="./music/autumn-leaves-175298.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
                <p>Take a few deep breaths, and let the music calm your mind.</p>
                <button id="back-to-home">Back to Home</button>
            `);

      // back to home page
      $("#back-to-home")
        .off("click")
        .on("click", function () {
          showHome();
        });
    } else {
      $("#main-content").html(`
                <h2>${message || "Motivation"}</h2>
                <p>Stay motivated! You’ve got this!</p>
            `);
    }
  }

  // functionality fot great button 
  function great(message) {
    $("#main-content").html(`
            <h2>${message}</h2>
            <button id="go-to-milestones">Check Your Milestones Here</button>
        `);
    $("#go-to-milestones").off("click").on("click", showMilestones);
  }

  // Journey Page
  function showJourney() {
    const quitDate = appData.quitDate ? new Date(appData.quitDate) : null;
    const daysQuit = quitDate
      ? Math.floor((new Date() - quitDate) / (1000 * 60 * 60 * 24))
      : 0;

    $("#main-content").html(`
            <h2>My Journey</h2>
            <p>Days since you quit: ${daysQuit}</p>
            <p>Money saved: $${(daysQuit * 5).toFixed(2)}</p>
            <button id="set-quit-date">Set Quit Date</button>
            <button id="check-milestones">Check Your Milestones Here</button>
        `);
    // setting the quit date
    $("#set-quit-date")
      .off("click")
      .on("click", function () {
        $("#main-content").html(`
                <h2>Set Quit Date</h2>
                <div class="input-group">
                    <label for="quit-date">Quit Date:</label>
                    <input type="date" id="quit-date">
                </div>
                <button id="save-quit-date">Save</button>
            `);

        // save the entered quit date
        $("#save-quit-date")
          .off("click")
          .on("click", function () {
            const quitDate = $("#quit-date").val();
            if (quitDate) {
              appData.quitDate = quitDate;
              saveData("quitBuddy", appData);
              showJourney();
            }
          });
      });
    
    // show milestone
    $("#check-milestones")
      .off("click")
      .on("click", function () {
        showMilestones();
      });
  }

  // Milestone Page
  function showMilestones() {
    // Ensure milestones is a valid array
    if (!Array.isArray(appData.milestones)) {
      appData.milestones = [];
      saveData("quitBuddy", appData); // Save fixed data
    }

    const moneySaved = calculateMoneySaved(); // Get money saved from My Journey

    // Render milestones
    const milestonesHtml =
      appData.milestones
        .map(
          (m, index) => `
            <div class="milestone ${m.achieved ? "achieved" : ""}">
                <p class="milestone-para">${m.description} - $${m.price}</p>
                ${m.achieved ? '<span class="badge">Achieved! &#127881;</span>' : ""}
                <button class="delete-milestone" data-index="${index}">Delete</button>
            </div>
        `
        )
        .join("") || "<p>No milestones yet. Add one below!</p>";

    $("#main-content").html(`
            <h2>Milestones</h2>
            <div id="milestone-list">${milestonesHtml}</div>
            <div class="input-group">
                <label for="milestone-input">New Milestone:</label>
                <input type="text" id="milestone-input" placeholder="E.g., Buy a book">
            </div>
            <div class="input-group">
                <label for="milestone-price">Milestone Price (in $):</label>
                <input type="number" id="milestone-price" placeholder="E.g., 30">
            </div>
            <button id="add-milestone">Add Milestone</button>
        `);

    // Add event listeners
    $("#add-milestone")
      .off("click")
      .on("click", function () {
        const description = $("#milestone-input").val().trim();
        const price = parseFloat($("#milestone-price").val().trim());
        if (description && !isNaN(price) && price > 0) {
          appData.milestones.push({ description, price, achieved: false });
          saveData("quitBuddy", appData);
          showMilestones();
        } else {
          alert("Please enter a valid milestone and price.");
        }
      });

    // Attach delete milestone functionality
    $(".delete-milestone")
      .off("click")
      .on("click", function () {
        const index = $(this).data("index");
        appData.milestones.splice(index, 1);
        saveData("quitBuddy", appData);
        showMilestones();
      });

    // Check if milestones are achieved
    checkAchievedMilestones(moneySaved);
  }

  // Helper function to calculate money saved
  function calculateMoneySaved() {
    const quitDate = appData.quitDate ? new Date(appData.quitDate) : null;
    const daysQuit = quitDate
      ? Math.floor((new Date() - quitDate) / (1000 * 60 * 60 * 24))
      : 0;
    const moneySaved = daysQuit * 5;
    return moneySaved;
  }

// Functionality for milestone achieved badge and an alert
function checkAchievedMilestones(moneySaved) {
    let milestonesUpdated = false; // Track if any milestone was achieved
  
    appData.milestones.forEach((milestone, index) => {
      if (!milestone.achieved && moneySaved >= milestone.price) {
        milestone.achieved = true;
        milestonesUpdated = true; 
        alert(
          `🎉 Yay! You have achieved this milestone: "${milestone.description}". Go buy it now!`
        );
      }
    });
  
    if (milestonesUpdated) {
      saveData("quitBuddy", appData); // Save the updated data
      showMilestones(); // Re-render the milestones list to show badges
    }
  }
  

  // Navigation event bindings
  $("nav a").on("click", function (e) {
    e.preventDefault();

    // Get the ID of the clicked link and determine the target section
    const targetId = $(this).attr("id").replace("-link", "");

    if (targetId === "about" || targetId === "contact") {
      $("main > section").addClass("hidden"); // Hide all sections
      $("#" + targetId).removeClass("hidden"); // Show the target section
      $("#main-content").html(""); // Clear dynamically generated content
    } else {
      // Handle other links (e.g., home, journey, milestones, motivation)
      $("main > section").addClass("hidden"); // Hide all sections
      $("#main-content").html(""); // Clear dynamically generated content

      switch (targetId) {
        case "home":
          showHome();
          break;
        case "journey":
          showJourney();
          break;
        case "milestones":
          showMilestones();
          break;
        case "motivation":
          showRandomQuote();
          break;
        default:
          console.warn(`Unknown target: ${targetId}`);
      }
    }
  });
  // Initialize the app with Home page
  showHome();
});
