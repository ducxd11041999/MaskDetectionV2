from flask import Flask, render_template
from flask_socketio import SocketIO, emit, ConnectionRefusedError,send
from flask_cors import CORS, cross_origin
import socketio
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secrettt'
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)
socketio = SocketIO(app, async_mode='eventlet', cors_allowed_origins='*', cookie=None, engineio_logger=False)

@cross_origin
@socketio.on("connect")
def test_connect():
    print("connected")
    emit('my_response',{'data': message['data'], 'count': session['receive_count']})

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

@socketio.on("message")
def handle_message(data):
    print("received message "+ data)
    emit('myresponse', {'data': 'Connected'})


if __name__ == '__main__':
    socketio.run(app, host = '0.0.0.0', debug= True , use_reloader=False, port = 8080)