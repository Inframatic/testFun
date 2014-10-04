//set main namespace
goog.provide('mobaTowerDefense');

//VIRTUAL PET LESSON TEACHES: castles ability to level UP or DOWN
// FARMVILLE LESSON TEACHES: how to give the shadow ball and other objects a TIMER 
//                         : how to spawn a skeleton on click
//                         : generating in-game-currency



//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.RoundedRect'); // RoundedRec is perfect for TOWERS
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.fill.LinearGradient');
// goog.require('mobaTowerDefense.Unit');
// goog.require('mobaTowerDefense.Item');
//circle is a descendant of sprite

// entrypoint
mobaTowerDefense.start = function(){

    var gameObject = { //A generic object that is in the game
        width: 320,
        height: 480,
        renderer: lime.Renderer.CANVAS,
        maxPetSize: 200,
    }

    var director = new lime.Director(document.body,gameObject.width,gameObject.height), //controls everything. # is resolution in px. THIS ALSO AUTO-SCALES WHICH IS AWESOME!
        gameScene = new lime.Scene().setRenderer(gameObject.renderer),
        gameLayer = new lime.Layer();
        scene = new lime.Scene().setRenderer(lime.Renderer.CANVAS),// USE CANVAS BECAUSE IT DEALS BETTER WITH ANIMATION AS OPPOSED TO USING DOM ELEMENTS

        target = new lime.Layer().setPosition(512,384),
        circle = new lime.Circle().setSize(75,75).setFill(255,150,0).setPosition(200,400),//CONTINUATION OF TARGET ^^
        lbl = new lime.Label().setSize(160,50).setFontSize(30).setText('DARK MATTER!'), //CONTINUATION OF CIRCLE ^^
        title = new lime.Label().setSize(800,70).setFontSize(60).setText('Now move me around!').
            setOpacity(0).setPosition(512,80).setFontColor('#999').setFill(200,100,0,.1);
        background = new lime.Sprite().setSize(gameObject.width,gameObject.height*4/5).setFill('#00CD66').
            setPosition(0,0).setAnchorPoint(0,0); 
        homeArea = new lime.Sprite().setSize(gameObject.width,gameObject.height*4/5).
            setFill('#8B5A00').setPosition(gameObject.width/2,gameObject.height*9/10);

        necro = new lime.Sprite().setSize(75,100).setFill('#007ae1').setPosition(0,400).setAnchorPoint(0,0); //SETFILL CAN ALSO BE AN IMG
        



        // COORDINATES: coordinates are calculated starting in the top left corner of the browser
        //( X , Y)

    //ADD circle and label to target object (LOAD)
    target.appendChild(background);
    target.appendChild(necro);
    target.appendChild(circle); //THINGS ARE APPENDED ON TOP OF EACH OTHER
    target.appendChild(lbl);

    //ADD target and title to the scene (& FIRE)
    scene.appendChild(target);
    scene.appendChild(title);
    scene.appendChild(background);
    scene.appendChild(necro);
    scene.appendChild(circle);

    
    // CREATE unit
    var unit = new mobaTowerDefense.Unit(gameObject,gameLayer);
    gameLayer.appendChild(unit);

    //add some interaction
    goog.events.listen(target,['mousedown','touchstart'],function(e){

        //animate
        target.runAction(new lime.animation.Spawn(
            new lime.animation.FadeTo(.5).setDuration(.2),
            new lime.animation.ScaleTo(1.5).setDuration(.8)
        ));

        title.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        e.startDrag();

        //listen for end event
        e.swallow(['mouseup','touchend'],function(){
            target.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(512,384)
            ));

            title.runAction(new lime.animation.FadeTo(0));
        });


    });

    director.makeMobileWebAppCapable(); //THIS LINE HELPS PERFORMANCE IN IOS    
    director.replaceScene(scene);// set current scene active

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('mobaTowerDefense.start', mobaTowerDefense.start);
