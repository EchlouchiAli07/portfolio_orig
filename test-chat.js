const http = require('http');

const data = JSON.stringify({
    message: 'bonjour'
});

const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/chat',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);

    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
});

req.on('error', (error) => {
    console.error(`ERROR: ${error.message}`);
});

req.write(data);
req.end();
