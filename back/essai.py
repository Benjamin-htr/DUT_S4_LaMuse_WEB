import os
from flask import Flask, send_file ,jsonify, request, flash, redirect, url_for, send_from_directory;
from flask_cors import CORS;
from werkzeug.utils import secure_filename
import random


import subprocess
# from flask_restful import Resource, Api;

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

UPLOAD_FOLDER = './Demo-test'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
# api=Api(app)
CORS(app, #allow_headers = 'http://localhost:4200/'
)

back_path = "./Demo-test/Backgrounds/"
paint_path = "./Demo-test/Paintings/"
default_back_path = "./Demo-test/Default-Backgrounds/"
default_paint_path = "./Demo-test/Default-Paintings/"
result_path = "./Demo-test/Interpretations/"

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



def run_command(command):
    #return subprocess.Popen(command, shell=True, stdout=subprocess.PIPE).stdout.read()
    return subprocess.run(command, shell=True, timeout=240)


@app.route("/", methods=['GET'])
def index():
    return "Welcome to Test";

@app.route("/weatherReport/", methods = ['GET'])
def WeatherReport():
    global weather
    return jsonify([weather])



@app.route("/LaMuseDefault", methods = ['GET'])
def LaMuse():
    os.system("export TFHUB_CACHE_DIR=./tmp")
    os.system("rm -f "+back_path+'*')
    os.system("rm -f "+paint_path+'*')
    os.system("rm -f "+result_path+'*')
    back_images = os.listdir(default_back_path)
    back_image = random.choice(back_images)
    print(back_image)
    os.system("cp "+default_back_path+back_image+' '+back_path)
    paint_images = os.listdir(default_paint_path)
    paint_image = random.choice(paint_images)
    print(paint_image)
    os.system("cp "+default_paint_path+paint_image+' '+paint_path)

    command = 'python3 -m LaMuse.LaMuse --nogui --input_dir '+paint_path+' --output_dir '+result_path+' --background_dir '+back_path
    proc = run_command(command)
    return "Finish"


@app.route('/uploadFile', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename) :
            filename = secure_filename(file.filename)
            """ os.system("rm ./Demo-test/Backgrounds/*") """
            app.config['UPLOAD_FOLDER'] = "./Demo-test/"
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            resp = jsonify(success=True)
            resp.status_code = 200
            return resp



@app.route('/sendResult/', methods=['GET'])
def get_image():
    path = "./Demo-test/Interpretations/"
    dirfiles = os.listdir(path)
    for image in dirfiles:
        if (image.endswith(".jpg") or image.endswith(".png")):
            if image.count('.') == 2:
                print(image)
                return send_file(path+image, mimetype='')


""" @app.route('/uploadFile', methods=['GET', 'POST'])
def upload_file():
    file = request.files['file']
    filename = secure_filename(file.filename)
    print(filename)
    return "none" """
    


if __name__ == '__main__':
    app.run(debug=True, port = 5002)