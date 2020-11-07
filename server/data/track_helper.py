from google.cloud import firestore
import data.utility_helper as utility_helper
import os

if 'FIREBASE_SECRET' in os.environ:
    db = firestore.Client.from_service_account_json(
        os.environ['FIREBASE_SECRET'])
else:
    db = firestore.Client()


def add_activity(activity_type, datetime, timezone):
    activities = db.collection('activities')
    date_key = utility_helper.get_date_from_string(datetime, timezone)

    todays_activity = activities.document(date_key)

    if not todays_activity.get().exists:
        data = {
            'PEE':  [],
            'POOP': [],
            'WALK': [],
            'FOOD': []
        }
        data[activity_type].append(utility_helper.get_time(datetime, timezone))
        activities.add(data, date_key)
    else:
        current_activity = todays_activity.get().get(activity_type)
        current_activity.append(utility_helper.get_time(datetime, timezone))
        data = {
            activity_type: current_activity
        }
        todays_activity.update(data)


def get_day_details(date, timezone):
    activities = db.collection('activities')
    date_key = utility_helper.get_date_from_string(date, timezone)
    return activities.document(date_key).get().to_dict()
