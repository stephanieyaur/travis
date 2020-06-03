from flask import Flask, request
import json
from idoc_lambda_func import lambda_handler
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/')
def get_idoc_data():
    
    event = {
        "queryStringParameters": {}
    }
    context = {}
    for k, v in request.args.items():
        event["queryStringParameters"][k] = v

    return json.loads(lambda_handler(event, context)["body"])

app.run(host='localhost', port=3001)