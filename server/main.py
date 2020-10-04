from flask import Flask, jsonify, request
import data.track_helper as track_helper
import os


def track_activity(request):
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    request_json = request.get_json()
    track_helper.add_activity(request_json['type'])
    data = jsonify(message='Activity logged for type %s' %
                   request_json['type'])
    return (data, 200, headers)


if 'LOCAL_SERVER' in os.environ:
    app = Flask(__name__)

    @app.route('/track-activity', methods=['OPTIONS', 'POST'])
    def call_track_activity():
        return track_activity(request)

    if __name__ == '__main__':
        app.run()
