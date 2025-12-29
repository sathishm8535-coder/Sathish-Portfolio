import http.server
import socketserver
import webbrowser
import os
import threading
import time

PORT = 3000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/home.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

def open_browser():
    time.sleep(1)  # Wait for server to start
    webbrowser.open(f'http://localhost:{PORT}')

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 Portfolio server running at http://localhost:{PORT}/")
        print("📱 Opening browser automatically...")
        
        # Open browser in a separate thread
        threading.Thread(target=open_browser, daemon=True).start()
        
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped!")
            httpd.shutdown()