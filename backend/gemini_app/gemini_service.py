import google.generativeai as genai
from django.conf import settings

def initialize_gemini():
    genai.configure(api_key=settings.GEMINI_API_KEY)

def generate_content(prompt, model="gemini-pro"):
    initialize_gemini()
    model = genai.GenerativeModel(model)
    response = model.generate_content(prompt)
    return response.text