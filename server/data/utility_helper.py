from datetime import datetime

def get_date_id():
    return datetime.today().strftime('%Y%m%d')

def get_time():
    return datetime.now()
