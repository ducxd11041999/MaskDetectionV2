from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'

socketio = SocketIO(app, cors_allowed_origins='*')


@socketio.on('connect')
def test_connect():
    print('connected')

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

@socketio.on("message")
def handle_message(data):
    print("received message "+ data)
    emit('myresponse', {'data': 'Connected'})

if __name__ == '__main__':
    socketio.run(app)