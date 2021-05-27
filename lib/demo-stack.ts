import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
export class DemoStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const greetingsLambda = new lambda.Function(this, "greetings-lambda", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: "greetings.handler"
    });

    new apigateway.LambdaRestApi(this, "greetings-api", {
      handler: greetingsLambda,
      deploy: true
    });
  }
}
