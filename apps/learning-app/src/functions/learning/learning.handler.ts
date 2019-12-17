import { Handler, Context } from 'aws-lambda';
import { getMessage } from '@nx-lambda-liquibase/common-util';

export const handler: Handler = async (event: any, context: Context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: getMessage() })
  };
};
