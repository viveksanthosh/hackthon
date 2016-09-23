var fs = require('fs');


fs.writeFileSync('./graph.json', JSON.stringify({
    "Process": {
        "field": [],
        "value": []
    },
    "Navigation": {
        "field": [],
        "value": []
    },
    "Product": {
        "field": [],
        "value": []
    },
    "Delivery": {
        "field": [],
        "value": []
    }
}), 'utf-8');
