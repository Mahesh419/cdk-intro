import * as cdk from '@aws-cdk/core';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import { SimpleSynthAction, CdkPipeline } from "@aws-cdk/pipelines";
import { SecretValue } from '@aws-cdk/core';

export class DemoPipelineStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const sourceArtifact = new codepipeline.Artifact(); 
        
        const cloudAssemblyArtifact = new codepipeline.Artifact();

        new CdkPipeline(this, 'dev-pipeline', {
            pipelineName: 'cdk-demo-pipeline',
            cloudAssemblyArtifact,

            sourceAction: new codepipeline_actions.GitHubSourceAction({
                actionName: 'Github', 
                output: sourceArtifact, 
                oauthToken: SecretValue.secretsManager('github-token'),
                owner: 'Mahesh419',
                repo: 'cdk-intro', 
            }),

            synthAction: SimpleSynthAction.standardNpmSynth({
                sourceArtifact, 
                cloudAssemblyArtifact, 
                buildCommand: 'npm run build'
            })
        })

    }
}