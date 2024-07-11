from flask import Flask, jsonify

app = Flask(__name__)

# client visits URL, get json in return
# edits affect run-time!!!!
@app.route('/api/hello', methods=['GET'])
def say_hello():
    data = {'message': 'Hello from Flask!'}
    return jsonify(data)



if __name__ == '__main__':
    app.run(debug=True) # can define host and port