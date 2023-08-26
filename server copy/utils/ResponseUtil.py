from datasource.dto.ResponseDto import ResponseDto
from flask import Response
import json
from bson.objectid import ObjectId

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

class ResponseUtil:

    @staticmethod
    def buildResponse(data, code=None, message=None):
        responseDto = ResponseDto()

        if data is not None and code is None:
            responseDto.data = data
            responseDto.code = 200
            responseDto.message = "OK"
            return Response(json.dumps(responseDto.getJson(), cls=JSONEncoder), status=responseDto.code)

        if data is not None and code is not None:
            responseDto.data = data
            responseDto.code = code
            if message is not None:
                responseDto.message = message
            else:
                if code == 201:
                    responseDto.message = "CREATED"
                elif code == 202:
                    responseDto.message = "ACCEPTED"
                else:
                    responseDto.message = "UNKNOWN"
            return Response(json.dumps(responseDto.getJson(), cls=JSONEncoder), status=responseDto.code)

        elif data is None and code is not None:
            responseDto.data = data
            responseDto.code = code
            if message is not None:
                responseDto.message = message
            else:
                if code == 400:
                    responseDto.message = "BAD REQUEST"
                elif code == 401:
                    responseDto.message = "UNAUTHORIZED"
                elif code == 403:
                    responseDto.message = "FORBIDDEN"
                elif code == 404:
                    responseDto.message = "NOT FOUND"
                elif code == 500:
                    responseDto.message = "INTERNAL SERVER ERROR"
                else:
                    responseDto.message = "UNKNOWN"
            return Response(json.dumps(responseDto.getJson(), cls=JSONEncoder), status=responseDto.code)

        else:
            responseDto.data = None
            responseDto.code = 500
            responseDto.message = "Something went wrong with implementation."

        try:
            return Response(json.dumps(responseDto.getJson(), cls=JSONEncoder), status=responseDto.code)
        except Exception as e:
            return Response(f"Serialization error: {str(e)}", status=500)

