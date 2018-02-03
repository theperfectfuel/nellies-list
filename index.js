import express from 'express';
import expressHbs from 'express-handlebars';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import router from './routes/routes';

const PORT = process.env.PORT || "8080";
const app = express();

app.engine('hbs', expressHbs({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);

app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`);
});
