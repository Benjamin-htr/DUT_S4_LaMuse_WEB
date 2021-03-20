import os
from flask import Flask, jsonify, request, flash, redirect, url_for, send_from_directory;
from flask_cors import CORS;
from werkzeug.utils import secure_filename


import subprocess
# from flask_restful import Resource, Api;

UPLOAD_FOLDER = './Demo-test/'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
# api=Api(app)
CORS(app, #allow_headers = 'http://localhost:4200/'
)


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
    print(os.listdir())
    return jsonify([weather])



@app.route("/LaMuse/", methods = ['GET'])
def LaMuse():
    run_command('export TFHUB_CACHE_DIR=./tmp')
    proc = run_command('python3 -m LaMuse.LaMuse --nogui --input_dir Demo-test/Paintings --output_dir Demo-test/Interpretations --background_dir Demo-test/Backgrounds')
    return proc.stdout


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
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            resp = jsonify(success=True)
            resp.status_code = 200
            return resp



    


if __name__ == '__main__':
    app.run(debug=True, port = 5002)