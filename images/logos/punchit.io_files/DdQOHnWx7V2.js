/*!CK:97048086!*//*1441684666,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["TVKMf"]); }

__d('PaymentTokenProxyUtils',['URI'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i={getURI:function(j){var k=new h('/ajax/payment/token_proxy.php').setDomain(window.location.hostname).setProtocol('https').addQueryData(j),l=k.getDomain().split('.');if(l.indexOf('secure')<0){l.splice(1,0,'secure');k.setDomain(l.join('.'));}return k;}};f.exports=i;},null);