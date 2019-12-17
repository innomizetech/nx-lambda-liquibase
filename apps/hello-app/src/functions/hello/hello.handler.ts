import { Handler, Context } from 'aws-lambda';
import * as serverlessMysql from 'serverless-mysql';

const mysql: serverlessMysql.ServerlessMysql = serverlessMysql({
  config: {
    host: 'db.example.com',
    database: 'hiep_hello',
    user: 'root',
    password: 'password'
  }
});

export const handler: Handler = async (event: any, context: Context) => {
   // Run your query
   const results = await mysql.query('SELECT * FROM users')

   // Run clean up function
   await mysql.end()

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(results)
  };
};
