'use strict';

let request = require('request'),
    Promise = require('bluebird');

const getMethord = (url, accessToken, body) => {

    var headers = {
        "Content-type": "application/json",
        "Accept": "application/json",
    };

    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: "PUT",
            json: true,
            headers: headers,
            body: body
        }, (err, response)=> {
            if (err) {
                console.log(err);
                reject(err);
            } else if (response.statusCode < 200 || response.statusCode >= 300) {
                err = new Error(`Response with status: ${response.statusCode}: ${response.body}`);
                err.statusCode = response.statusCode;
                reject(err);
            } else {
                resolve(response);
            }
        });
    });

};

export default getMethord;