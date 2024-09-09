import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { S3Stack } from "./s3_stack";
import { Construct } from "constructs";
import { stage } from "../get_stage_env";
import { LambdaStack } from "./lambda_stack";
import { Stack, StackProps } from "aws-cdk-lib";
import { envs } from "../../../src/shared/helpers/envs/envs";
import { Cors, RestApi } from "aws-cdk-lib/aws-apigateway";

export class IacStack extends Stack {
  constructor(scope: Construct, constructId: string, props?: StackProps) {
    super(scope, constructId, props);

    const restApi = new RestApi(this, `${envs.STACK_NAME}-RestAPI`, {
      restApiName: `${envs.STACK_NAME}-RestAPI`,
      description: "This is the REST API for the AppRole Event MSS Service.",
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowHeaders: ["*"],
      },
    });

    const apigatewayResource = restApi.root.addResource("mss-role-event", {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
    });

    const environmentVariables = {
      STAGE: stage,
      NODE_PATH: "/var/task:/opt/nodejs",
      EMAIL_LOGIN: envs.EMAIL_LOGIN,
      EMAIL_PASSWORD: envs.EMAIL_PASSWORD,
      MONGO_URI: envs.MONGO_URI,
    };

    const lambdaStack = new LambdaStack(
      this,
      apigatewayResource,
      environmentVariables
    );
  }
}
