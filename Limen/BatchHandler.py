import datetime
import time
"""
    AlphaVantage accepts 5-6 requests per minute.
    I will be sending 5 requests per batch every 60 seconds.
"""
class BatchHandler():
    limit = 3
    wait_time = datetime.timedelta(0, 40)
    next_batch = datetime.datetime.now() + datetime.timedelta(0, 61)
    requests = 0

    @staticmethod
    def __wait():
        sleep_time = BatchHandler.next_batch - datetime.datetime.now()
        print("Sleeping for another ", sleep_time.seconds, " seconds", BatchHandler.next_batch, datetime.datetime.now())
        time.sleep(sleep_time.seconds)

    @staticmethod
    def __restart():
        print("Hello in restart")
        BatchHandler.__wait()
        BatchHandler.requests = 0
        print("Number of requests: ",BatchHandler.requests)
        BatchHandler.next_batch = datetime.datetime.now() + BatchHandler.wait_time

    @staticmethod
    def request_access():
        print("Number of requests: ",BatchHandler.requests)
        if BatchHandler.requests >= BatchHandler.limit:
            print("World in request_access")
            BatchHandler.__restart()
        print("Hello World from Batch BatchHandler")
        BatchHandler.requests += 1
