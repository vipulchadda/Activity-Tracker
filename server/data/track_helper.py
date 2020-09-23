from google.cloud import firestore
import data.utility_helper as utility_helper

db = firestore.Client.from_service_account_json('C:\\Users\\vipul\Documents\\Personal Projects\\Milo Scheduler\\server\\firebase-key.json')

def add_activity(activity_type):
    print('inside add activity')
    activities = db.collection('activities')
    date_key = utility_helper.get_date_id()
    todays_activity = activities.document(date_key)

    if not todays_activity.get().exists:
        data = {
            'PEE':  [],
            'POOP': [],
            'WALK': [],
            'FOOD': []
        }
        data[activity_type].append(utility_helper.get_time())
        activities.add(data, date_key)
    else:
        current_activity = todays_activity.get().get(activity_type)
        current_activity.append(utility_helper.get_time())
        data = {
            activity_type: current_activity
        }
        todays_activity.update(data)