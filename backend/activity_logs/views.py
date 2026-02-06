from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from core.mongo import activity_logs as mongo_logs

class ActivityLogListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logs = mongo_logs.find().sort("timestamp", -1).limit(50)

        data = []
        for log in logs:
            log["_id"] = str(log["_id"])
            data.append(log)

        return Response(data)
