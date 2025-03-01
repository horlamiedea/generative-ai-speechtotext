import os
from openai import OpenAI
from django.conf import settings

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def translate_text(text, source_lang, target_lang):
    prompt = f"Translate the following text from {source_lang} to {target_lang}:\n\n{text}"
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a professional translator specializing in medical terminology."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=1000
    )
    return response.choices[0].message.content