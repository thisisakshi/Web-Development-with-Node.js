var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var pokeDataUtil = require("./poke-data-util");
var _ = require("underscore");
var app = express();
var PORT = 4000;

// Restore original data into poke.json. 
// Leave this here if you want to restore the original dataset 
// and reverse the edits you made. 
// For example, if you add certain weaknesses to Squirtle, this
// will make sure Squirtle is reset back to its original state 
// after you restard your server. 
pokeDataUtil.restoreOriginalData();

// Load contents of poke.json into global variable. 
var _DATA = pokeDataUtil.loadData().pokemon;

/// Setup body-parser. No need to touch this.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
    var contents = "";
    _.each(_DATA, function(i) {
        contents += '<tr><td>'+ i['id'] +'</td><td><a href="/pokemon/' +  i['id'] + '">' + i['name'] + '</a></td></tr>\n';
    })

    var html = '<html>\n<body>\n<h1>CONTENTS</h1>\n<table>' + contents + '</table>\n</body>\n</html>';
    res.send(html);
});

app.get("/pokemon/:pokemon_id", function(req, res) {
    var pokemon = _.findWhere(_DATA, {id: parseInt(req.params.pokemon_id)})
    if(!pokemon) {
        return res.send("Error: Pokemon not found");
    } 
    poke_info = "<html><body><table>";
    for(key in pokemon) {
        if(key == "prev_evolution" || key == "next_evolution"){
            poke_info += "<tr><td>"+ key + "</td><td>" + JSON.stringify(pokemon[key][0]) + "</td></tr>\n" ;
        }
        else {
            poke_info += "<tr><td>"+ key + "</td><td>" + pokemon[key] + "</td></tr>\n" ;
        }
    }
    poke_info += "</table><body></html>";
    res.send(poke_info);
});

app.get("/pokemon/image/:pokemon_id", function(req, res) {
    var pokemon = _.findWhere(_DATA, {id: parseInt(req.params.pokemon_id)})
    if(!pokemon) {
        return res.send("Error: Pokemon not found");
    } 
    var image = pokemon["img"];
    poke_image = '<html><body><img src=' + image + '></body></html>';
    
    res.send(poke_image);
    
});


app.get("/api/id/:pokemon_id", function(req, res) {
    // This endpoint has been completed for you.  
    var _id = parseInt(req.params.pokemon_id);
    var result = _.findWhere(_DATA, { id: _id })
    if (!result) return res.json({});
    res.json(result);
});

/*---------------------------------------------------------
---------------------------------------------------------
---------------------------------------------------------
---------------------------------------------------------*/

app.get("/api/evochain/:pokemon_name", function(req, res) {
    var pokemon = _.findWhere(_DATA, {name: req.params.pokemon_name });
    if (pokemon) {
        var list=[];
        list.push(pokemon["name"]);
        console.log(list);
        
        var next = pokemon['next_evolution'];
        if (next) {
            _.each(next, function(i) {
                list.push(i['name']);
            })
        }
        console.log(list);
        
        var prev = pokemon['prev_evolution'];
        if (prev) {
            _.each(prev, function(i) {
                list.push(i['name']);
            })
        }
        console.log(list);
        
        list = list.sort();
        return res.send(list);
    }

    return res.send([]);

});

app.get("/api/type/:type", function(req, res) {
    var type = req.params.type;
    var pokemon_type = [];

    _.each(_DATA, function(i) {
        var list = i['type'].toString().split(",");
        list.forEach(t => {
            if (t == type) {
                pokemon_type.push(i["name"]);
            }
        });

    })

    res.send(pokemon_type);


});

app.get("/api/type/:type/heaviest", function(req, res) {

    var find = _.filter(_DATA, function(i) {
        return i['type'].includes(req.params.type);
    });
    
    if(!find || find.length == 0) {
        return res.json({});
    }
    var max = _.max(find, function(i) {
        return parseInt(i['weight'].slice(0, -1))
    });
    res.send({'name': max['name'], 'weight': parseInt(max['weight'])});
});

app.post("/api/weakness/:pokemon_name/add/:weakness_name", function(req, res) {

    var find = _.findWhere(_DATA, {name: req.params.pokemon_name});
    if(!find) {
        return res.json({});
    }
    if(!find['weaknesses'].includes(req.params.weakness_name)) {
        find['weaknesses'].push(req.params.weakness_name)
    }
    _DATA = _.map(_DATA, function(i) {
        return (i['name'] == req.params.weakness_name ? find : i);
    })
    pokeDataUtil.saveData(_DATA);
    res.send({'name': req.params.pokemon_name, 'weaknesses': find['weaknesses']});
});

app.delete("/api/weakness/:pokemon_name/remove/:weakness_name", function(req, res) {
    var find = _.findWhere(_DATA, {name: req.params.pokemon_name});
    if(!find) {
        return res.json({});
    }
    var index = find['weaknesses'].indexOf(req.params.weakness_name);
    if(index > 0) {
        find['weaknesses'].splice(index, 1);
    }
    _DATA = _.map(_DATA, function(i) {
        return (i['name'] == req.params.pokemon_name ? find : i);
    })
    pokeDataUtil.saveData(_DATA);
    res.send({'name': req.params.pokemon_name, 'weaknesses': find['weaknesses']});
});


// Start listening on port PORT
app.listen(PORT, function() {
    console.log('Server listening on port:', PORT);
});

// DO NOT REMOVE (for testing purposes)
exports.PORT = PORT
