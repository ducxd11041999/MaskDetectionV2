import os,io,sys

path_dir = os.path.dirname(os.path.abspath(__file__)) + '\..'
print(path_dir)
detect_mask_module_path = path_dir + '\detectModules'
models_path = detect_mask_module_path + '\mask_detector.model'
sys.path.append(path_dir)

from subprocess import Popen, PIPE
from PIL import Image
from io import BytesIO
import traceback
from flask_cors import CORS, cross_origin
from flask import Flask, request, render_template, redirect, url_for, send_from_directory, make_response,send_file,jsonify
import base64
import detectModules.detect_mask_image as detect_mask_image
app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'hard to guess string'
app.config['UPLOAD_FOLDER'] = 'data/'
app.config['THUMBNAIL_FOLDER'] = 'data/thumbnail/'
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

ALLOWED_EXTENSIONS = set(['txt', 'gif', 'png', 'jpg', 'jpeg', 'bmp', 'rar', 'zip', '7zip', 'doc', 'docx'])
IGNORED_FILES = set(['.gitignore'])

global graph,model, net
prototxtPath = os.path.sep.join([detect_mask_module_path, 'face_detector', "deploy.prototxt"])
weightsPath = os.path.sep.join([detect_mask_module_path, 'face_detector',
    "res10_300x300_ssd_iter_140000.caffemodel"])
graph, model, net = detect_mask_image.load_model(models_path, prototxtPath, weightsPath)

@app.route('/run/<command>')
def run(command):
    out = os.popen(command).read()
    print(type(command))
    print(command)
    return (out)

@app.route('/json', methods=['POST', 'GET'])
@cross_origin()
def img():
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
        image = detect_mask_image.run(graph, model, net ,os.path.abspath('../detectModules/screen/image.jpg'), show_output=True)
        #process = Popen(['python', 'detect_mask_image.py', '-i', './screen/image.jpg'], stdout=PIPE, stderr=PIPE,  cwd="../detectModules")
        #stdout, stderr = process.communicate()
        #print(stdout)
    else:
        print("NOT POST")     
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)