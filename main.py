import os.path

import cherrypy
from jinja2 import Environment, FileSystemLoader

env = Environment( loader=FileSystemLoader('templates' ))

class Root(object):

	@cherrypy.expose
	def rgb(self):
	        template = env.get_template('rgb_sliders.html')
		return template.render()

	@cherrypy.expose
	def index(self):
	        template = env.get_template('color_picker.html')
		return template.render()
	
cherrypy.config.update("main.conf")
cherrypy.server.unsubscribe()
cherrypy.engine.start()

wsgiapp = cherrypy.tree.mount(Root())
