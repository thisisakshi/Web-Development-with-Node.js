
# Local Business

This project allows people to add their business to this database.

---

Name: Akshita Agarwal

Date: April 10th, 2020

Project Topic: Local Businesses

URL: -

---


### 1. Data Format and Storage

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
  companyName: String,
  founder: String, 
  industry: [String],
  website: String,
  age: Number, 
  companysize: Number, 
  location: String, 
  description: String, 
  preview: String,
  time: String
}
```

### 2. Add New Data

HTML form route: `/addBusiness`

POST endpoint route: `/api/addBusiness`

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
        companyName: 'From Earth',
        founder: 'Geeta Singhal',
        industry: '[cosmetics, soaps, beauty]',
        website: 'www.fromearth.in',
        age: 9, 
        companysize: 2, 
        location: 'Bangalore, India', 
        description: 'Good for you, good for your skin', 
        preview: 'Good for you, good for...',
        time: 'April 5th 2020, 3:55 pm'
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/api/getBusiness`

### 4. Search Data

Search Field: Company Name

### 5. Navigation Pages

Navigation Filters
1. Location -> `/location`
   1. Select Location -> `/location/:location`
2. Industry -> `/industry`
   1. Select Industry -> `/industry/:tag`
3. Small Sized Companies (less than 50 employees) -> `/smallCompanies`
4. Young Companies (Less than 10 years) -> `/youngCompanies`
5. Recently Added -> `/recentlyAdded`

