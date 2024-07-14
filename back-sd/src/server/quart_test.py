from quart import Quart, jsonify
from quart_cors import cors
from time import sleep
import random as rnd

app = Quart(__name__)
app = cors(app) # lu!


# client visits URL, get json in return
# edits affect run-time!!!!
@app.route('/api/hello', methods=['GET'])
async def say_hello():
    data = {'message': 'Hello from Quart!'}
    return jsonify(data)

# can my server methods run in parallel?
# yes

@app.route('/api/counter/one', methods=['GET'])
def counter_one():
    data = {'number' : rnd.randint(0, 10)}
    return jsonify(data)

@app.route('/api/counter/two', methods=['GET'])
def counter_two():
    data = {'number' : rnd.randint(0, 10)}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True) # can define host and port


# i = 0
# j = 0
# @app.route('/api/counter/one', methods=['GET'])
# async def counter_one():
#     i+=1
#     data = {'number' : str(i)}
#     return jsonify(data)

# @app.route('/api/counter/two', methods=['GET'])
# async def counter_two():
#     i+=1
#     data = {'number' : str(i)}
#     return jsonify(data)