from flask import Flask, jsonify;
from flask_cors import CORS;
import subprocess
# from flask_restful import Resource, Api;


app = Flask(__name__)
# api=Api(app)
CORS(app, #allow_headers = 'http://localhost:4200/GenerateImages'
)


weather = {
    "data": [
    {
        "day": "1/6/2019",
        "temperature": "23",
        "windspeed": "16",
        "event": "Sunny"
    },
    {
        "day": "2/6/2019",
        "temperature": "21",
        "windspeed": "18",
        "event": "Rainy"
    },
    {
        "day": "3/6/2019",
        "temperature": "31",
        "windspeed": "12",
        "event": "Sunny"
    },
    {
        "day": "4/6/2019",
        "temperature": "5",
        "windspeed": "28",
        "event": "Snow"
    },
    {
        "day": "5/6/2019",
        "temperature": "17",
        "windspeed": "18",
        "event": "Rainy"
    },
    {
        "day": "6/6/2019",
        "temperature": "19",
        "windspeed": "21",
        "event": "Rainy"
    },
    {
        "day": "7/6/2019",
        "temperature": "28",
        "windspeed": "14",
        "event": "Sunny"
    }
    ]
}


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

@app.route("/LaMuse/", methods = ['GET'])
def LaMuse():
    run_command('export TFHUB_CACHE_DIR=./tmp')
    proc = run_command('python3 -m LaMuse.LaMuse --nogui --input_dir Demo-test/Paintings --output_dir Demo-test/Interpretations --background_dir Demo-test/Backgrounds')
    return proc.stdout
    


if __name__ == '__main__':
    app.run(debug=True, port = 5002)