const express = require('express');
const path = require('path');
const routes = require('./routes');
const sequelize = require('./config/connection');

const helpers = require('./utils/helper');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const session = require('express-session');

const PORT = process.env.PORT || 3001;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const ses = {
  secret: 'secret',
  cookie: { maxAge: 36000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
app.use(session(ses));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);


sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })