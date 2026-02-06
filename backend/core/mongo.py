from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["promanage"]

activity_logs = db["activity_logs"]
