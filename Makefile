HOST=0.0.0.0
PORT=80
FAVICON=/home/color-picker/images/'duck.png'

nopt:
	true
run:
	python app.py --host $(HOST) --port $(PORT) --favicon $(FAVICON)
