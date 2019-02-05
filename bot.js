console.log("Starting post bot....");

var Twit = require('twit');
var array = [];


var T = new Twit({
consumer_key: process.env.key,
consumer_secret:   process.env.secret,
access_token:  process.env.token,
access_token_secret: process.env.token_secret,
})


setInterval(clearArrays, 60*60*1000);
setInterval(searchTweets, 1000*60);



function searchTweets(){

/*
- where slug = list name
- where owner_screen_name = twitter handle of the list
*/

T.get('lists/statuses', { slug: 'botpost', owner_screen_name: 'GamePostingUHC', count: 100, include_rts: false, tweet_mode: 'extended' }, gotData);


}


function clearArrays(){
array = [];
console.log("cleared past tweets!");
}



function gotData(err, data, response){

var offset = 15*60*1000 //20 minutes
var current = new Date()-offset; 
var tweets = data;
	
for(i=0; i < tweets.length; i++){

//variables//
var tweet = tweets[i].full_text
var tweet2 = tweets[i].full_text.toLowerCase()
var twet_date = Date.parse(tweets[i].created_at);
var id = tweets[i].id_str;
	
//variables//

if(twet_date<current){ //tweet is too old!
continue;
}


if(tweet2.indexOf('time.is') >= 0 && !array.includes(id)){
   T.post('statuses/update', { status: tweet }, function(err, data, response) {
	if(err!=null){
	   console.log(err.message);
	}else{
	   console.log("success");
	   array.push(id);
	}
})
}
}

}
