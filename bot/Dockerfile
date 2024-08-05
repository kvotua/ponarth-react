FROM python:3.12.3-alpine
WORKDIR /code
COPY . .
RUN pip install -r ./requirements.txt
# RUN python host.py
CMD ["python", "./main.py"]
