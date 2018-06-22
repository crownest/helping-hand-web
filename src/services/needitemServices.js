import request from 'superagent';
// Actions
import {
    api_needitems_url,
    getAuthInformations
} from "./baseServices";


export function listNeedItem(onComplete) {
    var auth_informations = getAuthInformations();

    return request
        .get(api_needitems_url)
        .set("Authorization", "TOKEN " + auth_informations.auth_token)
        .type("application/json")
        .accept("application/json")
        .end((error, response) => {
            onComplete(response);
        });
}

export function createNeedItem(data, onComplete) {
    /*
      data = {
        name: "Acer Laptop",
        remaining: 10,
        is_fixed: true,
        need: 1
      }
    */

    var auth_informations = getAuthInformations();

    return request
        .post(api_needitems_url)
        .set("Authorization", "TOKEN " + auth_informations.auth_token)
        .type("application/json")
        .accept("application/json")
        .send({
            title: data["title"],
            description: data["description"]
        })
        .end(function (error, response) {
            onComplete(response);
        });
}

export function retrieveNeedItem(needitem_id, onComplete) {
    var auth_informations = getAuthInformations();

    return request
        .get(api_needitems_url + needitem_id + '/')
        .set("Authorization", "TOKEN " + auth_informations.auth_token)
        .type("application/json")
        .accept("application/json")
        .end((error, response) => {
            onComplete(response);
        });
}

export function updateNeedItem(needitem_id, data, onComplete) {
    /*
      data = {
        name: "Acer Laptop",
        remaining: 3,
        is_fixed: false,
        need: 1
      }
    */

    var auth_informations = getAuthInformations();

    return request
        .put(api_needitems_url + needitem_id + '/')
        .set("Authorization", "TOKEN " + auth_informations.auth_token)
        .type("application/json")
        .accept("application/json")
        .send(data)
        .end(function (error, response) {
            onComplete(response);
        });
}

export function deleteNeedItem(needitem_id, onComplete) {
    var auth_informations = getAuthInformations();

    return request
        .del(api_needitems_url + needitem_id + '/')
        .set("Authorization", "TOKEN " + auth_informations.auth_token)
        .type("application/json")
        .accept("application/json")
        .end((error, response) => {
            onComplete(response);
        });
}
