import cherrypy
import sys
import os


class ColorPicker(object):
	@cherrypy.expose
	def index(self):
		return open('templates/color_picker.html')
	
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
	cherrypy.quickstart(ColorPicker(), '/', conf)
