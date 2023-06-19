function randomizeTip() { // will cycle the tips messages
    const tips = [
      "Stay Hydrated! Keep a good supply of water near you!",
      "Make sure to eat healthy and ",
      "Try to reduce caffeine consumption, it will help in the long term!",
      "Good posture can help reduce tension on your shoulders and spine!",
      "Water rich fruits can act as a healthy dose of sugar and water!",
      "Keeping the screen at eye level and at arms length in front of you can help maintain good posture!",
      "Make sure your chair is ergonomic, it could be hindering your performance!",
      "Feet flat on the floor, wrists and forearms straight on the table!",
      "Make sure to take a breaks regularly!",
      "Keeping your workspace organized can reduce distractions!",
      "Make sure you are cleaning you keyboard, mouse, and phone regularly, they get very dirty!",
      "Excercising can boost your energy, try to move around during breaks!",
      "Planning out your work ahead of time can take a lot of stress off your shoulders!",
      "Socializing can free your mind from the pressure!",
      "Ask someone for help if you need some!",
      "Getting sufficient sleep can increase focus, make you feel less sluggish, and improve thinking!",
      "Napping can provide a large enery boost!",
      "Having something to look forward to can motivate you to finish your task!",
      "Creating your own work plan that accounts for work tendencies can improve efficiency and quality!",
      "When you can't focus on a task anymore, take a short break and come back later, maybe work on a different task!",
      "Stopping procrastination is very hard to start, but very easy to do! Just make it easier to start!",
      "Don't try to multitask, it usually results in less efficiency and focus.",
      "Keep your phone out of sight and out of reach!",
      "Manage your email so that you aren't wasting hours going through it!",
      "Listening to music can make the task more enjoyable!",

      "It takes around 2 months to make a habit and up to 2 months to break one, keep up the commitment!",
      "The best time to plant a tree was 20 years ago. The second best time is now.",
      "Learn as if you will live forever, live like you will die tomorrow.",
      "If you only do what you can do, you will never be more than you are now.",
      "There are no accidents",
      "The greatest victory is that which requires no battle",
      "If you know the enemy and you know yourself, you need not fear the result of a hundred battles.",
      "In the midst of chaos, there is also opportunity.",
      "All warfare is based on deception.",
      "Opportunities multiply as they are seized.",
      "You can handle anything for 10 seconds.",
      "It gets easier. Every day it gets a little easier. But you gotta do it every day - that's the hard part.",
      "Being bad is the first step at improving.",
      "It is important to draw wisdom from different places. If you take it from only one place, it becomes rigid and stale."
    ] // we can add more tips later
    var text = document.getElementById("scroll-text");
    let instanceCounter = 0;
    var timer = setInterval(function() {
      if (instanceCounter==6) {
        // every 100s, text will appear and scroll for 20s
        text.innerHTML = tips[Math.floor(Math.random() * tips.length)];
        instanceCounter = 0;
      } else {
        text.innerHTML = " ";
      } // clears text
      instanceCounter++;
    }, 20000) // increments counter every 10s
  
  }

randomizeTip();