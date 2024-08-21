/* eslint-disable @typescript-eslint/no-explicit-any */
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import {
  Resource,
  LambdaIntegration,
  CognitoUserPoolsAuthorizer,
} from "aws-cdk-lib/aws-apigateway";
import { Duration } from "aws-cdk-lib";
import * as path from "path";
import { envs } from "../../src/envs";
import { stage } from "../utils/generate_stage";

export class LambdaStack extends Construct {
  functionsThatNeedCognitoPermissions: lambda.Function[] = [];
  sharedLayer: lambda.LayerVersion;
  libLayer: lambda.LayerVersion;
  prismaLayer: lambda.LayerVersion;

  createLambdaApiGatewayIntegration(
    moduleName: string,
    method: string,
    mssApiResource: Resource,
    environmentVariables: Record<string, any>,
    authorizer?: CognitoUserPoolsAuthorizer
  ): lambda.Function {
    const modifiedModuleName = moduleName
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    console.log(
      `Creating lambda function for ${modifiedModuleName} in stage ${stage}`
    );
    console.log(
      `Environment variables for ${modifiedModuleName}: ${JSON.stringify(
        environmentVariables
      )}`
    );
    const lambdaFunction = new lambda.Function(this, modifiedModuleName, {
      functionName: `${modifiedModuleName}-AppROLEMss-${stage}`,
      // need to take ../../src/modules/${moduleName} to get the correct path
      code: lambda.Code.fromAsset(
        path.join(__dirname, `../../src/modules/${moduleName}`)
      ),
      handler: `app.${moduleName}_presenter.lambda_handler`,
      runtime: lambda.Runtime.PYTHON_3_11,
      layers: [this.sharedLayer, this.libLayer, this.prismaLayer],
      environment: environmentVariables,
      timeout: Duration.seconds(30),
      memorySize: 256,
    });

    mssApiResource
      .addResource(moduleName.toLowerCase().replace(/_/g, "-"))
      .addMethod(
        method,
        new LambdaIntegration(lambdaFunction),
        authorizer
          ? {
              authorizer: authorizer,
            }
          : undefined
      );
    return lambdaFunction;
  }

  constructor(
    scope: Construct,
    apiGatewayResource: Resource,
    environmentVariables: Record<string, any>,
    authorizer: CognitoUserPoolsAuthorizer
  ) {
    super(scope, `AppROLEMss-LambdaStack-${stage}`);

    this.sharedLayer = new lambda.LayerVersion(
      this,
      `AppROLEMssSharedLayer-${stage}`,
      {
        code: lambda.Code.fromAsset(path.join(__dirname, "../shared")),
        compatibleRuntimes: [lambda.Runtime.PYTHON_3_11],
      }
    );

    this.libLayer = new lambda.LayerVersion(
      this,
      `AppROLEMssLibLayer-${stage}`,
      {
        code: lambda.Code.fromAsset(path.join(__dirname, "../requirements")),
        compatibleRuntimes: [lambda.Runtime.PYTHON_3_11],
      }
    );

    this.functionsThatNeedCognitoPermissions = [];
  }
}
