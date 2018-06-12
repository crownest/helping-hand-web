import request from 'superagent';
// Actions
import {
  api_auth_login_url
} from "./baseServices";


export function authLogin(data, onComplete) {
  /*
    data = {
      email: "crownest@unicrow.com"
      password: "123456c"
    }
  */

  return request
    .post(api_auth_login_url)
    .type("application/json")
    .accept("application/json")
    .send(data)
    .end(function(error, response) {
      onComplete(response);
    });
}
