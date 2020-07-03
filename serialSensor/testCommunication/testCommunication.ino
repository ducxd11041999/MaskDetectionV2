String incomingByte ;    

void setup() {

  Serial.begin(9600);

  pinMode(LED_BUILTIN, OUTPUT);

}
void loop() {

  if (Serial.available() > 0) {

  incomingByte = Serial.readStringUntil('\n');

    if (incomingByte == "o") {

      digitalWrite(LED_BUILTIN, HIGH);

      Serial.write("o");

    }

    else if (incomingByte == "c") {

      digitalWrite(LED_BUILTIN, LOW);

      Serial.write("c");

    }

    else{

     Serial.write("invald input");

    }

  }

}
