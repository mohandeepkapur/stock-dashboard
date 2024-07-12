from flask import Flask, jsonify
from flask_cors import CORS
from time import sleep
import random as rnd

app = Flask(__name__)
CORS(app) # lu!
# client visits URL, get json in return
# edits affect run-time!!!!
@app.route('/api/hello', methods=['GET'])
def say_hello():
    data = {'message': 'Hello from Flask!'}
    return jsonify(data)

@app.route('/api/counter/one', methods=['GET'])
def counter_one():
    i = 1
    data = {'number' : str(i)}
    return jsonify(data)

@app.route('/api/counter/two', methods=['GET'])
def counter_two():
    data = {'number' : rnd.randint(0, 100000)}
    return jsonify(data)

@app.route()


# can my server methods run in parallel?

if __name__ == '__main__':
    app.run(debug=True) # can define host and port