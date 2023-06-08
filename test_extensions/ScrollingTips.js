function randomizeTip() { // will cycle the tips messages
    const quotes = [
      "It takes around 2 months to make a habit and up to 2 months to break one, keep up the commitment!",
      "\'The best time to plant a tree was 20 years ago. The second best time is now\' - Chinese Proverb"
    ] // we can add more quotes later
    var text = document.getElementById("scroll-text");
    let instanceCounter = 0;
    var timer = setInterval(function() {
      if (instanceCounter==6) {
        // every 100s, text will appear and scroll for 20s
        text.innerHTML = quotes[Math.floor(Math.random() * quotes.length)];
        instanceCounter = 0;
      } else {
        text.innerHTML = "⠀";
      } // clears text
      instanceCounter++;
    }, 20000) // increments counter every 10s
  
  }

randomizeTip();