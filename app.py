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
	},
		'global': {
			'server.socket_host': '0.0.0.0',
			'server.socket_port': 80},
}
cherrypy.quickstart(Root(), '/', conf)
