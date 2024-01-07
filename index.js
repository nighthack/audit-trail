"use strict";
const repository  = new (require("./src/ElasticRepository"))();
const {DateTime} = require("luxon");

const trail = async (message, action, meta = {}) => {
    const payload = {
        service: process.env.APP_NAME || "audit-trail",
        message,
        action,
        ...meta,
        timestamp: DateTime.local().toMillis()
    };

    console.log("Payload to elastic search", payload);

    return repository.create(payload);
};


let customQuery = async (body) => {
    return await repository.search(body);
};

let fetch = async (query, from, size, keyword) => {
    let body = {query: {bool:{}}}, must = [];
    must = repository.appendMultiplePropertyMatch(query);
    if (from && size) {
        body.from = from;
        body.size = size;
    }
    body.query.bool = {
        must
    };

    return await repository.search(body);
};

let deleteIndex = async () => {
    return repository.deleteIndex();
};
module.exports = {
    trail,
    fetch,
    customQuery,
    deleteIndex
};