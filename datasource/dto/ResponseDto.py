

class ResponseDto:

    def __init__(self):
        self.data = None
        self.code = None
        self.message = None

    #filter[yearGT] value 2005
    def getJson(self):
        model = {
            "data": self.data,
            "code": self.code,
            "message": self.message
        }
        return model

