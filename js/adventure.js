//***********************************************
function calculateStrength(event) {
    var item, strength = 0;
    var men = g.goods[g.MERCENARY].quan;

    for (item = 0; item < g.goods.length; item++){
        var q = g.goods[item].quan;
        if (q > men){
            q = men;
        }
        strength += (q * g.goods[item].str);
    }
    g.strengthElem.innerHTML = "Strength: " + strength;
    g.strength = strength;
}

//***********************************************
function calculateLoad(event) {
    var item, load = 0, cap;
    for (item = 0; item < g.goods.length; item++){
        load += parseInt(g.goods[item].quan * g.goods[item].weight);
    }
    g.loadElem.innerHTML = "Load: " + load;

    cap = (g.goods[g.MERCENARY].quan * 100) + (g.goods[g.DONKEY].quan * 250);
    g.capacityElem.innerHTML = "Capacity: " + cap;
    g.menElem.innerHTML = "Men: " + g.goods[g.MERCENARY].quan;

    g.capacity = cap;
    g.load = load;
}

//***********************************************
function keyHandler(event) {
    var key = event.keyCode;
//    console.log(key);

    if (g.keyCallback) {
        g.keyCallback(key);
    } else {
        mapKeyHandler(key);
    }
}

//***********************************************
function clickHandler(event) {
    console.log('clicked');
}

//***********************************************
function mapKeyHandler(key) {
    switch (key){
        case 37:
            moveMap(-2, 0, 32);
            updateTime();
            break;
        case 39:
            moveMap(+2, 0, 32);
            updateTime();
            break;
        case 38:
            moveMap(0, -2, 32);
            updateTime();
            break;
        case 40:
            moveMap(0, +2, 32);
            updateTime();
            //marketplace();
            break;
    }
}

//***********************************************
function inputChar(prompt, callback) {
    jgl.slowType(g.console, prompt, 8, function() {
        g.keyCallback = function(key) {
            callback(key);
            g.keyCallback = null;
        };
    });
}

//***********************************************
function inputString(prompt, callback) {
    jgl.slowType(g.console, prompt, 8, function() {
        var str;
        g.inputElem = jgl.createElement({
            parent: g.console,
            position: 'relative',
            type: 'input',
            id:'inputBox'
        });
        g.inputElem.onchange = function() {
            str = g.inputElem.value;
            g.inputElem.onchange = undefined;
            g.console.innerHTML = "";
            console.log("Got string '" + str + "'");
            if (callback){
                callback(str);
            }
        };
        g.inputElem.focus();
    });
}

//***********************************************
function moveMap(xd, yd, frames) {
    function animLoop(){
        if (frames > 0){
            frames--;
            g.y += yd;
            g.x += xd;
            g.map.drawMap(g.x, g.y);
            g.mapContext.fillStyle = "#DD8800";
            g.mapContext.fillRect(224 - 10, 160 - 10, 20, 20);
            requestAnimFrame(animLoop);
        } else {
//            g.mapContext.fillStyle = "#DD8800";
//            g.mapContext.fillRect(224 - 10, 160 - 10, 20, 20);
        }
    }
    animLoop();

    var tile = g.terrain[g.map.tileAt(g.x, g.y)];
    if (tile && tile.type) {
        jgl.slowType(g.console, "You are in the " + tile.type, 8);
    }
}

//***********************************************
function updateTime() {
    if (++g.quarterHour > 48){
        g.quarterHour = 0;
        g.day++;
    }
    var hour = 8 + parseInt(g.quarterHour / 4);
    var min = (g.quarterHour % 4) * 15;
    if (min === 0) { min = '00'};
    g.dayElem.innerHTML = 'Day ' + g.day + ' - ' + hour + ':' + min;
}

function marketplace(){

    inputString("Which item is of interest? ", function(str){
        var quantity = 100;
        var price = 10;
        var insult = 4;
        var offer = parseInt(str);
        var lastOffer = 0;
        var counter = price;
        var result = "bargaining";
        var item = "FOOD";
        var quanToBuy;

        inputString("What do you offer for our fine " + item + "s? ", function(str){

            if (offer <= insult){
                jgl.slowType(g.console, "That offer is an insult! The item is no longer for sale", 8);
                result = "insult";
            } else if (offer <= lastOffer) {
                jgl.slowType(g.console, "You offered more last time! Good day, sir.", 8);
                result = "quit";
            } else if (offer >= (counter - 1)){
                inputString("At " + offer + " how many " + item + "s would you like? ", function(str){
                    quanToBuy = parseInt(str);
                    result = "agreed";
                });
            } else {
                counter--;
                inputChar("How about " + counter + "? ", function(ch){
                    if (ch === 'y'){
                        inputString("At " + offer + " how many " + item + "s would you like? ", function(str){
                            quanToBuy = parseInt(str);
                            result = "agreed";
                        });
                    }
                });
            }
        });
    });
}
