#include "WiFi.h"

const char* ssid = "DHK";
const char* password =  "dunghoakhuong123";
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
}

void loop() {
  // put your main code here, to run repeatedly:

}
