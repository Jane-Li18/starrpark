import os
from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise
from pathlib import Path

# Set up Django settings
BASE_DIR = Path(__file__).resolve().parent.parent
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'starrpark.settings')

# Create the WSGI application
django_app = get_wsgi_application()

# Wrap with WhiteNoise for static files
application = WhiteNoise(
    django_app,
    root=str(BASE_DIR / "staticfiles"),
    prefix="/static/",
    max_age=604800
)

# This is what Vercel looks for
app = application
