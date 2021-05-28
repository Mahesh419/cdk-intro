import { DemoStack } from './demo-stack';
import { Stage, Construct, StageProps } from '@aws-cdk/core';

export class DemoPipelineStage extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        new DemoStack(this, 'WebService');
    }
}