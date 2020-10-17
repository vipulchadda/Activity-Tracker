from flask import Flask, jsonify, request
import data.track_helper as track_helper
import data.utility_helper as utility_helper
import os


def track_activity(request):
    headers = utility_helper.get_cors_headers(request)
    if request.method == 'OPTIONS':
        return ('', 204, headers)

    request_json = request.get_json()
    track_helper.add_activity(
        request_json['type'], request_json['datetime'], request_json['format'])
    data = jsonify(message='Activity logged for type %s' %
                   request_json['type'])
    return (data, 200, headers)


def get_day_summary(request):
    headers = utility_helper.get_cors_headers(request)

    data = jsonify(track_helper.get_day_details(
        request.args.get('date'), request.args.get('format')))
    return (data, 200, headers)


# Starting Flask only if running locally
if 'LOCAL_SERVER' in os.environ:
    app = Flask(__name__)

    @app.route('/track-activity', methods=['OPTIONS', 'POST'])
    def call_track_activity():
        return track_activity(request)

    @app.route('/get-day-summary', methods=['GET'])
    def call_get_day_summary():
        return get_day_summary(request)

    if __name__ == '__main__':
        app.run()
