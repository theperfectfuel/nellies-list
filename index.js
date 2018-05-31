import express from 'express';
import expressHbs from 'express-handlebars';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import router from './routes/routes';

const PORT = process.env.PORT || "8080";
const DBUrl = process.env.DBUrl || 'mongodb://localhost:27017/todos';
const app = express();

mongoose.connect(DBUrl, () => {
    console.log('DB connected');
});

app.engine('hbs', expressHbs({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);

let server;

function runServer() {
    return new Promise((resolve, reject) => {
        server = app.listen(PORT, () => {
            console.log(`server listening on port: ${PORT}`);
            resolve(server);
        })
        .on('error', err => {
            reject(err);
        })
    })
}

function closeServer() {
    return new Promise((resolve, reject) => {
        console.log('closing the server');
        server.close(err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        })
    })
}

if (require.main === module) {
    runServer().catch(err => console.log(err));
}

module.exports = {app, runServer, closeServer};