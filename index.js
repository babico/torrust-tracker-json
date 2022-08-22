const axios = require("axios"),
      fs = require('fs');

// Edit with your link and location of json file
var link = 'http://xxx.xxx.xxx.xxx:1212/api/stats?token=MyAccessToken',
    json_loc = './tracker.json';

axios
    .get(link)
    .then((response) => {
        let json_text = JSON.stringify(response.data);

        let json = JSON.parse( // edit your starting date as epoch ms
            '{"date":' + Date.now().toString() + ',"uptime":' + (Date.now() - 1661190707000).toString() + ',' + json_text.slice(1)
        );

        checkFile(json);
    })
    .catch((error) => {
        console.log(error);
        a = {
            date: Date.now().toString(),uptime: 0,
            torrents: 0,seeders: 0,completed: 0,leechers: 0,
            tcp4_connections_handled: 0,tcp4_announces_handled: 0,tcp4_scrapes_handled: 0,
            tcp6_connections_handled: 0,tcp6_announces_handled: 0,tcp6_scrapes_handled: 0,
            udp4_connections_handled: 0,udp4_announces_handled: 0,udp4_scrapes_handled: 0,
            udp6_connections_handled: 0,udp6_announces_handled: 0,udp6_scrapes_handled: 0
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
