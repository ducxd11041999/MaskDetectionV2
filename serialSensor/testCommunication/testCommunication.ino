#include <Servo.h>

String incomingByte ;    
Servo myservo;  // create servo object to control a servo
int servoPin = 9;       // Khai báo chân điều khiển servo
int LED = 8;
void setup() {

  Serial.begin(19200);
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
  pinMode(LED, OUTPUT);

}
void loop() {
  myservo.write(75);  
  digitalWrite(LED, LOW);
  if (Serial.available() > 0) {

  incomingByte = Serial.readStringUntil('\n');
    if (incomingByte == "o") {
      digitalWrite(LED, HIGH);
      Serial.write("o");
      myservo.write(0);                  // sets the servo position according to the scaled value
      delay(10000);
    }
    else if (incomingByte == "c") {
      digitalWrite(LED, LOW);
      Serial.write("c");
      myservo.write(75);                  // sets the servo position according to the scaled value

    }
    else{
     Serial.write("invald input");
      myservo.write(0);  
    }

  }

}
