import request from 'superagent';
// Actions
import {
    api_categories_url,
    getAuthInformations
} from "./baseServices";


export function listCategory(onComplete) {
    var auth_informations = getAuthInformations();

    return request
        .get(api_categories_url)
        .set("Authorization", "TOKEN " + auth_informations.auth_token)
        .type("application/json")
        .accept("application/json")
        .end((error, response) => {
            onComplete(response);
        });
}