const axios = require("axios"),
    fs = require('fs');

// Edit with your link and location of json file
var link = 'http://158.101.161.60:1313/api/stats?token=verysecrettoken3131',
    json_loc = './tracker-axum.json';
	
axios
    .get(link)
    .then((response) => {
        let json = JSON.parse(JSON.stringify(response.data));
    
        checkFile(json);
    })
    .catch((error) => {
		console.log(error);
		a = {
			date: Date.now().toString(),uptime:0,
			torrents:0,seeders:0,completed:0,leechers:0,
			tcp4_connections_handled:0,tcp4_announces_handled:0,tcp4_scrapes_handled:0,
			tcp6_connections_handled:0,tcp6_announces_handled:0,tcp6_scrapes_handled:0,
			udp4_connections_handled:0,udp4_announces_handled:0,udp4_scrapes_handled:0,
			udp6_connections_handled:0,udp6_announces_handled:0,udp6_scrapes_handled:0
		};
        checkFile(a);
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
