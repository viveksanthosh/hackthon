var fs = require('fs');


fs.writeFileSync('./data.json', JSON.stringify({
    "user": [],
    "bot": [],
    "history": []
}), 'utf-8');
