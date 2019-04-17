"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const logger_1 = require("../logger");
const driverProvider_1 = require("./driverProvider");
logger_1.Logger.setWrite(2, 'lambda_protractor.log');
const lambdaRestClient = require('@kanhaiyalalsingh/lambdatest');
let logger = new logger_1.Logger('lambdatest');
class LambdaTest extends driverProvider_1.DriverProvider {
    constructor(config) {
        super(config);
    }
    /**
     * Hook to update the LambdaTest job status.
     * @public
     * @param {Object} update
     * @return {Promise} A promise that will resolve when the update is complete.
     */
    updateJob(update) {
        let mappedDrivers = this.drivers_.map((driver) => __awaiter(this, void 0, void 0, function* () {
            const session = yield driver.getSession();
            const statusObj = {
                status_ind: update.passed ? 'passed' : 'failed',
            };
            this.lambdaAutomationClient.updateSessionById(session.getId(), statusObj, (error) => {
                if (error) {
                    throw new Error('Error while updating LambdaTest passed/failed status: ' + util.inspect(error));
                }
            });
        }));
        return Promise.all(mappedDrivers);
    }
    /**
     * Configure and launch (if applicable) the object's environment.
     * @return {promise} A promise which will resolve when the environment is
     *     ready to test.
     */
    setupDriverEnv() {
        return __awaiter(this, void 0, void 0, function* () {
            this.config_.capabilities['user'] = this.config_.lambdaUsername;
            this.config_.capabilities['accessKey'] = this.config_.lambdaAccessKey;
            this.config_.seleniumAddress = 'http://hub.lambdatest.com/wd/hub';
            this.lambdaAutomationClient = lambdaRestClient.AutomationClient({ username: this.config_.lambdaUsername, accessKey: this.config_.lambdaAccessKey });
            // Append filename to capabilities.name so that it's easier to identify
            // tests.
            this.config_.capabilities.name = this.config_.capabilities.name || '';
            this.config_.capabilities.name +=
                (':' + this.config_.specs.toString().replace(/^.*[\\\/]/, ''));
            logger.info(`Using LambdaTest selenium server at ${this.config_.seleniumAddress}`);
        });
    }
}
exports.LambdaTest = LambdaTest;
//# sourceMappingURL=lambdaTest.js.map