from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Transcript
from .utils import translate_text

class TranslateView(APIView):
    def post(self, request):
        text = request.data.get('text')
        source_lang = request.data.get('source_lang', 'en')
        target_lang = request.data.get('target_lang', 'es')

        if not text:
            return Response({"error": "Text is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            translated_text = translate_text(text, source_lang, target_lang)
            transcript = Transcript.objects.create(
                original_text=text,
                translated_text=translated_text,
                original_language=source_lang,
                target_language=target_lang
            )
            return Response({
                "original": text,
                "translated": translated_text,
                "id": transcript.id
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)