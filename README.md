# Backend Instructions

  ## Requirements
    - A running postgrs database
    -configarations "DATABASES
    = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'journal',
        'USER': 'postgres',
        'PASSWORD': 'movie123',
        'HOST': 'localhost',
        'PORT': '5435',
    }
      }"
  ## procedure 
    - start virtual environment .venv
    - cd Journaling_app
    - run migrations {
    python manage.py makemigrations
    python manage.py migrate
    }
    - start app 
    ( python manage.py runserver
     
# Frontend
       cd frontend
  ## instructions
       - npm install
       - start app by run the command


