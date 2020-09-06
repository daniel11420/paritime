let twitter = require('twitter');
import * as keys from './keys.json';
let lastReplied: string = "000000000000000000";

let client = new twitter({
    consumer_key: keys["api"],
    consumer_secret: keys["api-secret"],
    access_token_key: keys["access"],
    access_token_secret: keys["access-secret"]
});

function run() {
    client.get('statuses/user_timeline', {
        screen_name: keys["user-to-tell-time-to"],
        count: 1
    }, function(error, response) {
        if(error) throw error;
        if (lastReplied == "000000000000000000") {
            lastReplied = response[0].id_str;
            console.log("Skipping tweet, lastReplied was 0");
        } else if (response[0].id_str = lastReplied) {
            console.log("Skipping tweet, already replied");
        } else {
            lastReplied = response[0].id_str;
            reply(response[0].id_str);
        }
    });
}

function reply(id: string) {
    let current_time: string = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
    client.post('statuses/update', {
        status: `@${keys["user-to-tell-time-to"]} The time is ${current_time}.`,
        in_reply_to_status_id: id
    }, function(error, tweet, response) {
        if(error) throw error;
        console.log("Tweeted: " + tweet);
    })
}

run();