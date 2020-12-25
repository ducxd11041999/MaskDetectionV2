import eventlet
from flask import Flask, render_template
from flask_mqtt import Mqtt
from flask_socketio import SocketIO

eventlet.monkey_patch()

app = Flask(__name__, template_folder='./views')
app.config['MQTT_BROKER_URL'] = 'test.mosquitto.org'
app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_REFRESH_TIME'] = 1.0

mqtt = Mqtt(app)


@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    print("CONNECT")
    #mqtt.subscribe('1')



@mqtt.on_log()
def handle_logging(client, userdata, level, buf):
    print("ON_LOG")
    #print(level, buf)


if __name__ == '__main__':
    #socketio.run(app, host = '0.0.0.0', debug= True , use_reloader=False, port = 8080)
    mqtt.init_app(app)
    app.run( host = '0.0.0.0', debug= False, port = 1883)
    
#socketio.run(app, host='0.0.0.0', port=5000, use_reloader=True, debug=True)