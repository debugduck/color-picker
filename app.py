#!/usr/bin/python
'''
color-picker server
'''
import argparse
import os.path

import cherrypy
from jinja2 import Environment, FileSystemLoader

ENV = Environment(loader=FileSystemLoader('templates'))

class Root(object):
    '''
    root object of cherrypy
    '''
    @cherrypy.expose
    def index(self):
        '''
        index page
        '''
        template = ENV.get_template('color_picker.html')
        return template.render()

    @cherrypy.expose
    def rgb(self):
        '''
        rgb sliders page
        '''
        template = ENV.get_template('rgb_sliders.html')
        return template.render()

    @cherrypy.expose
    def schemes(self):
        '''
        schemes page
        '''
        template = ENV.get_template('schemes.html')
        return template.render()

def main():
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument("--port", type=int, help="Port to attach to")
    parser.add_argument("--host", help="Host to serve from")
    parser.add_argument("--favicon", help="Path to the favicon (must be an absolute path)")
    args = parser.parse_args()
    
    CONF = {
        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': os.path.abspath(os.getcwd())
        },
    	'/favicon.ico': {
            'tools.staticfile.on': True,
            'tools.staticfile.filename': args.favicon
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
            'server.socket_host': args.host,
            'server.socket_port': args.port
        },
    }
    cherrypy.quickstart(Root(), '/', CONF)

main()
