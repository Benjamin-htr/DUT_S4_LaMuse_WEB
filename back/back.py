import os
from flask import Flask, send_file ,jsonify, request, flash, redirect, url_for, send_from_directory;
from flask_cors import CORS;
from werkzeug.utils import secure_filename
import random


import subprocess

#extensions de fichiers autorisés à être upload sur le serveur :
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

UPLOAD_FOLDER = './Demo-test'

#configuration du serveur :
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

#permet d'empecher à chrome et edge de récupérer les images dans le cache (ils recuperaient des anciennes sinon)
@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response

CORS(app)

#chemin pour les différents dossiers :
back_path = "./Demo-test/Backgrounds/"
paint_path = "./Demo-test/Paintings/"
default_back_path = "./Demo-test/Default-Backgrounds/"
default_paint_path = "./Demo-test/Default-Paintings/"
result_path = "./Demo-test/Interpretations/"

#méthode permettant de savoir si le nom du fichier en paramètre est un fichier valide par rapport à son extension.
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


#permet d'exécuter une commande en sous processus :
def run_command(command):
    #return subprocess.Popen(command, shell=True, stdout=subprocess.PIPE).stdout.read()
    return subprocess.run(command, shell=True, timeout=240)

#simple route de base du serveur :
@app.route("/", methods=['GET'])
def index():
    return "Welcome to Test"

#route pour exécuter le module python laMuse (utilisé pour le mode auto):
@app.route("/LaMuseDefault", methods = ['GET'])
def LaMuseDefault():
    #permet d'activer une autorisation pour tensorflow (ne fonctionne pas vraiment,
    # il taper à la main la commande sur le serveur si l'exécution du module laMuse se stoppe (dépend des machines)) :
    os.system("export TFHUB_CACHE_DIR=./tmp")

    #on créer les dossiers backgrounds et paintings s'ils n'existent pas déjà puis on supprimer les images déjà existante :
    os.system("mkdir -p ./Demo-test/Backgrounds/ ./Demo-test/Paintings/")
    os.system("rm -f "+back_path+'*')
    os.system("rm -f "+paint_path+'*')
    os.system("rm -f "+result_path+'*')

    #on récupère une image aléatoire parmis les backgrounds par dééfaut stockés sur le serveur :
    back_images = os.listdir(default_back_path)
    back_image = random.choice(back_images)
    print(back_image)
    #on copie cette image dans le dossier backgrounds :
    os.system("cp "+default_back_path+back_image+' '+back_path)

    #idem pour les peinture s:
    paint_images = os.listdir(default_paint_path)
    paint_image = random.choice(paint_images)
    print(paint_image)
    os.system("cp "+default_paint_path+paint_image+' '+paint_path)

    #on exécute le module LaMuse :
    command = 'python3 -m LaMuse.LaMuse --nogui --input_dir '+paint_path+' --output_dir '+result_path+' --background_dir '+back_path
    os.system(command)

    #puis on retourne une réponse positive vers le serveur front
    resp = jsonify(success=True)
    resp.status_code = 200
    return resp

#route pour exécuter le module python laMuse (utilisé pour le mode Custom):
@app.route("/LaMuseCustom", methods = ['GET'])
def LaMuseCustom():
    print('CUSTOM')
    #idem que dans la précédente fonction :
    os.system("export TFHUB_CACHE_DIR=./tmp")
    os.system("mkdir -p ./Demo-test/Backgrounds/ ./Demo-test/Paintings/")

    #sauf qu'on ne veut ici que supprimer le résultat précédemment généré s'il y en a :
    os.system("rm -f "+result_path+'*')

    back_img = os.listdir(back_path)[0]
    print(back_img)
    paint_img = os.listdir(paint_path)[0]
    print(paint_img)
    command = 'python3 -m LaMuse.LaMuse --nogui --input_dir '+paint_path+' --output_dir '+result_path+' --background_dir '+back_path
    os.system(command)
    resp = jsonify(success=True)
    resp.status_code = 200
    return resp

#route permettant d'upload une image dans le dossier background de notre serveur :
@app.route('/uploadBack', methods=['GET', 'POST'])
def upload_Back():
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
            print("back :", filename)
            os.system("rm -f "+back_path+'*')
            os.system("rm -f "+result_path+'*')
            
            app.config['UPLOAD_FOLDER'] = back_path
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            resp = jsonify(success=True)
            resp.status_code = 200
            return resp

#route permettant d'upload une image dans le dossier paintings de notre serveur :
@app.route('/uploadPaint', methods=['GET', 'POST'])
def upload_Paint():
    if request.method == 'POST':
        print('UploadPaint')
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
            print("paint :", filename)
            os.system("rm -f "+paint_path+'*')
            os.system("rm -f "+result_path+'*')
            
            app.config['UPLOAD_FOLDER'] = paint_path
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            resp = jsonify(success=True)
            resp.status_code = 200
            
            return resp


#route permettant d'accéder à l'image résultat stockée sur notre serveur :
@app.route('/sendResult/', methods=['GET'])
def get_image() :
    dirfiles = os.listdir(result_path)
    for image in dirfiles:
        if (image.endswith(".jpg") or image.endswith(".png")):
            if image.count('.') <= 2 :
                print(image)
                return send_file(result_path+image, as_attachment=True, attachment_filename=image, mimetype='image/jpg')

#route permettant d'accéder à l'image background stockée sur notre serveur :
@app.route('/sendBackImg/', methods=['GET'])
def get_back_img() :
    dirfiles = os.listdir(back_path)
    for image in dirfiles:
        if (image.endswith(".jpg") or image.endswith(".png")):
            print(image)
            return send_file(back_path+image, as_attachment=True, attachment_filename=image, mimetype='image/jpg')
    
#route permettant d'accéder à l'image painting stockée sur notre serveur :
@app.route('/sendPaintImg/', methods=['GET'])
def get_paint_img() :
    dirfiles = os.listdir(paint_path)
    for image in dirfiles:
        if (image.endswith(".jpg") or image.endswith(".png")):
            print(image)
            return send_file(paint_path+image, as_attachment=True, attachment_filename=image, mimetype='image/jpg')

    

#on lance le serveur le local lors de l'excution du fchier essai.py :
if __name__ == '__main__':
    app.run(debug=True, port = 5002)