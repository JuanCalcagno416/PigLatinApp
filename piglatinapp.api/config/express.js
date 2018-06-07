import  express     from 'express';
import  bodyParser  from 'body-parser';
import  cors        from 'cors';
import  helmet      from 'helmet';
import  routes      from '../routes/index.js';
import  config      from './config';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use('/api', routes);

export default app;
