import os,io
from subprocess import Popen, PIPE
import PIL
from PIL import Image
from io import BytesIO
import simplejson
import traceback
from flask_cors import CORS, cross_origin
from flask import Flask, request, render_template, redirect, url_for, send_from_directory, make_response,send_file,jsonify
from flask_bootstrap import Bootstrap
from werkzeug.utils import secure_filename
from lib.upload_file import uploadfile
import base64

app = Flask(__name__)
CORS(app, resources=r'/api/*')
app.config['SECRET_KEY'] = 'hard to guess string'
app.config['UPLOAD_FOLDER'] = 'data/'
app.config['THUMBNAIL_FOLDER'] = 'data/thumbnail/'
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

ALLOWED_EXTENSIONS = set(['txt', 'gif', 'png', 'jpg', 'jpeg', 'bmp', 'rar', 'zip', '7zip', 'doc', 'docx'])
IGNORED_FILES = set(['.gitignore'])

bootstrap = Bootstrap(app)


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def gen_file_name(filename):
    """
    If file was exist already, rename it and return a new name
    """
    i = 1
    while os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], filename)):
        name, extension = os.path.splitext(filename)
        filename = '%s_%s%s' % (name, str(i), extension)
        i += 1

    return filename


def create_thumbnail(image):
    try:
        base_width = 80
        img = Image.open(os.path.join(app.config['UPLOAD_FOLDER'], image))
        w_percent = (base_width / float(img.size[0]))
        h_size = int((float(img.size[1]) * float(w_percent)))
        img = img.resize((base_width, h_size), PIL.Image.ANTIALIAS)
        img.save(os.path.join(app.config['THUMBNAIL_FOLDER'], image))
        return True

    except:
        print (traceback.format_exc())
        return False

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
        process = Popen(['python', 'detect_mask_image.py', '-i', './screen/image.jpg'], stdout=PIPE, stderr=PIPE,  cwd="../detectModules")
        stdout, stderr = process.communicate()
        print(stdout)
        #os.popen(["cd", ".."])
        #print (os.popen("pwd"))
        #os.popen("cd detectModules")
        #os.popen("python detect_mask_image.py -i C:\\Users\\17520\\Desktop\\ProjectDetectMask\\serverFlask\\image.jpg")
        
    return render_template('index.html')
@app.route("/upload", methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        print("okela")
        files = request.files['file']
        if files:
            filename = secure_filename(files.filename)
            filename = gen_file_name(filename)
            mime_type = files.content_type
            print("ok")
            if not allowed_file(files.filename):
                result = uploadfile(name=filename, type=mime_type, size=0, not_allowed_msg="File type not allowed")
                print("ok")
            else:
                # save file to disk
                uploaded_file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                files.save(uploaded_file_path)

                # create thumbnail after saving
                if mime_type.startswith('image'):
                    create_thumbnail(filename)
                
                # get file size after saving
                size = os.path.getsize(uploaded_file_path)

                # return json for js call back
                result = uploadfile(name=filename, type=mime_type, size=size)
            
            return simplejson.dumps({"files": [result.get_file()]})

    if request.method == 'GET':
        print("ok")
        # get all file in ./data directory
        files = [f for f in os.listdir(app.config['UPLOAD_FOLDER']) if os.path.isfile(os.path.join(app.config['UPLOAD_FOLDER'],f)) and f not in IGNORED_FILES ]
        
        file_display = []

        for f in files:
            size = os.path.getsize(os.path.join(app.config['UPLOAD_FOLDER'], f))
            file_saved = uploadfile(name=f, size=size)
            file_display.append(file_saved.get_file())  

        return simplejson.dumps({"files": file_display})

    return redirect(url_for('index'))

@app.route('/upbase64', methods=['GET','POST'])
@cross_origin(origins='*', send_wildcard=True)
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            byte_io = io.BytesIO()
            byte_io.write(file.read())
            byte_io.seek(0)
            response = make_response(send_file(byte_io,mimetype='image/jpg'))
            response.headers['Content-Transfer-Encoding']='base64'
            return response 
    return render_template('upload.html')

@app.route('/upload1', methods=['GET', 'POST'])
def upload_file1():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            #flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            #flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('upload_file',
                                    filename=filename))
    return None

@app.route("/delete/<string:filename>", methods=['DELETE'])
def delete(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file_thumb_path = os.path.join(app.config['THUMBNAIL_FOLDER'], filename)

    if os.path.exists(file_path):
        try:
            os.remove(file_path)

            if os.path.exists(file_thumb_path):
                os.remove(file_thumb_path)
            
            return simplejson.dumps({filename: 'True'})
        except:
            return simplejson.dumps({filename: 'False'})


# serve static files
@app.route("/thumbnail/<string:filename>", methods=['GET'])
def get_thumbnail(filename):
    return send_from_directory(app.config['THUMBNAIL_FOLDER'], filename=filename)

@app.route("/data/<string:filename>", methods=['GET'])
def get_file(filename):
    return send_from_directory(os.path.join(app.config['UPLOAD_FOLDER']), filename=filename)


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)