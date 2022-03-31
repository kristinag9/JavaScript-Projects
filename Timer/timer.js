class Timer {
   constructor(durationInput, startButton, pauseButton, callbacks) {
      // console.log(this); //'this' is instance of the class
      this.durationInput = durationInput;
      this.startButton = startButton;
      this.pauseButton = pauseButton;

      if(callbacks) {
         this.onStart = callbacks.onStart;
         this.onTick = callbacks.onTick;
         this.onComplete = callbacks.onComplete;
      }

      this.startButton.addEventListener('click', this.start);
      this.pauseButton.addEventListener('click', this.pause);
   }

   start = () => {
      if(this.onStart) {
         this.onStart(this.timeRemaining);
      }
      this.tick();
      this.interval = setInterval(this.tick, 50); // tick will be run every 1 sec; wait 1 sec until tick is invoked for the first time
      // console.log(timer); // returns 1
   };

   pause = () => {
      clearInterval(this.interval);
   };

   tick = () => {
      // Option 1 (MORE POPULAR): Current time sits in the timer instance
      // must declare 'timeLeft' variable in the constructor
      // this.timeLeft = this.timeLeft - 1;
      // this.durationInput.value = this.timeLeft

      // Option 2: Current time sits in the input element
      // add event listener to listen for changes made by the user in the input field

      if(this.timeRemaining <= 0) {
         this.pause();
         if(this.onComplete) {
            this.onComplete();
         }
      } else {
         // calling the getter and the setter for the time
         this.timeRemaining = this.timeRemaining - 0.05;
         if(this.onTick) {
            this.onTick(this.timeRemaining);
         }
      }
   };

   // getter for the time using the 'get' keyword
   get timeRemaining() {
      return parseFloat(this.durationInput.value);
      // convert the value to number; supports decimals
   };

   // setter for the time using the 'set' keyword
   set timeRemaining(time) {
      this.durationInput.value = time.toFixed(2);
   };
}