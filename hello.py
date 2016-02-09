from parse_rest.user import User
import settings_local
from flask import Flask,request,redirect, url_for ,render_template,send_from_directory,session,make_response
from parse_rest.connection import SessionToken, register
from parse_rest.datatypes import Function
import json,httplib
import os
from flask.ext.triangle import Form,Triangle
from flask.ext.triangle.widgets.standard import TextInput
from datetime import timedelta
from flask import session, app
import os
import pusher
import getPost

settings_local.initParse()
app = Flask(__name__)
Triangle(app)
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['SERVER_NAME'] = 'www.punchit.io'

@app.before_request
def make_session_permanent():
    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=46440)
    if 'hack404' == request.host[:-len(app.config['SERVER_NAME'])].rstrip('.'):
        redirect(url_for('Hack404'))


@app.route('/',methods=['GET', 'POST'])
def index():
 #	settings_local.initParse()
	# if request.method == 'POST' and request.form["what"]== 'Login':
	# 	try:
	# 		print request.form["password"]
	# 		u = User.login(request.form["username"],request.form["password"])
	# 		session['session_token'] = u.sessionToken
	# 		resp = make_response(render_template("index.html"))
	# 		return resp
	# 	except:
	# 		return render_template('login.html',error="Invalid username or password")
	# elif request.method == 'POST' and request.form["what"]=='SignUp':
	# 	email = request.form["email"]
	# 	password = request.form["password"]
	# 	ninja = request.form["ninja"]
	# 	birthdate = request.form["birthdate"]
	# 	u = User.signup(email,password)
	# 	u.email=email
	# 	u.save()
	# 	# proPic.save(os.path.join(app.config['UPLOAD_FOLDER']),"userdp.png")
		# connection = httplib.HTTPSConnection('api.parse.com', 443)
		# connection.connect()
		# connection.request('POST', '/1/files/profilePic.png', open('userdp.png', 'rb').read(), {
		# "X-Parse-Application-Id": "${Y4Txek5e5lKnGzkArbcNMVKqMHyaTk3XR6COOpg4}",
		# "X-Parse-REST-API-Key": "${nJOJNtVr1EvNiyjo6F6M8zfiUdzv8lPx31FBHiwO}",
		# "Content-Type": "image/png"
		# })
		# result = json.loads(connection.getresponse().read())
		# print result
		# connection.request('POST', '/1/classes/_User', json.dumps({
		# "username": email,
		# "picture": {
		#  "name": "profilePic.png",
		#  "__type": "File"
		# }
		# }), {
		# "X-Parse-Application-Id": "${Y4Txek5e5lKnGzkArbcNMVKqMHyaTk3XR6COOpg4}",
		# "X-Parse-REST-API-Key": "${nJOJNtVr1EvNiyjo6F6M8zfiUdzv8lPx31FBHiwO}",
		# "Content-Type": "application/json"
		# })
		# result = json.loads(connection.getresponse().read())
		# print result
	# 	session['session_token'] = u.sessionToken
	# 	resp = make_response(render_template("index.html"))
	# 	return u.sessionToken
	# else:
	# 	if session.get('session_token') is None:
	# 		print "nohhh"
	# 		return render_template('login.html')
	# 	else:
	# 		print "yes"
	# 		return render_template('index.html')
	return render_template('Error.html')

@app.route('/Hack404')
def hackathon():
    return render_template('hackathon.html')

@app.route('/js/<path:path>')
def send_js(path):
	print path
	return send_from_directory('js', path)

@app.route('/assets')
def send_from_assets():
    print path
    return send_from_directory('assets', path)

@app.route('/mobileLogin')
def mobileLogin():
    if session.get('session_token') is None:
        return render_template('mlogin.html')

@app.route('/css/<path:path>')
def send_css(path):
	print path
	return send_from_directory('css', path)

@app.route('/font/<path:path>')
def send_font(path):
	print path
	return send_from_directory('font', path)

@app.route('/NewUpdate/<objectId>')
def NewUpdate(objectId):
    p = pusher.Pusher(app_id='173885',key='2f8f1cab459e648a27fd',secret='80905f147470664954bd',ssl=True,port=443)
    p.trigger('PostChannel', 'NewUpdate', {'message': objectId})
    return "success"


@app.route('/images/<path:path>')
def send_images(path):
	print path
	return send_from_directory('images', path)

@app.route('/Icons/<path:path>')
def Icons(path):
	print path
	return send_from_directory('Icons', path)

@app.route('/logout')
def logout():
	# session.Abandon()
	session.clear()
	return redirect(url_for('index'))

def GetCurrentUser():
	token = session.get('session_token')
	settings_local.initParse(token)
	me = User.current_user()
	return me

@app.route('/setSession/<path:path>')
def setSession(path):
	session['session_token'] = path
	return render_template('index.html')

@app.route('/GetSessionToken')
def GetSessionToken():
	token = session.get('session_token')
	return str(token)

@app.route('/GetUserInterests')
def GetUserInterests():
	d = []
	GetCurrentUser()
	user_interest_function = Function("GetUserIntrest")
	d = user_interest_function()
	return json.dumps(d)

@app.route('/Profile')
def Profile():
    if session.get('session_token') != None:
        return render_template('profile.html')
    else:
        return render_template('login.html')

@app.route('/Select_Interests')
def Select_Interests():
    if session.get('session_token') != None:
        return render_template('Settings.html')
    else:
        return render_template('login.html')

@app.route('/share/<path:path>')
def share(path):
    SinglePost = getPost.getSinglePost(path)
    return render_template('Posts.html',SinglePost=SinglePost)

@app.route('/Settings')
def Settings():
	return render_template('Settings.html')

@app.route('/download')
def download():
	return render_template('Error.html')

port = int(os.environ.get('PORT', 5000))
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
app.run(host="0.0.0.0",debug=True,port=port)


# font images)


#font images
