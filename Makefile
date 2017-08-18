HOST=0.0.0.0
PORT=80

nopt:
	true
run:
	python app.py --host $(HOST) --port $(PORT) --favicon $(FAVICON)
