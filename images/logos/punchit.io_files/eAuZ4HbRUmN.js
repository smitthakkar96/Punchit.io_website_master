/*!CK:3789538831!*//*1440515623,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["zaYlw"]); }

__d('UFICommentSubscription',['CommentCreateSubscriptionWebGraphQLQuery','BaseGraphQLSubscription','uuid'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k=babelHelpers._extends({},i,{_getTopic:function(l){return 'graphql/comment_create_subscribe;feedback_id_'+l;},_getQueryID:function(){return h.getQueryID();},_getQueryParameters:function(l){return {input:JSON.stringify({client_subscription_id:j(),feedback_id:l})};},_getSubscriptionCallName:function(){return 'comment_create_subscribe';}});f.exports=k;},null);