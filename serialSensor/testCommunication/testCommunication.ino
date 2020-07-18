#include <Servo.h>

char incomingByte ;    
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
//    digitalWrite(LED, HIGH);
    incomingByte = Serial.read();
    if (incomingByte == 'o') {
      digitalWrite(LED, HIGH);
      //Serial.write("o");
      myservo.write(0);                  // sets the servo position according to the scaled value
      delay(5000);
    }
    else{
     Serial.write((char)incomingByte);
      myservo.write(0);  
    }
  }
}
