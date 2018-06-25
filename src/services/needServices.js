import request from 'superagent';
// Actions
import {
    api_needs_url,
    getAuthInformations
} from "./baseServices";


export function listNeed(onComplete) {
    var auth_informations = getAuthInformations();

    return request
        .get(api_needs_url)
        .set("Authorization", "TOKEN " + auth_informations.auth_token)
        .type("application/json")
        .accept("application/json")
        .end((error, response) => {
            onComplete(response);
        });
}

export function createNeed(data, onComplete) {
    /*
      data = {
        title: "In need of electricity",
        description: "We have no electricity at home. We need a generator. Old or new, doesn't matter. I'm not going to pay.",
        address: "Princess Beatrinastreet 13",
        end_date: "1999-03-14",
        is_fixed: true
      }
    */

    var auth_informations = getAuthInformations();

    return request
        .post(api_needs_url)
        .set("Authorization", "TOKEN " + auth_informations.auth_token)
        .type("application/json")
        .accept("application/json")
        .send({
            title: data["title"],
            description: data["description"],
            address: data["address"],
            end_date: data["end_date"],
            is_fixed: data["is_fixed"],
            categories: data["categories"],
            lat: data["lat"],
            long: data["long"]
        })
        .end(function (error, response) {
            onComplete(response);
        });
}

export function retrieveNeed(need_id, onComplete) {
    var auth_informations = getAuthInformations();

    return request
        .get(api_needs_url + need_id + '/')
        .set("Authorization", "TOKEN " + auth_informations.auth_token)
        .type("application/json")
        .accept("application/json")
        .end((error, response) => {
            onComplete(response);
        });
}

export function updateNeed(need_id, data, onComplete) {
    /*
      data = {
        title: "In need of laptops.",
        description: "We have no laptops at home. We need a laptop. Old or new, doesn't matter. I'm not going to pay.",
        address: "Prinses Irenestraat 13",
        end_date: "1999-03-14",
        is_fixed: false
      }
    */

    var auth_informations = getAuthInformations();

    return request
        .put(api_needs_url + need_id + '/')
        .set("Authorization", "TOKEN " + auth_informations.auth_token)
        .type("application/json")
        .accept("application/json")
        .send(data)
        .end(function (error, response) {
            onComplete(response);
        });
}

export function deleteNeed(need_id, onComplete) {
    var auth_informations = getAuthInformations();

    return request
        .del(api_needs_url + need_id + '/')
        .set("Authorization", "TOKEN " + auth_informations.auth_token)
        .type("application/json")
        .accept("application/json")
        .end((error, response) => {
            onComplete(response);
        });
}
