from flask import Blueprint, request, Response
import os
import openai
from utils.ResponseUtil import ResponseUtil
import foodData.foodData
import json


openai.api_key = os.getenv("OPENAI_API_KEY")
openai.Completion.create(
    model="text-davinci-003",
    prompt="Say this is a test",
    max_tokens=7,
    temperature=0
)

users = Blueprint('openai', __name__)

class OpenAIEndpoint:

    @staticmethod
    @users.route("/test", methods=['GET'])
    def test():

        openai.api_key = os.getenv("OPENAI_API_KEY")
        openai.Completion.create(
            model="text-davinci-003",
            prompt="Say this is a test",
            max_tokens=7,
            temperature=0
        )



