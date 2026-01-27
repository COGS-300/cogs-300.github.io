# Photocell circuit and code
Build the [photocell circuit](https://www.tinkercad.com/things/eCKfm40goGR-photocell-calibration?sharecode=EYUitNZ03Ls0SWz1S2FEDWqzDdNEVJSBlFC6jW3IA1Q). It has this code running:

```cpp
/*

  Analog input, analog output, serial output
  Reads an analog input pin, maps the result to a range from 0 to 255 and uses
  the result to set the pulse width modulation (PWM) of an output pin.

  Also prints the results to the Serial Monitor.

  The circuit:

  - potentiometer connected to analog pin 0.
    Center pin of the potentiometer goes to the analog pin.
    side pins of the potentiometer go to +5V and ground

  - LED connected from digital pin 9 to ground

  created 29 Dec. 2008
  modified 9 Apr 2024

  by Tom Igoe

  This example code is in the public domain.

  https://www.arduino.cc/en/Tutorial/AnalogInOutSerial

*/

// These constants won't change. They're used to give names to the pins used:

const int analogInPin = A0;  // Analog input pin that the photoresistor is attached to

const int analogOutPin = 9; // Analog output pin that the LED is attached to

int sensorValue = 0;        // value read from the photoresistor
int outputValue = 0;        // value output to the PWM (analog out)

void setup() {

  // initialize serial communications at 9600 bps:

  Serial.begin(9600);
}

void loop() {

  // read the analog in value:
  sensorValue = analogRead(analogInPin);

  // map it to the range of the analog out:
  outputValue = map(sensorValue, 0, 1023, 0, 255);

  // change the analog out value:
  analogWrite(analogOutPin, outputValue);

  // print the results to the Serial Monitor:

  Serial.print(sensorValue);
  Serial.print(",");
  Serial.println(outputValue);

  // wait 2 milliseconds before the next loop for the analog-to-digital
  // converter to settle after the last reading:

  delay(200);
}
```

# Run Processing Sketch
Run the following Processing sketch in your Processing IDE (not Arduino IDE).

```java
import processing.serial.*;

Serial myPort;
PrintWriter output;
String inData;

void setup() {
  size(400, 200);

  // List all available serial ports (check console)
  for (int i = 0; i < Serial.list().length; i++) {
    println("[" + i + "]: " + Serial.list()[i]);
  }

  // CHANGE index if needed: i
  // i.e., Serial.list()[0] may need to be Serial.list()[1] or [2] etc.
  myPort = new Serial(this, Serial.list()[3], 9600);
  myPort.bufferUntil('\n');

  // Create output file
  output = createWriter("sensor_data.csv");
  String line = "timestamp,sensor,output";
  println(line);
  output.println(line);

  println("Logging started...");
}

void serialEvent(Serial myPort) {
  inData = myPort.readStringUntil('\n');
  if (inData != null) {
    inData = trim(inData);

    // Add timestamp (milliseconds since start)
    String line = millis() + "," + inData;

    println(line);
    output.println(line);
    output.flush();
  }
}

void draw() {
  background(240);
  fill(0);
  text("Logging serial data to file…", 20, 40);
}

void exit() {
  output.flush();
  output.close();
  println("File saved.");
  super.exit();
}
```

# Upload the CSV to Google Sheets or Excel
You can use this CSV to figure out what the baseline reading of your photocell is.