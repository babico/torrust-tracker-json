const axios = require("axios"),
      fs = require('fs');

// Edit with your link and location of json file
var link = 'http://xxx.xxx.xxx.xxx:1212/api/stats?token=MyAccessToken',
    json_loc = './tracker-axum.json';
	
axios
    .get(link)
    .then((response) => {
		let json_text = JSON.stringify(response.data);

        let json = JSON.parse( 				// edit your starting date as epoch ms
            '{"date":' + Date.now().toString() + ',' + json_text.slice(1)
        );
        checkFile(json);
		
    })
    .catch((error) => {
		console.log(error);
		blank = {
			started: 0,
            timestamp_run_save: 0,timestamp_run_timeout: 0,timestamp_run_console: 0,timestamp_run_keys_timeout: 0,
            torrents: 0,torrents_updates: 0,torrents_shadow: 0,
            seeds: 0,peers: 0,completed: 0,
            whitelist_enabled: false,whitelist: 0,blacklist_enabled: false,blacklist: 0,
            keys_enabled: false,keys: 0,
            tcp4_connections_handled: 0,tcp4_api_handled: 0,tcp4_announces_handled: 0,tcp4_scrapes_handled: 0,
            tcp6_connections_handled: 0,tcp6_api_handled: 0,tcp6_announces_handled: 0,tcp6_scrapes_handled: 0,
            udp4_connections_handled: 0,udp4_announces_handled: 0,udp4_scrapes_handled: 0,
            udp6_connections_handled: 0,udp6_announces_handled: 0,udp6_scrapes_handled: 0
		};
        checkFile(blank);
    });
function checkFile(obj_) {
        if (fs.existsSync(json_loc)) {
            fs.readFile(json_loc, 'utf8', function(err, data) {
                if (err)
                    console.log(err);

                if (data.length == 0) {
                    fs.writeFile(json_loc, '{"data": []}', 'utf8', function(err, data) {
                        if (err)
                            console.log(err);
                    })
                    toJson(obj_);
                } else {
                    toJson(obj_);
                }
            });
        } else {
            fs.writeFile(json_loc, '{"data": []}', 'utf8', function(err, data) {
                if (err)
                    console.log(err);
            })
            toJson(obj_);
        }
}

function toJson(obj_) {
    fs.readFile(json_loc, 'utf8', function(err, data) {
        if (err)
            console.log(err);

        var obj = JSON.parse(data);
        obj.data.push(obj_);

        json = JSON.stringify(obj);
        fs.writeFile(json_loc, json, 'utf8', function(err, data) {
            if (err)
                console.log(err);
        });
    })
}
