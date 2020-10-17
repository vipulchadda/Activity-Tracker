from datetime import datetime


def get_date_id(date=None):
    if date is None:
        date = datetime.today()
    return date.strftime('%Y%m%d')


def get_time():
    return datetime.now()


def get_date_from_string(date_string, date_format):
    return get_date_id(datetime.strptime(date_string, date_format))


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
