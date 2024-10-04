declare namespace NodeJS {
    interface ProcessEnv {
      AWS_ACCOUNT_ID: string;
      GITHUB_REF_NAME: string;
      STACK_NAME: string;
      AWS_REGION: string;
      STAGE: string;
      MONGO_URI: string;
      COGNITO_USER_POOL_ID: string;
      COGNITO_CLIENT_ID: string;
      S3_BUCKET_NAME: string;
      CLOUDFRONT_DISTRO: string;
      AWS_COGNITO_USER_POOL_ID_DEV: string;
      AWS_COGNITO_USER_POOL_ID_PROD: string;
      AWS_COGNITO_USER_POOL_ID_HOMOLOG: string;
      CLOUD_FRONT_URL_DEV: string;
      CLOUD_FRONT_URL_PROD: string;
      CLOUD_FRONT_URL_HOMOLOG: string;

    }
  }