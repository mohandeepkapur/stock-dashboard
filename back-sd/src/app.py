from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # lu!

# client visits URL, get json in return
# edits affect run-time!!!!
@app.route('/api/hello', methods=['GET'])
def say_hello():
    data = {'message': 'Hello from Flask!'}
    return jsonify(data)



if __name__ == '__main__':
    app.run(debug=True) # can define host and port