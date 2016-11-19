##Helpful Links
- (http://www.rtcmulticonnection.org/docs/)
- (https://github.com/muaz-khan/RTCMultiConnection) 

##States
- 'channels' /channels js/channels/channels.html BroadcastService (found in /common folder)
- 'home' / js/home/home.html HomeService.js
- 'login' /login js/login/login.html  

##BroadcastService
- /browser/js/common/factories/BroadcastService.js
- to use ex:   var channel = new BroadcastService(); 
- all functions are on it's prototype

##Directives
- 'channelList' used w/ js/channels/channel-list.html usage: <channel-list channels='channels'> 
- 'channelDetail' used w/ js/channels/channel-detail.html usage: <channel-detail channel='channel'>
- 'match' js/login/login.directive used on the sign up form to verify passwords match


##Routes 
*channels*
- get('/'
- get('/:id'
- post('/'    < creates using channel info in req.body
- put('/increase/:id
- put('/reduce/:id
- delete('/:id'

*users*
- post('/'  < creates using user object passed in w/ req.body

##Models 
- channel.js name REQUIRED;  
- user.js email REQUIRED;


