import datetime
import time
"""
    AlphaVantage accepts 5 requests per minute.
    I will be sending 4 requests per batch every 60 seconds. (Errors occur in 5 requests per batch.)
"""
class BatchHandler():
    limit = 4
    wait_time = datetime.timedelta(0, 61)
    requests = 4
    next_batch = datetime.datetime.now()

    @staticmethod
    def __wait():
        print("Waiting ... ")
        time_now = datetime.datetime.now()
        if BatchHandler.next_batch > time_now:
            sleep_time = BatchHandler.next_batch - time_now
            # print("Sleeping for another ", sleep_time.seconds, " seconds")
            # print("Next Batch Time", BatchHandler.next_batch)
            # print("Time Now:", time_now)
            time.sleep(sleep_time.seconds)

    @staticmethod
    def __restart():
        BatchHandler.__wait()
        BatchHandler.requests = 0
        BatchHandler.next_batch = datetime.datetime.now() + BatchHandler.wait_time

    @staticmethod
    def request_access():
        if BatchHandler.requests == BatchHandler.limit:
            BatchHandler.__restart()
        BatchHandler.requests += 1
        print("Requests: ",BatchHandler.requests)
