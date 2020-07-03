
int chr;
void setup() {
  Serial.begin(9600); // opens serial port, sets data rate to 9600 bps
  
}

void loop() {
  // send data only when you receive data:
  if (Serial.available() > 0) {
    // read the incoming byte:
    chr = Serial.read();
  }
  Serial.write('a');
  delay(1000);
}
