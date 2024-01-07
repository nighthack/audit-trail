audit-trail
===========
audit-trail - Activity Saving library for (Node.js)

## Installation
```json
"dependencies": {
  "audit-trail": "~1.0.1" // see the "releases" section
}
```
```npm install audit-trail```
## Requirements
- set the audit index to be created in elasticsearch.
```dotenv
AUDIT_INDEX=audit-index
```
- Set elasticsearch credentials
```dotenv
ELASTICSEARCH_HOST=localhost
ELASTICSEARCH_PORT=9200
ELASTICSEARCH_SCHEME=http
ELASTICSEARCH_USER=
ELASTICSEARCH_PASS=
```
or
```dotenv
ELASTICSEARCH_URL=https://user:password@localhost:9200
```
## Initialization
```javascript
const audit = require('audit-trail');
```

### Basic functionality
- To Save a trail
```javascript
audit.trail("An Activity Occurred", "Activityy", {
    data: "Any Other data"
})
.then(res => console.log(res))
.catch(err => console.log(err));
```
or
```javascript

const res = audit.trail("An Activity Occurred", "Activityy", {
                data: "Any Other data"
});
console.log(res);
///res: {"body":{"_index":"audit-index","_type":"_doc","_id":"24af1b40-e50a-11e9-bf2a-9b8edcf022d8","_version":1,"result":"created","_shards":{"total":2,"successful":2,"failed":0},"_seq_no":6,"_primary_term":1},"statusCode":201,"headers":{"location":"/audit-index/_doc/24af1b40-e50a-11e9-bf2a-9b8edcf022d8","content-type":"application/json; charset=UTF-8","content-length":"194"},"warnings":null,"meta":{"context":null,"request":{"params":{"method":"POST","path":"/audit-index/_doc/24af1b40-e50a-11e9-bf2a-9b8edcf022d8","body":"{\"service\":\"vas-audits\",\"message\":\"An Activity Occurred\",\"action\":\"Activity\",\"userId\":\"\",\"timestamp\":\"2019-10-02T12:45:33.939Z\"}","querystring":"","headers":{"User-Agent":"elasticsearch-js/7.3.0 (darwin 18.7.0-x64; Node.js v12.10.0)","Content-Type":"application/json","Content-Length":"128"},"timeout":30000},"options":{"warnings":null},"id":2},"name":"elasticsearch-js","connection":{"url":"http://localhost:9200/","id":"http://localhost:9200/","headers":{},"deadCount":0,"resurrectTimeout":0,"_openRequests":0,"status":"alive","roles":{"master":true,"data":true,"ingest":true,"ml":false}},"attempts":0,"aborted":false}}
```

-- To get a trail (Using the predefined fetch method)
```javascript
audit.fetch({
    email: "user@user.com",
})
.then(result => {
    console.log(result);
    ///Result: {"total":7,"data":[{"id":"24af1b40-e50a-11e9-bf2a-9b8edcf022d8","service":"vas-audits","message":"An Activity Occurred","action":"Activity","userId":"","timestamp":"2019-10-02T12:45:33.939Z"}]}
})
```

-- To get a trail using custom elasticsearch query
```javascript
const query = {
            "query": {"bool": {}},
            "from": 0,
            "size": "10",
            "sort": [{"timestamp": {"order": "desc", "unmapped_type": "date"}}]
};
audit.customQuery(query)
.then(result => {
    console.log(result);
    ///Result: {"total":7,"data":[{"id":"24af1b40-e50a-11e9-bf2a-9b8edcf022d8","service":"vas-audits","message":"An Activity Occurred","action":"Activity","userId":"","timestamp":"2019-10-02T12:45:33.939Z"}]}
})
```


### Tests
#### Cli
```bash
npm install
npm test
```

#### Contributors

- [Micheal Akinwonmi](https://github.com/blackhades)
