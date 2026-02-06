from celery import shared_task
from datetime import datetime
from .mongo import activity_logs

@shared_task
def log_activity(action, user_id=None, meta=None):
    activity_logs.insert_one({
        "action": action,
        "user_id": user_id,
        "meta": meta or {},
        "timestamp": datetime.utcnow()
    })
