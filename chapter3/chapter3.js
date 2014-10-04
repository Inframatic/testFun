//set main namespace
goog.provide('chapter3');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
//circle is a descendant of sprite

// entrypoint
chapter3.start = function(){

	var director = new lime.Director(document.body,1024,768), //controls everything. # is resolution in px. THIS ALSO AUTO-SCALES WHICH IS AWESOME!
	    scene = new lime.Scene(),

	    target = new lime.Layer().setPosition(512,384),
        circle = new lime.Circle().setSize(150,150).setFill(255,150,0),
        lbl = new lime.Label().setSize(160,50).setFontSize(30).setText('TOUCH ME!'),
        title = new lime.Label().setSize(800,70).setFontSize(60).setText('Now move me around!').setOpacity(0).setPosition(512,80).setFontColor('#999').setFill(200,100,0,.1)
        rectangle = new lime.Sprite().setSize(300,300).setFill('#007ae1').setPosition(500,400).setAnchorPoint(0,0);
        // COORDINATES: coordinates are calculated starting in the top left corner of the browser


    //add circle and label to target object
    target.appendChild(rectangle);
    target.appendChild(circle); //THINGS ARE APPENDED ON TOP OF EACH OTHER
    target.appendChild(lbl);

    //add target and title to the scene
    scene.appendChild(target);
    scene.appendChild(title);

	director.makeMobileWebAppCapable(); //THIS LINE HELPS PERFORMANCE IN IOS

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

	// set current scene active
	director.replaceScene(scene1);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('chapter3.start', chapter3.start);
