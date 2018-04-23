
window.addEventListener("load", gameInit, false);

//*********************************************************
function gameInit()
{
    console.log("Starting Game...");
    console.log("Instantiating JGL...");
    jgl = new Jgl;

    createWindows();
    updateInventory();
    createMap();
    calculateStrength();
    calculateLoad();

    jgl.newImage('./resources/images/parchment.png', function(image) {
        g.parchmentMaskCtx.drawImage(image, 0, 0, 500, 320);
        exposeMap();
    });

    setTimeout(function(){g.map.drawMap(g.x, g.y)}, 1000);

    document.addEventListener( 'mousedown', clickHandler, false );
    document.addEventListener( 'keydown', keyHandler, false );

    jgl.slowType(g.console, "Welcome to the Adventure...", 7);
}

//*********************************************************
function createWindows() {
    g.screenElem = document.getElementById("screen");
    g.bannerWin = document.getElementById("bannerWin");
    g.dayElem = document.getElementById("day");
    g.menElem = document.getElementById("men");
    g.charismaElem = document.getElementById("charisma");
    g.strengthElem = document.getElementById("strength");
    g.navWin = document.getElementById("navigatorWin");
    g.mapCanvas = document.getElementById("mapCanvas");
    g.inventoryWin = document.getElementById("inventoryWin");
    g.inventoryListElem = document.getElementById("inventoryListElem");
    g.capacityElem = document.getElementById("capacityElem");
    g.loadElem = document.getElementById("loadElem");
    g.consoleWin = document.getElementById("consoleWin");
    g.console = document.getElementById("console");

    g.mapContext = g.mapCanvas.getContext("2d");
    g.mapContext.font = "20px _sans";

    g.parchmentMaskCanvas = document.getElementById("parchmentCanvas");
    g.parchmentMaskCtx = g.parchmentMaskCanvas.getContext("2d");
}

//*********************************************************
function createMap(){

    console.log("Creating new map...");
    g.map = jgl.newTileMapCanvas({ context: g.mapContext, x:0, y:0, w:(7*64), h:(5*64) });

    console.log("Creating tiles...");
    g.map.setDefaultTile({ img:jgl.newImage('./resources/images/sea.png'), x:0, y:0, w:64, h:64 });

    g.img[0] = jgl.newImage('./resources/images/tile0.png');
    g.map.newTile({ index:0, img: g.img[0], x:0, y:0, w:64, h:64 });

    g.img[1] = jgl.newImage('./resources/images/tile1.png');
    g.map.newTile({ index:1, img: g.img[1], x:0, y:0, w:64, h:64 });

    // Generate map
    var mapData = [];
    for (var row = 0; row < 320; row++) {
        var rowData = [];
        for (var col = 0; col < 500; col++) {
            rowData[col] = Math.round(Math.random());
        }
        mapData.push(rowData);
    }

    g.map.attachMap({ numColumns: 500, numRows: 320, tileWidth: 64, tileHeight: 64, mapData: mapData });
/*
        [
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
        ]});
*/
    g.map.setPositionOffset(224-32, 160-32); // center of map is positioning hot spot
}


//*********************************************************
function updateInventory(){
    for (var key in g.inventory) {
        var item = g.inventory[key];
        var html = "" +
            "<span id='{{ITEM}}' class='inventoryCell'>" +
            "<span class='label'>{{ITEM}}</span>" +
            "<span class='quan'>{{QUAN}}</span>" +
            "<span class='weight'>{{WEIGHT}}</span>";

        JGL_TEMPLATE.renderTemplateFromString (html, { ITEM: item.type, QUAN: item.quan, WEIGHT: parseInt(item.quan * item.weight) }, inventoryListElem, false);
    };
};

