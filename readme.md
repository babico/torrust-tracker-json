# torrust-tracker-json

This is a json data extractor made with node.js for Torrust Tracker by Torrust..

# Install

Program require Nodejs.

1. Download code with `git clone https://github.com/babico/torrust-tracker-json.git`
2. Enter downloading folder `cd torrust-tracker-json`
3. Setup Node.js modules with `npm install`
4. Edit `index.js` with your informations.
5. For first time running and testing code `node index.js`
6. And `cat tracker.json` ta daaaaa.

After all these if you want, you can open it to the internet with a web server (like nginx, apache).

# Setting Crontab

Setting crontab for every 5 minute.

1. Enter crontab editing `crontab -e`
2. Add this `*/5 * * * * /usr/bin/node /<use all location>/torrust-tracker-json/index.js` line with your location
