import chalk from 'chalk';
import { extend } from 'lodash';
import pg from 'pg';
import knex from 'knex';
import env from '../env';
import knexFile from './knexFile';
import createUsersTable from './schemas/_init_users';

console.log(chalk.bgBlue('Initialize Knex connection..')); //eslint-disable-line
// const kConfig = knexConfig[env.NODE_ENV];

// extend(knexConfig.pool, {
//   afterCreate(conn, done) {
//     if (env.KNEX_DEBUG) {
//       console.log(chalk.gray(`Knex pool initialized! [knexUid: ${conn.__knexUid}, processID: ${conn.processID}]`)); //eslint-disable-line
//     }
//     done();
//   },
// });

const connection = require('knex')({
  client: knexFile.client,
  connection: knexFile.connection,
  pool: {
    ...knexFile.pool,
    afterCreate: function (conn, done) {
        console.log(chalk.gray(`Knex pool initialized! [knexUid: ${conn.__knexUid}, processID: ${conn.processID}]`)); //eslint-disable-line
        done(conn);
    }
  },
});

// Create Tables
createUsersTable(connection);


export default connection;
