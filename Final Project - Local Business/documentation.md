
# Local Businesses

---

Name: Akshita Agarwal

Date: May 11th, 2020

Project Topic: Local Businesses

URL: https://local-businesses.herokuapp.com

---


## 1. Data Format and Storage

### Business Module:

Data point fields:
- `Field 1`: Company Name       `Type: String`
- `Field 2`: Founder            `Type: String`
- `Field 3`: Industry           `Type: [String]`
- `Field 4`: Website            `Type: String`
- `Field 5`: Age                `Type: Number`
- `Field 6`: Size               `Type: Number`
- `Field 7`: Location           `Type: String`
- `Field 8`: Description        `Type: String`

Schema: 
```javascript
{
    companyname: {
        type: String
    },
    founder: {
        type: String
    },
    industry: [String],

    website: {
        type: String
    },
    age: {
        type: Number
    },
    companysize:{
        type: Number
    },
    location:{
        type: String
    },
    description: {
        type: String
    },
    preview: {
        type: String
    }
}
```
### Showcase Module: 
Data point fields:
- `Field 1`: Company Name       `Type: String`
- `Field 2`: Location           `Type: String`
- `Field 3`: Website            `Type: String`
- `Field 4`: Description        `Type: String`

Schema: 
```javascript
{
    eventname: {
        type: String
    },
    location: {
        type: String
    },
    description:{
      type: String
    },
    socialmedia: {
        type: Number
    }
}
```


## 2. Add New Data

HTML form route: `/addBusiness`
HTML form route: `/addShowcase`

POST endpoint route: `/api/addBusiness`
POST endpoint route: `/api/addShowcase`

Example Node.js POST request to endpoint: 
```javascript

var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/addBusiness',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
        companyName: 'Serenity by Jan',
        founder: 'Jan Levinson',
        industry: '[candles]',
        website: 'www.serenity.in',
        age: 1, 
        companysize: 1, 
        location: 'Scranton, PA', 
        description: 'smelly', 
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET route to display all businesses: `/`
GET route to display Showcases: `/showcase`

GET endpoint route: `/api/getBusiness`
GET endpoint route: `/api/getShowcase`

### 4. Search Data

Search Field: `companyname`
This searches for a loca business by name. It is case sensitive.

### 5. Navigation Pages

Navigation Filters
1. Location -> `/location`
   1. Select Location -> `/location/:location`
2. Industry -> `/industry`
   1. Select Industry -> `/industry/:tag`
3. Small Sized Companies (less than 50 employees) -> `/smallCompanies`
4. Young Companies (Less than 10 years) -> `/youngCompanies`
5. Business Directory -> `/directoryByName`

#### Other Tabs
1. Talk to other business owners -> `/chat`
2. About This project -> `/aboutThisProject`

### NPM Packages

Npm packages that we haven't used before
1. mongoose
2. dotenv

