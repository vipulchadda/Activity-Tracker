from google.cloud import firestore

db = firestore.Client.from_service_account_json('firebase-key.json')

def add_activity():
    print('inside add activity')
    users_ref = db.collection(u'activities')
    docs = users_ref.stream()

    for doc in docs:
        print(f'{doc.id} => {doc.to_dict()}')
