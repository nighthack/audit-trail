"use strict";
require("dotenv").config({});
const audit = require("../index");
describe('# Test Save into elasticsearch', function () {
    it('should save the payload', async function () {
        jest.setTimeout(50000);
        const payload = await audit.trail("An Activity Occurred", "Activity");
        expect(payload.statusCode).toBe(201);
        expect(payload.body._index).toBe(process.env.AUDIT_INDEX);
        expect(payload.body.result).toBe("created");
        console.log(JSON.stringify(payload));
    });
});


describe('# Test Fetch trail from ES', function () {
    it('should fetch the payload using a required query', async function () {
        const payload = await audit.fetch({}, 0, 50);
        expect(payload.data).toBeDefined();
        expect(payload.data.length).toBe(payload.total);
        console.log(JSON.stringify(payload));
    });


    it('should fetch the payload using a custom query', async function () {
        const query = {
            "query": {"bool": {}},
            "from": 0,
            "size": "10",
            "sort": [{"timestamp": {"order": "desc", "unmapped_type": "date"}}]
        };
        const payload = await audit.customQuery(query);
        // console.log("Payload", JSON.stringify(payload), payload.data.length, payload.total);
        //start assert
        expect(payload.data).toBeDefined();
        expect(payload.data.length).toBe(payload.total);
    });
});
