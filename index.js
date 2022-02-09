const querystring = require('querystring');
const core = require('@actions/core');
const https = require('https');

function Post(data, host, headers) {
    const opt = {
        method: 'POST',
        headers: headers,
        rejectUnauthorized: false,
        timeout: 30000
    };

    let requestCallback = (resolve) => {
        return (result) => {
            const encoding = result.headers['content-encoding'];
            if (encoding === 'undefined') {
                result.setEncoding('utf-8');
            }
            let chunks = '';
            result.on('data', function (chunk) {
                try {
                    chunks += (chunk);
                } catch (e) {
                    console.log(e);
                }
            }).on('end', function () {
                if (chunks !== undefined && chunks != null) {
                    resolve(chunks);
                } else {
                    // 请求获取不到返回值
                    resolve(host + "ERROR");
                }
            })
        }
    };
    return new Promise((resolve, reject) => {
        let cb = requestCallback(resolve);
        const req = https.request(host, opt, cb);
        req.on('error', function (e) {
            // request请求失败
            console.log(host + 'ERROR: ' + e.message);
            reject("0");
        });
        req.write(data);
        req.end();
    });
}


async function run() {
    try {
        const data = {
            text: core.getInput('text', {required: true}),
            desp: core.getInput('desp'),
            channel: core.getInput('channel')
        };
        if(!data.channel){
            delete data.channel;
        }
        const postData = querystring.stringify(data);

        const sendkey = core.getInput('sendkey', {required: true});
        return Post(postData, `https://sctapi.ftqq.com/${sendkey}.send`, {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }, 'https');
    }
    catch (error) {
        console.log(error);
    }
}
run();
