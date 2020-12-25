
#include <ESP8266WiFi.h>
#include <SocketIOClient.h>

//include thư viện để kiểm tra free RAM trên con esp8266
extern "C" {
  #include "user_interface.h"
}

SocketIOClient client;
const char* ssid = "DHK";          //Tên mạng Wifi mà Socket server của bạn đang kết nối
const char* password = "dunghoakhuong123";  //Pass mạng wifi ahihi, anh em rãnh thì share pass cho mình với.
 
char host[] = "192.168.137.1";    //Địa chỉ IP dịch vụ, hãy thay đổi nó theo địa chỉ IP Socket server của bạn.
int port = 8080;                  //Cổng dịch vụ socket server do chúng ta tạo!
 
//từ khóa extern: dùng để #include các biến toàn cục ở một số thư viện khác. Trong thư viện SocketIOClient có hai biến toàn cục
// mà chúng ta cần quan tâm đó là
// RID: Tên hàm (tên sự kiện
// Rfull: Danh sách biến (được đóng gói lại là chuối JSON)
extern String RID;
extern String Rfull;
 
 
void setup()
{
    //Bật baudrate ở mức 57600 để giao tiếp với máy tính qua Serial
    Serial.begin(9600);
    //Việc đầu tiên cần làm là kết nối vào mạng Wifi
    Serial.print("Ket noi vao mang ");
    Serial.println(ssid);
 
    //Kết nối vào mạng Wifi
    WiFi.begin(ssid, password);
 
    //Chờ đến khi đã được kết nối
    while (WiFi.status() != WL_CONNECTED) { //Thoát ra khỏi vòng 
        delay(500);
        Serial.print('.');
    }
 
    Serial.println();
    Serial.println(F("Da ket noi WiFi"));
    Serial.println(F("Di chi IP cua ESP8266 (Socket Client ESP8266): "));
    Serial.println(WiFi.localIP());
    delay(100);
    if(!client.connect("192.168.137.1", 8080)){
      Serial.println("Khong the ket noi");
      delay(100);
      return;
    }
}
 
void loop()
{
    //Khi bắt được bất kỳ sự kiện nào thì chúng ta có hai tham số:
    //  +RID: Tên sự kiện
    //  +RFull: Danh sách tham số được nén thành chuỗi JSON!
    //Serial.println(F("connect socket io"));
    //client.send("message", "name", "ducbui");
    if(client.monitor())
    {
      Serial.print("Recv data");
    }
    //Serial.println(client.connected());
    delay(2000);
    //Kết nối lại!
    if(!client.connected())
    {
        client.reconnect(host, port);
        Serial.println("reconnected");
        delay(100);
    }
   
}
