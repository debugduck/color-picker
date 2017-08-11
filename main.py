import os.path

import cherrypy
from jinja2 import Environment, FileSystemLoader

env = Environment( loader=FileSystemLoader('templates' ))

class Main(object):

	@cherrypy.expose
	def rgb(self):
	        template = env.get_template('rgb_sliders.html')
		return template.render()

	@cherrypy.expose
	def index(self):
	        template = env.get_template('color_picker.html')
		return template.render()
	
if __name__ == '__main__':
	conf = {
		'/': {
		    'tools.sessions.on': True,
		    'tools.staticdir.root': os.path.abspath(os.getcwd())
		},
		'/templates': {
		    'tools.staticdir.on': True,
		    'tools.staticdir.dir': 'templates'
		},
		'/static': {
		    'tools.staticdir.on': True,
		    'tools.staticdir.dir': 'images'
		},
		'/js': {
		    'tools.staticdir.on': True,
		    'tools.staticdir.dir': 'js'
		}
	}
	cherrypy.quickstart(Main(), '/', conf)
