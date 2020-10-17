from google.cloud import firestore
import data.utility_helper as utility_helper
import os

if 'FIREBASE_SECRET' in os.environ:
    db = firestore.Client.from_service_account_json(
        os.environ['FIREBASE_SECRET'])
else:
    db = firestore.Client()


def add_activity(activity_type, datetime=None, format=None):
    activities = db.collection('activities')
    date_key = utility_helper.get_date_id()
    if datetime is not None:
        date_key = utility_helper.get_date_from_string(datetime, format)
    todays_activity = activities.document(date_key)

    if not todays_activity.get().exists:
        data = {
            'PEE':  [],
            'POOP': [],
            'WALK': [],
            'FOOD': []
        }
        data[activity_type].append(utility_helper.get_time(datetime, format))
        activities.add(data, date_key)
    else:
        current_activity = todays_activity.get().get(activity_type)
        current_activity.append(utility_helper.get_time(datetime, format))
        data = {
            activity_type: current_activity
        }
        todays_activity.update(data)


def get_day_details(date, format):
    activities = db.collection('activities')
    date_key = utility_helper.get_date_from_string(date, format)
    return activities.document(date_key).get().to_dict()
