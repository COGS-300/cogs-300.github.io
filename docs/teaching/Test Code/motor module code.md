# Motor Module

This is the code for the motor module for your convenience.

If you want to test this on your own project, make sure to replicate the wiring connections and parts within the motor module itself, then simply upload the respective code for however many motors you want to test.

Both codes include:

- Button press to start/stop motors at any time
- Automatic sequence testing clockwise, counterclockwise, full speed, and half speed

## Single Motor Test Code
```cpp
// MOTOR B PINS
int in3 = 7;  // Motor direction pin 1 (controls which way motor spins)
int in4 = 6;  // Motor direction pin 2 (works with pin 1 to set direction)
int enb = 5;  // Motor speed control (PWM) pin (controls how fast motor spins)

// BUTTON PIN
int buttonPin = 8;  // Button input pin (where we read if button is pressed)

// Variables for button logic
int buttonState;            // Current button reading (HIGH = not pressed, LOW = pressed)
int lastButtonState = HIGH; // Previous button state for edge detection (remembers last button state)
bool motorOn = false;       // Motor running state flag (true = motor should run, false = motor should stop)

void setup() {
  pinMode(enb, OUTPUT);   // Set speed control pin as output (Arduino sends signals out)
  pinMode(in3, OUTPUT);   // Set direction pin 1 as output (Arduino controls this pin)
  pinMode(in4, OUTPUT);   // Set direction pin 2 as output (Arduino controls this pin)
  
  pinMode(buttonPin, INPUT_PULLUP);  // Set button pin with internal pull-up resistor (makes pin HIGH when button not pressed)
}

void loop() {
  // Read the button
  buttonState = digitalRead(buttonPin);  // Get current button state (check if button is pressed right now)
  
  // Detect button press (edge detection - only triggers once when button goes from not-pressed to pressed)
  if (buttonState == LOW && lastButtonState == HIGH) {  // Check for button press edge (button just got pressed)
    delay(50);          // Debounce delay (wait to prevent electrical noise from causing false button presses)
    motorOn = !motorOn; // Toggle motor state (flip between on/off - if on, turn off; if off, turn on)
  }
  lastButtonState = buttonState;  // Store current state for next comparison (remember this reading for next loop)
  
  // Control motor depending on state
  if (motorOn) {  // If motor should be running
    while (motorOn) {  // Continue motor sequence while motorOn is true (keep doing motor pattern until button pressed again)
      // CLOCKWISE MAX SPEED (motor spins one direction at full power)
      digitalWrite(in3, HIGH);  // Set direction pin 1 high (send 5V to this pin)
      digitalWrite(in4, LOW);   // Set direction pin 2 low (send 0V to this pin) - this combination makes clockwise
      analogWrite(enb, 255);    // Set motor to maximum speed (255 = 100% power, 0 = no power)
      if (!checkButtonDuringDelay(2000)) break;  // Wait 2 seconds while checking for button press, exit if button pressed
      
      // STOP (turn off motor)
      digitalWrite(in3, LOW);   // Turn off direction pin 1 (send 0V)
      digitalWrite(in4, LOW);   // Turn off direction pin 2 (send 0V) - both pins low = motor stops
      if (!checkButtonDuringDelay(2000)) break;  // Wait 2 seconds while checking for button press, exit if button pressed
      
      // COUNTERCLOCKWISE MAX SPEED (motor spins opposite direction at full power)
      digitalWrite(in3, LOW);   // Set direction pin 1 low (send 0V)
      digitalWrite(in4, HIGH);  // Set direction pin 2 high (send 5V) - opposite of clockwise = counterclockwise
      analogWrite(enb, 255);    // Set motor to maximum speed (full power)
      if (!checkButtonDuringDelay(2000)) break;  // Wait 2 seconds while checking for button press, exit if button pressed
      
      // STOP (turn off motor)
      digitalWrite(in3, LOW);   // Turn off direction pin 1
      digitalWrite(in4, LOW);   // Turn off direction pin 2 (motor stops)
      if (!checkButtonDuringDelay(2000)) break;  // Wait 2 seconds while checking for button press, exit if button pressed
      
      // CLOCKWISE HALF SPEED (motor spins clockwise at reduced power)
      digitalWrite(in3, HIGH);  // Set direction pin 1 high (clockwise direction)
      digitalWrite(in4, LOW);   // Set direction pin 2 low
      analogWrite(enb, 127);    // Set motor to half speed (127 = 50% power, half of 255)
      if (!checkButtonDuringDelay(2000)) break;  // Wait 2 seconds while checking for button press, exit if button pressed
      
      // STOP (turn off motor)
      digitalWrite(in3, LOW);   // Turn off direction pin 1
      digitalWrite(in4, LOW);   // Turn off direction pin 2 (motor stops)
      if (!checkButtonDuringDelay(2000)) break;  // Wait 2 seconds while checking for button press, exit if button pressed
      
      // COUNTERCLOCKWISE HALF SPEED (motor spins counterclockwise at reduced power)
      digitalWrite(in3, LOW);   // Set direction pin 1 low (counterclockwise direction)
      digitalWrite(in4, HIGH);  // Set direction pin 2 high
      analogWrite(enb, 127);    // Set motor to half speed (50% power)
      if (!checkButtonDuringDelay(2000)) break;  // Wait 2 seconds while checking for button press, exit if button pressed
      
      // STOP (end of one full sequence - motor stops after completing all movements)
      digitalWrite(in3, LOW);   // Turn off direction pin 1
      digitalWrite(in4, LOW);   // Turn off direction pin 2 (motor stops)
      
      delay(50);  // Small pause before repeating sequence (brief rest before starting pattern over)
    }
    
    // Ensure motor is completely stopped when exiting (safety measure)
    digitalWrite(in3, LOW);   // Turn off direction pin 1
    digitalWrite(in4, LOW);   // Turn off direction pin 2
  } else {  // If motor should be off
    // STOP (make sure motor stays off)
    digitalWrite(in3, LOW);   // Turn off direction pin 1
    digitalWrite(in4, LOW);   // Turn off direction pin 2 (ensure motor is stopped)
  }
}

// Function to check for button press during delay periods (custom function we created)
bool checkButtonDuringDelay(int delayTime) {  // Takes delay time in milliseconds (1000ms = 1 second)
  for (int i = 0; i < delayTime; i += 10) {  // Loop in 10ms increments (check button every 10 milliseconds)
    buttonState = digitalRead(buttonPin);     // Read button state (check if button is pressed)
    if (buttonState == LOW && lastButtonState == HIGH) {  // Check for button press (edge detection - button just got pressed)
      delay(50);          // Debounce delay (prevent electrical noise from causing false readings)
      motorOn = !motorOn; // Toggle motor state (switch between on/off)
      lastButtonState = buttonState;  // Update button state (remember this reading)
      return false;       // Return false to indicate button was pressed (tells main program to stop current action)
    }
    lastButtonState = buttonState;  // Update previous button state (remember current reading for next check)
    delay(10);  // Wait 10ms before next check (small delay between button checks)
  }
  return true;  // Return true if no button press detected during delay (tells main program to continue)
}
```
## Dual Motor Test Code
```cpp
// MOTOR A PINS (first motor)
int in1 = 2;  // Motor A direction pin 1 (controls which way motor A spins)
int in2 = 3;  // Motor A direction pin 2 (works with pin 1 to set direction)
int ena = 4;  // Motor A speed control (PWM) pin (controls how fast motor A spins)

// MOTOR B PINS (second motor)
int in3 = 7;  // Motor B direction pin 1 (controls which way motor B spins)
int in4 = 6;  // Motor B direction pin 2 (works with pin 1 to set direction)
int enb = 5;  // Motor B speed control (PWM) pin (controls how fast motor B spins)

// BUTTON PIN
int buttonPin = 8;  // Button input pin (where we read if button is pressed)

// Variables for button logic
int buttonState;            // Current button reading (HIGH = not pressed, LOW = pressed)
int lastButtonState = HIGH; // Previous button state for edge detection (remembers last button state)
bool motorOn = false;       // Motor running state flag (true = motors should run, false = motors should stop)

void setup() {
  // Setup Motor A pins
  pinMode(ena, OUTPUT);   // Set Motor A speed control pin as output (Arduino sends signals out)
  pinMode(in1, OUTPUT);   // Set Motor A direction pin 1 as output (Arduino controls this pin)
  pinMode(in2, OUTPUT);   // Set Motor A direction pin 2 as output (Arduino controls this pin)
  
  // Setup Motor B pins
  pinMode(enb, OUTPUT);   // Set Motor B speed control pin as output (Arduino sends signals out)
  pinMode(in3, OUTPUT);   // Set Motor B direction pin 1 as output (Arduino controls this pin)
  pinMode(in4, OUTPUT);   // Set Motor B direction pin 2 as output (Arduino controls this pin)
  
  pinMode(buttonPin, INPUT_PULLUP);  // Set button pin with internal pull-up resistor (makes pin HIGH when button not pressed)
}

void loop() {
  // Read the button
  buttonState = digitalRead(buttonPin);  // Get current button state (check if button is pressed right now)
  
  // Detect button press (edge detection - only triggers once when button goes from not-pressed to pressed)
  if (buttonState == LOW && lastButtonState == HIGH) {  // Check for button press edge (button just got pressed)
    delay(50);          // Debounce delay (wait to prevent electrical noise from causing false button presses)
    motorOn = !motorOn; // Toggle motor state (flip between on/off - if on, turn off; if off, turn on)
  }
  lastButtonState = buttonState;  // Store current state for next comparison (remember this reading for next loop)
  
  // Control motors depending on state
  if (motorOn) {  // If motors should be running
    while (motorOn) {  // Continue motor sequence while motorOn is true (keep doing motor pattern until button pressed again)
      // BOTH MOTORS CLOCKWISE MAX SPEED (both motors spin forward at full power)
      digitalWrite(in1, HIGH);  // Set Motor A direction pin 1 high (send 5V to this pin)
      digitalWrite(in2, LOW);   // Set Motor A direction pin 2 low (send 0V to this pin) - this combination makes clockwise
      analogWrite(ena, 255);    // Set Motor A to maximum speed (255 = 100% power, 0 = no power)
      digitalWrite(in3, HIGH);  // Set Motor B direction pin 1 high (send 5V to this pin)
      digitalWrite(in4, LOW);   // Set Motor B direction pin 2 low (send 0V to this pin) - this combination makes clockwise
      analogWrite(enb, 255);    // Set Motor B to maximum speed (255 = 100% power, 0 = no power)
      if (!checkButtonDuringDelay(2000)) break;  // Wait 2 seconds while checking for button press, exit if button pressed
      
      // STOP BOTH MOTORS (turn off both motors)
      digitalWrite(in1, LOW);   // Turn off Motor A direction pin 1 (send 0V)
      digitalWrite(in2, LOW);   // Turn off Motor A direction pin 2 (send 0V) - both pins low = motor stops
      digitalWrite(in3, LOW);   // Turn off Motor B direction pin 1 (send 0V)
      digitalWrite(in4, LOW);   // Turn off Motor B direction pin 2 (send 0V) - both pins low = motor stops
      if (!checkButtonDuringDelay(2000)) break;  // Wait 2 seconds while checking for button press, exit if button pressed
      
      // BOTH MOTORS COUNTERCLOCKWISE MAX SPEED (both motors spin backward at full power)
      digitalWrite(in1, LOW);   // Set Motor A direction pin 1 low (send 0V)
      digitalWrite(in2, HIGH);  // Set Motor A direction pin 2 high (send 5V) - opposite of clockwise = counterclockwise
      analogWrite(ena, 255);    // Set Motor A to maximum speed (full power)
      digitalWrite(in3, LOW);   // Set Motor B direction pin 1 low (send 0V)
      digitalWrite(in4, HIGH);  // Set Motor B direction pin 2 high (send 5V) - opposite of clockwise = counterclockwise
      analogWrite(enb, 255);    // Set Motor B to maximum speed (full power)
      if (!checkButtonDuringDelay(2000)) break;  // Wait 2 seconds while checking for button press, exit if button pressed
      
      // STOP BOTH MOTORS (turn off both motors)
      digitalWrite(in1, LOW);   // Turn off Motor A direction pin 1
      digitalWrite(in2, LOW);   // Turn off Motor A direction pin 2 (motor stops)
      digitalWrite(in3, LOW);   // Turn off Motor B direction pin 1
      digitalWrite(in4, LOW);   // Turn off Motor B direction pin 2 (motor stops)
      if (!checkButtonDuringDelay(2000)) break;  // Wait 2 seconds while checking for button press, exit if button pressed
      
      // BOTH MOTORS CLOCKWISE HALF SPEED (both motors spin forward at reduced power)
      digitalWrite(in1, HIGH);  // Set Motor A direction pin 1 high (clockwise direction)
      digitalWrite(in2, LOW);   // Set Motor A direction pin 2 low
      analogWrite(ena, 127);    // Set Motor A to half speed (127 = 50% power, half of 255)
      digitalWrite(in3, HIGH);  // Set Motor B direction pin 1 high (clockwise direction)
      digitalWrite(in4, LOW);   // Set Motor B direction pin 2 low
      analogWrite(enb, 127);    // Set Motor B to half speed (127 = 50% power, half of 255)
      if (!checkButtonDuringDelay(2000)) break;  // Wait 2 seconds while checking for button press, exit if button pressed
      
      // STOP BOTH MOTORS (turn off both motors)
      digitalWrite(in1, LOW);   // Turn off Motor A direction pin 1
      digitalWrite(in2, LOW);   // Turn off Motor A direction pin 2 (motor stops)
      digitalWrite(in3, LOW);   // Turn off Motor B direction pin 1
      digitalWrite(in4, LOW);   // Turn off Motor B direction pin 2 (motor stops)
      if (!checkButtonDuringDelay(2000)) break;  // Wait 2 seconds while checking for button press, exit if button pressed
      
      // BOTH MOTORS COUNTERCLOCKWISE HALF SPEED (both motors spin backward at reduced power)
      digitalWrite(in1, LOW);   // Set Motor A direction pin 1 low (counterclockwise direction)
      digitalWrite(in2, HIGH);  // Set Motor A direction pin 2 high
      analogWrite(ena, 127);    // Set Motor A to half speed (50% power)
      digitalWrite(in3, LOW);   // Set Motor B direction pin 1 low (counterclockwise direction)
      digitalWrite(in4, HIGH);  // Set Motor B direction pin 2 high
      analogWrite(enb, 127);    // Set Motor B to half speed (50% power)
      if (!checkButtonDuringDelay(2000)) break;  // Wait 2 seconds while checking for button press, exit if button pressed
      
      // STOP BOTH MOTORS (end of one full sequence - both motors stop after completing all movements)
      digitalWrite(in1, LOW);   // Turn off Motor A direction pin 1
      digitalWrite(in2, LOW);   // Turn off Motor A direction pin 2 (motor stops)
      digitalWrite(in3, LOW);   // Turn off Motor B direction pin 1
      digitalWrite(in4, LOW);   // Turn off Motor B direction pin 2 (motor stops)
      
      delay(50);  // Small pause before repeating sequence (brief rest before starting pattern over)
    }
    
    // Ensure both motors are completely stopped when exiting (safety measure)
    digitalWrite(in1, LOW);   // Turn off Motor A direction pin 1
    digitalWrite(in2, LOW);   // Turn off Motor A direction pin 2
    digitalWrite(in3, LOW);   // Turn off Motor B direction pin 1
    digitalWrite(in4, LOW);   // Turn off Motor B direction pin 2
  } else {  // If motors should be off
    // STOP BOTH MOTORS (make sure both motors stay off)
    digitalWrite(in1, LOW);   // Turn off Motor A direction pin 1
    digitalWrite(in2, LOW);   // Turn off Motor A direction pin 2 (ensure motor is stopped)
    digitalWrite(in3, LOW);   // Turn off Motor B direction pin 1
    digitalWrite(in4, LOW);   // Turn off Motor B direction pin 2 (ensure motor is stopped)
  }
}

// Function to check for button press during delay periods (custom function we created)
bool checkButtonDuringDelay(int delayTime) {  // Takes delay time in milliseconds (1000ms = 1 second)
  for (int i = 0; i < delayTime; i += 10) {  // Loop in 10ms increments (check button every 10 milliseconds)
    buttonState = digitalRead(buttonPin);     // Read button state (check if button is pressed)
    if (buttonState == LOW && lastButtonState == HIGH) {  // Check for button press (edge detection - button just got pressed)
      delay(50);          // Debounce delay (prevent electrical noise from causing false readings)
      motorOn = !motorOn; // Toggle motor state (switch between on/off)
      lastButtonState = buttonState;  // Update button state (remember this reading)
      return false;       // Return false to indicate button was pressed (tells main program to stop current action)
    }
    lastButtonState = buttonState;  // Update previous button state (remember current reading for next check)
    delay(10);  // Wait 10ms before next check (small delay between button checks)
  }
  return true;  // Return true if no button press detected during delay (tells main program to continue)
}
```