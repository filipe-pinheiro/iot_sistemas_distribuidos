#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "Tanenbaum";
const char* password = "AlgebraLinear0314";
#define LIGHT_SENSOR_PIN 36 // ESP32 pin GIOP36 (ADC0)
const char* serverAddress = "http://192.168.100.5:3000/sensor-light";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");
}

void loop() {
  int analogValue = analogRead(LIGHT_SENSOR_PIN);

  Serial.print("Analog Value = ");
  Serial.print(analogValue);

  String sensorState;
  if (analogValue < 40) {
    Serial.println(" => Dark");
    sensorState = "Dark";
  } else if (analogValue < 800) {
    Serial.println(" => Dim");
    sensorState = "Dim";
  } else if (analogValue < 2000) {
    Serial.println(" => Light");
    sensorState = "Light";
  } else if (analogValue < 3200) {
    Serial.println(" => Bright");
    sensorState = "Bright";
  } else {
    Serial.println(" => Very bright");
    sensorState = "Very bright";
  }

  String sensorName = "Sensor 1";
  // Objeto JSON
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["sensor"] = sensorName;
  jsonDoc["state"] = sensorState;
  jsonDoc["value"] = analogValue;

  // JSON para string
  String jsonData;
  serializeJson(jsonDoc, jsonData);

  // Envia os dados para o servidor
  sendSensorData(jsonData);

  delay(500);
}

void sendSensorData(String jsonData) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    http.begin(serverAddress);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST(jsonData);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("HTTP Response Code: " + String(httpResponseCode));
      Serial.println(response);
    } else {
      Serial.println("HTTP Request failed");
    }

    http.end();
  } else {
    Serial.println("WiFi not connected");
  }
}
