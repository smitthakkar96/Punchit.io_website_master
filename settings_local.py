from parse_rest.connection import register
def initParse(sessionToken=None):
	print "init"
	if sessionToken == None:
		register('Y4Txek5e5lKnGzkArbcNMVKqMHyaTk3XR6COOpg4','nJOJNtVr1EvNiyjo6F6M8zfiUdzv8lPx31FBHiwO',master_key=None)
	else:
		register('Y4Txek5e5lKnGzkArbcNMVKqMHyaTk3XR6COOpg4','nJOJNtVr1EvNiyjo6F6M8zfiUdzv8lPx31FBHiwO',session_token=sessionToken)
