import { Config } from '../config';
import { DriverProvider } from './driverProvider';
export declare class LambdaTest extends DriverProvider {
    lambdaAutomationClient: any;
    constructor(config: Config);
    /**
     * Hook to update the LambdaTest job status.
     * @public
     * @param {Object} update
     * @return {Promise} A promise that will resolve when the update is complete.
     */
    updateJob(update: any): Promise<any>;
    /**
     * Configure and launch (if applicable) the object's environment.
     * @return {promise} A promise which will resolve when the environment is
     *     ready to test.
     */
    protected setupDriverEnv(): Promise<any>;
}
