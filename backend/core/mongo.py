from pymongo import MongoClient

client = MongoClient("mongodb://mongodb:27017/")
db = client["promanage"]

activity_logs = db["activity_logs"]
