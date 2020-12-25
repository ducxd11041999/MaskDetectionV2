import os,io,sys
from markupsafe import escape
path_dir = os.path.dirname(os.path.abspath(__file__)) + '\..'
print(path_dir)
detect_mask_module_path = path_dir + '\detectModules'
models_path = detect_mask_module_path + '\mask_detector.model'
sys.path.append(path_dir)
import numpy as np
import tensorflow as tf
from subprocess import Popen, PIPE
from PIL import Image
from io import BytesIO
import traceback
from flask_cors import CORS, cross_origin
from flask import Flask, request, render_template, redirect, url_for, send_from_directory, make_response,send_file,jsonify
from flask_socketio import SocketIO, emit, send
import base64
import detectModules.detect_mask_image as detect_mask_image
from db import *
from pySerialDriver import *
import json
import random
import time
from paho.mqtt import client as mqtt_client

broker = '192.168.137.1'
port = 1883
client = None
topic = "/python/mqtt"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{random.randint(0, 1000)}'


app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'hard to guess string'
app.config['UPLOAD_FOLDER'] = 'data/'
app.config['THUMBNAIL_FOLDER'] = 'data/thumbnail/'
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app, cors_allowed_origins='*')
ALLOWED_EXTENSIONS = set(['txt', 'gif', 'png', 'jpg', 'jpeg', 'bmp', 'rar', 'zip', '7zip', 'doc', 'docx'])
IGNORED_FILES = set(['.gitignore'])

#global variable
global graph,model, net, sess , result, conn , covid_result, serialcomm

## Load model
prototxtPath = os.path.sep.join([detect_mask_module_path, 'face_detector', "deploy.prototxt"])
weightsPath = os.path.sep.join([detect_mask_module_path, 'face_detector',
    "res10_300x300_ssd_iter_140000.caffemodel"])
print(models_path, prototxtPath, weightsPath )
graph, sess, model, net = detect_mask_image.load_model(models_path, prototxtPath, weightsPath)

### Connect database
conn = create_connection()
#drop all data users
drop_tables(conn, "users")
#create new db users
create_table_user(conn)



def on_message(client, userdata, message):
    print("message received " ,str(message.payload.decode("utf-8")))
    print("message topic=",message.topic)
    print("message qos=",message.qos)
    print("message retain flag=",message.retain)

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
            #client.on_message=on_message
            #client.subscribe("outTopic")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client




def publish(client, argmsg):
    msg = argmsg
    print("call ham call ham")
    result = client.publish(topic, msg)
    # result: [0, 1]
    status = result[0]
    if status == 0:
        print(f"Send `{msg}` to topic `{topic}`")
    else:
        print(f"Failed to send message to topic {topic}")


client = connect_mqtt()
client.loop_start()
publish(client, 0)


@app.route('/run/<command>')
def run(command):
    out = os.popen(command).read()
    print(type(command))
    print(command)
    return (out)

@app.route('/runn', methods=['GET'])
def handle():
    detect_mask_image.run(graph, sess, model, net , os.path.abspath('../detectModules/avt.jpg'), 0.5, show_output=True)

@app.route('/json', methods=['POST', 'GET'])
@cross_origin()
def img_upload():
    if request.method == 'POST':
        req = request.get_json()
        #print('req' , (req["img"]))
        img_data = (req["img"]) #str
        #print(base64_message)
        f = open("data.txt", "w")
        f.write(str(img_data))
        f.close()
        starter = img_data.find(',')
        image_data = img_data[starter+1:]
        image_data = bytes(image_data, encoding="ascii")
        im = Image.open(BytesIO(base64.b64decode(image_data)))
        rgb_im = im.convert('RGB')
        rgb_im.save('../detectModules/screen/image.jpg')
        image, result = detect_mask_image.run(graph, sess, model, net , os.path.abspath('../detectModules/screen/image.jpg'), 0.5, show_output=False)
        print(result)
        #print((image))
        if(image is not None):
            # print("OK")
            # img_w, img_h = 200, 200
            # data = np.zeros((img_h, img_w, 3), dtype=np.uint8)
            # data[100, 100] = [255, 0, 0]
            img = np.array(image)
            mean = 0
            # var = 0.1
            # sigma = var**0.5
            gauss = np.random.normal(mean, 1, img.shape)
            # normalize image to range [0,255]
            noisy = img + gauss
            minv = np.amin(noisy)
            maxv = np.amax(noisy)
            noisy = (255 * (noisy - minv) / (maxv - minv)).astype(np.uint8)
            im = Image.fromarray(noisy,"RGB")
            im.save('./Output/test.png')
            # data = {
            #     "result" : result,
            # }
            # if(result):
            #     #Have mask
            #     print("Have Mask")
            #     #return result
            # else:
                #No Mask
                # print("No Mask")
                #return result
            with open("./Output/test.png", "rb") as image_file:
                encoded_string = base64.b64encode(image_file.read())
            return_data = {"result" : result, "img":encoded_string}
            # return  '{},{}'.format(result,encoded_string)
            return jsonify(return_data)
        else:
            print("Not file return")
    else:
        print("NOT POST")     
    return render_template('index.html', status = result)

@app.route('/usr_info', methods=['POST', 'GET'])
@socketio.on('my event')
@cross_origin()
def info_upload():
    if (request.method == 'POST'):
        res = request.get_json()
        name = res["name"]
        ages = res["ages"]
        #connect drivers
        if((name == '')):
            covid_result = 1
        #print(res)
        if (res["cough"] or res["headache"] or res["breath"] or res["tangent"] or res["tire"] or res["fever"] or res["travel"]):
            print("Covid")
            covid_result = 1
        else:
            covid_result = 0
            print("NoCovid")
        #heath_dtls = res["heath_dtls"]

        # save data into database
        data = [name, ages, covid_result]
        insert_data(conn, data)
        #data_user = view_db(conn, "users")
        #print (data_user)
        #print(data)
        #print(res)
        #check no data
        if (covid_result == 1):
            #print("Co benh")
            #send_data("c", serialcomm)
            client.loop_start()
            publish(client, 0)
            return escape(True)
        else:
            #print("Cua da mo khoa")
            #send_data("o", serialcomm)
            # serialcomm = setup('COM9', 19200, 1)
            # send_data("o", serialcomm)      
            client.loop_start()
            publish(client, 1)
            return escape(False)
    else:
        return True

if __name__ == '__main__':
    app.run(host = '192.168.137.1',debug=False)