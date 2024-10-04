/// <reference path="./envs.d.ts" />

import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(__dirname, "../../../../.env") });

export const envs = {
  AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID,
  GITHUB_REF: process.env.GITHUB_REF_NAME,
  STACK_NAME: process.env.STACK_NAME,
  AWS_REGION: process.env.AWS_REGION,
  STAGE: process.env.STAGE,
  MONGO_URI: process.env.MONGO_URI,
  EMAIL_LOGIN: process.env.EMAIL_LOGIN,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  AWS_COGNITO_USER_POOL_ID_DEV: process.env.AWS_COGNITO_USER_POOL_ID_DEV,
  AWS_COGNITO_USER_POOL_ID_PROD: process.env.AWS_COGNITO_USER_POOL_ID_PROD,
  AWS_COGNITO_USER_POOL_ID_HOMOLOG: process.env.AWS_COGNITO_USER_POOL_ID_HOMOLOG,
  CLOUD_FRONT_URL_DEV: process.env.CLOUD_FRONT_URL_DEV,
  CLOUD_FRONT_URL_PROD: process.env.CLOUD_FRONT_URL_PROD,
  CLOUD_FRONT_URL_HOMOLOG: process.env.CLOUD_FRONT_URL_HOMOLOG,
  CLOUD_FRONT_URL: process.env.CLOUD_FRONT_URL
};
