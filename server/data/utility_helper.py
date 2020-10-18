from datetime import datetime
import dateutil.parser as parser


def get_date_id(date=None):
    if date is None:
        date = datetime.now()
    return date.astimezone().strftime('%Y%m%d')


def get_time(date_string=None):
    if date_string is None:
        return datetime.now().astimezone()
    else:
        return parser.parse(date_string).astimezone()


def get_date_from_string(date_string):
    return get_date_id(parser.parse(date_string))


def get_cors_headers(request):
    # Set CORS headers for the pre-flight request
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return headers

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    return headers
