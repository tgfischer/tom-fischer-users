const AWS = require("aws-sdk");

const initiateAuthResponseHandler = result =>
  result.ChallengeName
    ? { session: result.Session }
    : { idToken: result.AuthenticationResult.IdToken };

class UserService {
  get _userPool() {
    return new AWS.CognitoIdentityServiceProvider({
      region: process.env.COGNITO_USER_POOL_REGION
    });
  }

  async initiateAuth({ email, password }) {
    const params = {
      AuthFlow: "ADMIN_NO_SRP_AUTH",
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    };

    const result = await this._userPool.adminInitiateAuth(params).promise();
    return initiateAuthResponseHandler(result);
  }

  async resetTemporaryPassword({ email, password, session }) {
    const params = {
      ChallengeName: "NEW_PASSWORD_REQUIRED",
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
      ChallengeResponses: {
        USERNAME: email,
        NEW_PASSWORD: password
      },
      Session: session
    };

    const result = await this._userPool
      .adminRespondToAuthChallenge(params)
      .promise();
    return result;
  }
}

module.exports = UserService;
