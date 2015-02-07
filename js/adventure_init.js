
window.addEventListener("load", gameInit, false);

//*********************************************************
function gameInit()
{
    console.log("Starting Game...");
    console.log("Instantiating JGL...");
    jgl = new Jgl;

    createWindows();
    createMap();
    calculateStrength();
    calculateLoad();

    setTimeout(function(){g.map.drawMap(g.x, g.y)}, 1000);

    document.addEventListener( 'mousedown', clickHandler, false );
    document.addEventListener( 'keydown', keyHandler, false );

    jgl.slowType(g.consoleElem, "Welcome~ to the Adventure...", 8);
}

//*********************************************************
function createWindows() {
    g.screenElem = document.getElementById("screen");
    g.bannerWin = jgl.createElement({
        parent: g.screenElem,
        id:'bannerWin',
        text: 'Adventure'
    });

    g.dayElem = jgl.createElement({
        parent: g.bannerWin,
        id:'dayElem',
        text: 'Day 1 - 8:00'
    });

    g.menElem = jgl.createElement({
        parent: g.bannerWin,
        id:'menElem'
    });

    g.goldElem = jgl.createElement({
        parent: g.bannerWin,
        id:'goldElem',
        text: 'Gold: 500'
    });

    g.charismaElem = jgl.createElement({
        parent: g.bannerWin,
        id:'charismaElem',
        text: 'Charisma: 5'
    });

    g.strengthElem = jgl.createElement({
        parent: g.bannerWin,
        id:'strengthElem'
    });

    g.navWin = jgl.createElement({
        parent: g.screenElem,
        class:'window',
        id:'navigatorWin'
    });

    g.mapCanvas = jgl.createElement({
        parent: g.navWin,
        type: 'canvas',
        id:'mapCanvas'
    });
    // Make the canvas bitmap width/height match element's screen style.width/height
    g.mapCanvas.width = 576;
    g.mapCanvas.height = 320;
    g.mapContext = g.mapCanvas.getContext("2d");
    g.mapContext.font = "20px _sans";

    g.inventoryWin = jgl.createElement({
        parent: g.screenElem,
        class:'window',
        id:'inventoryWin'
    });

    g.inventoryViewPort = jgl.createElement({
        parent: g.inventoryWin,
        id:'inventoryViewPort',
    });

    g.inventorySurface = jgl.createElement({
        parent: g.inventoryViewPort,
        id:'inventorySurface'
    });

    var item;
    for (item = g.FOOD; item <= g.DONKEY; item++){
        g.goods[item].cellElem = jgl.createElement({
            type: 'span',
            parent:  g.inventorySurface,
            class:'inventoryCell',
            position: 'relative',
            id:'item'+item
        });

        jgl.createElement({
            type: 'span',
            parent: g.goods[item].cellElem,
            class:'inventoryCellLabel',
            text: g.goods[item].type
        });

        jgl.createElement({
            type: 'span',
            parent: g.goods[item].cellElem,
            class:'inventoryCellQuan',
            text: g.goods[item].quan.toString()
        });
    }

    g.capacityElem = jgl.createElement({
        parent: g.inventoryWin,
        id:'capacityElem'
    });

    g.loadElem = jgl.createElement({
        parent: g.inventoryWin,
        id:'loadElem'
    });

    g.consoleWin = jgl.createElement({
        parent: g.screenElem,
        class:'window',
        id:'consoleWin'
    });

    g.consoleElem = jgl.createElement({
        parent: g.consoleWin,
        id:'console'
    });
}

//*********************************************************
function createMap(){

    console.log("Creating new map...");
    g.map = jgl.newTileMapCanvas({ context: g.mapContext, x:0, y:0, w:(9*64), h:(5*64) });

    console.log("Creating tiles...");
    g.map.setDefaultTile({ img:jgl.newImage('sea.png'), x:0, y:0, w:64, h:64 });

    g.img[0] = jgl.newImage('tile0.png');
    g.map.newTile({ index:0, img: g.img[0], x:0, y:0, w:64, h:64 });

    g.img[1] = jgl.newImage('tile1.png');
    g.map.newTile({ index:1, img: g.img[1], x:0, y:0, w:64, h:64 });

    g.map.attachMap({ numColumns:16, numRows:16, tileWidth:64, tileHeight:64, mapData:
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

    g.map.setPositionOffset(256, 128); // center of map is positioning hot spot
}

