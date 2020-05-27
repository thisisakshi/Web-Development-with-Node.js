var fs = require('fs');

function loadData() {
      return JSON.parse(fs.readFileSync('data.json'));
}

function saveData(data) {
      var obj = {
            local_businesses: data
        };
    
        fs.writeFileSync('data.json', JSON.stringify(obj)); 
}

function stringifyData(data) {
      var obj = {
            local_businesses: data
        };
      return JSON.stringify(obj);
}

function getAllTags(data) {
      var allTags = [];
      for(var i = 0; i < data.length; i++) {
          var industry = data[i].industry;
          for(var j = 0; j < industry.length; j++) {
              if(!~allTags.indexOf(industry[j])) allTags.push(industry[j]);
          }
      }
      return allTags;
}

function getAllLocations(data) {
      var locations = [];
      for(var i = 0; i < data.length; i++) {
            var location = data[i].location;
            if(!~locations.indexOf(location)) 
                  locations.push(location);
        }
        return locations;
}

function allSmallCompanies(data) {
      var smallCompanies = [];
      for(var i = 0; i < data.length; i++) {
            var size = data[i].companysize;
            if (size <= 50 && !~smallCompanies.indexOf(size)) 
                  smallCompanies.push(data[i]);
      }
      return smallCompanies;
}

function allYoungCompanies(data) {
      var youngCompanies = [];
      for(var i = 0; i < data.length; i++) {
            var age = data[i].age;
            if (age <= 10 && !~youngCompanies.indexOf(age)) 
                  youngCompanies.push(data[i]);
      }
      return youngCompanies;
}

function allRecentlyAdded(data) {
      var recentlyAdded = [];
      var n = data.length - 1;
      if (n > 3) {
            for(var i = n; i > n - 3; i--) {
                  recentlyAdded.push(data[i]);
            }  
      } else {
            for (var i = n; i >= 0; i--) {
                  recentlyAdded.push(data[i]);
            }
      }
      return recentlyAdded;
}
  

module.exports = {
      loadData: loadData,
      saveData: saveData,
      stringifyData, stringifyData,
      getAllTags: getAllTags,
      getAllLocations: getAllLocations,
      allSmallCompanies: allSmallCompanies,
      allYoungCompanies: allYoungCompanies,
      allRecentlyAdded: allRecentlyAdded

}