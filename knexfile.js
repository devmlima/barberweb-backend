// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'barberiaweb.cvjbmiv4gauk.us-east-1.rds.amazonaws.com',
      database: 'db_barbearia',
      user:     'devmlima',
      password: 'm.30861383'
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host: 'barberiaweb.cvjbmiv4gauk.us-east-1.rds.amazonaws.com',
      database: 'db_barbearia',
      user:     'devmlima',
      password: 'm.30861383'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: 'barberiaweb.cvjbmiv4gauk.us-east-1.rds.amazonaws.com',
      database: 'db_barbearia',
      user:     'devmlima',
      password: 'm.30861383'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  }

};
