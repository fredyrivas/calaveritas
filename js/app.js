/*$(document).foundation();*/


var spriteLoaded = false;
var backLoaded = false;

var instruArray = [],
    actualInstru = 0;

var instruccionesTL;


var onProcess = false;

var isChingon = false;

var login = "o_4m7bjj3sb2";
var api_key = "R_019415cdc64b447a8652ec1ec9227bfd";
var long_url = "";
var short_url = "";

var giphyURL;

var canvasAnim;

var preloaderTL;

var currentSection = 1;

var fondosArray = ['images/fondo-naranja.png', 'images/fondo-rosa.png', 'images/fondo-azul.png', 'images/fondo-amarillo.png'];


var skullSpriteArray = ['images/skull-sprite-1.png', 'images/skull-sprite-2.png', 'images/skull-sprite-3.png', 'images/skull-sprite-4.png', 'images/skull-sprite-5.png', 'images/skull-sprite-6.png'];

var miCabeza = ['images/opcion-calavera-1.png', 'images/opcion-calavera-2.png', 'images/opcion-calavera-3.png', 'images/opcion-calavera-4.png', 'images/opcion-calavera-5.png', 'images/opcion-calavera-6.png'];

var texto_calaverita = '';
//////////////////////////////////////////////////////////select


var prevHead;
var actualHead;
var ticksArray = [];


//////////////////////////////////////////////////////////select


var prevColor;
var actualColor;
var colorArray = [];


//////////////////////////////////////////////////////////skull


var skulAnim_A, skulAnim_B, skulAnim_C, skulAnim_D, skulAnim_E, skulAnim_F;

//////////////////////////////////////////////////////////flower

var animflower_A1, animflower_A2, animflower_A3, animflower_A4, animflower_A5, animflower_A6;
var animflower_B1, animflower_B2, animflower_B3, animflower_B4, animflower_B5, animflower_B6;
var animflower_C1, animflower_C2, animflower_C3, animflower_C4, animflower_C5, animflower_C6;
var animflower_D1, animflower_D2, animflower_D3, animflower_D4, animflower_D5, animflower_D6;
var animflower_E1, animflower_E2, animflower_E3, animflower_E4, animflower_E5, animflower_E6;
var animflower_F1, animflower_F2, animflower_F3, animflower_F4, animflower_F5, animflower_F6;

var animflower_A_arry = [];
var animflower_B_arry = [];
var animflower_C_arry = [];
var animflower_D_arry = [];
var animflower_E_arry = [];
var animflower_F_arry = [];


/////////// gif animation ////////////

var allowsaving = false;
var nowSave = false;

var nombreDelParticipante = '';

var encoder = new GIFEncoder();
encoder.setRepeat(0); //0  -> loop del gif creado
encoder.setDelay(0); //cambio de frame del gif creado
encoder.setQuality(100);
//encoder.setFrameRate(10); //a que velocidad correra el gif creado
encoder.start();


var speedWhenCapturing = 60;
var normalSpeed = 4;
var gifSpeed = normalSpeed;


var grabLimit = 5;  // Number of screenshots to take
var count = 0;


var textos_calaveritas = [];


var flag = true;


var backImgUrl = new Image();


var coin,
    coinImage,
    canvas;


$(document).ready(function () {
    console.log('document ready');

    setPreloader();


    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isChingon = false;
    } else {

        var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;

        if (is_chrome) {
            isChingon = true;
        } else {
            isChingon = false;
        }
    }

    if (isChingon) {
        playPreloader(true);
    } else {
        playPreloader(false);
    }

});


$(window).load(function () {

    console.log('images ready');
    initSite();
});

function initSite() {


    //////////////////////////////////////////////////////////////////// GIF
    // Get canvas
    canvas = document.getElementById("myCanvas");
    canvas.width = 800;
    canvas.height = 600;

    // Create sprite sheet
    coinImage = new Image();

    // Create sprite
    coin = sprite({
        gifcontext: canvas.getContext("2d"),
        bgcontext: canvas.getContext("2d"),
        namecontext: canvas.getContext("2d"),
        textcontext: canvas.getContext("2d"),
        insisiblecontext: canvas.getContext("2d"),
        width: 4000,
        height: 600,
        image: coinImage,
        numberOfFrames: 5,
        ticksPerFrame: gifSpeed //2.5
    });


    setTicksSelects();
    setColors();
    setNombreCanvas();
    setDownArrows();
    setUpArrows();
    setSideArrows();
    setLeftArrow();
    setInstrucciones();

    //////////////////////////////////////////////////////////////////// FULLPAGE

    $('#fullpage').fullpage({

        onLeave: function (index, nextIndex, direction) {
            currentSection = nextIndex;
            handleSections();
        }
    });


    //////////////////////////////////////////////////////////////////// SKULCITOS

    distributeSkulcitos('.skulcito-a-');
    distributeSkulcitos('.skulcito-b-');
    distributeSkulcitos('.skulcito-c-');
    distributeSkulcitos('.skulcito-d-');
    distributeSkulcitos('.skulcito-e-');

    setSkulcitosOver('a');


    //////////////////////////////////////////////////////////////////// FLOWERS

    distributeFlowers('.flor-a-');
    distributeFlowers('.flor-b-');
    distributeFlowers('.flor-c-');
    distributeFlowers('.flor-d-');
    distributeFlowers('.flor-e-');

    handleSections();


    //////////////////////////////////////////////////////////////////// HANDLERS


    $(window).resize(function () {
        distributeFlowers('.flor-a-');
        distributeFlowers('.flor-b-');
        distributeFlowers('.flor-c-');
        distributeFlowers('.flor-d-');
        distributeFlowers('.flor-e-');

        distributeSkulcitos('.skulcito-a-');
        distributeSkulcitos('.skulcito-b-');
        distributeSkulcitos('.skulcito-c-');
        distributeSkulcitos('.skulcito-d-');
        distributeSkulcitos('.skulcito-e-');
    });

    $('.calaca-slide').slick({
        arrows: true,
        nextArrow: $('.arrow-right'),
        prevArrow: $('.arrow-left')
    });


    $('.guardar-btn').click(function () {
        if (!$('#inputusername').val()) {
            warningNombre();
        } else {
            gotoToFinalScreen();
        }
    });


    $('.hazotra-btn').click(function () {
        location.reload(true);
    });

    TweenMax.delayedCall(0, showingPreloader, [false, .4]);
}


///////////////////////////////////////////////////////////// ////////////////////////////////  FUNCTIONS
/////////////// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// /////////// ////////////////////////// ///////////////////////////////////////////////////////
///////////// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function setInstrucciones() {

    instruArray[0] = ['images/instru-1.svg', 'Selecciona la calaverita que más te guste.'];
    instruArray[1] = ['images/instru-2.svg', 'Elige el fondo que más te guste.'];
    instruArray[2] = ['images/instru-3.svg', 'Escribe tu nombre.'];
    instruArray[3] = ['images/instru-4.svg', 'Comparte y descarga.'];

    instruccionesTL = new TimelineMax({repeat: -1, repeatDelay: .5});

    instruccionesTL.appendMultiple([
        TweenMax.to($('.instru-number img'), .5, {delay: 2, scale: 0, ease: Back.easeIn}),
        TweenMax.to($('.instru-text'), .5, {
            delay: 2, alpha: 0, onComplete: function () {

                if (actualInstru < 3) {
                    actualInstru++;
                } else {
                    actualInstru = 0;
                }

                console.log('actualInstru = ' + actualInstru);

                $('.instru-number img').attr('src', instruArray[actualInstru][0]);
                $('.instru-text').html(instruArray[actualInstru][1]);

                TweenMax.to($('.instru-number img'), .5, {delay: .1, scale: 1, ease: Back.easeOut});
                TweenMax.to($('.instru-text'), .5, {delay: .1, alpha: 1});
            }
        })
    ]);

    instruccionesTL.pause();
}

function playInstrucciones(on_off) {
    if (on_off) {
        instruccionesTL.play();
    } else {
        instruccionesTL.pause();
    }
}


function setPreloader() {
    var mydelay = 3;

    preloaderTL = new TimelineMax({repeat: -1});
    preloaderTL.add(TweenMax.to($('.preloader-backcolor'), mydelay, {
        backgroundColor: '#ff9c2a',
        ease: Linear.easeNone
    }));
    preloaderTL.add(TweenMax.to($('.preloader-backcolor'), mydelay, {
        backgroundColor: '#00abad',
        ease: Linear.easeNone
    }));
    preloaderTL.add(TweenMax.to($('.preloader-backcolor'), mydelay, {
        backgroundColor: '#993399',
        ease: Linear.easeNone
    }));
    preloaderTL.add(TweenMax.to($('.preloader-backcolor'), mydelay, {
        backgroundColor: '#ff00c6',
        ease: Linear.easeNone
    }));

    //preloaderTL.pause();
}

function playPreloader(on_off) {
    if (on_off) {
        preloaderTL.play();
    } else {
        preloaderTL.pause();
    }
}

function showingPreloader(on_off, time) {
    if (on_off) {
        TweenMax.to($('.preloader-backcolor'), time, {alpha: 1});
        TweenMax.to($('.preloader-gif'), time, {scale: 1, ease: Back.easeOut});

        if (isChingon) {
            playPreloader(true);
        }

    } else {
        TweenMax.to($('.preloader-backcolor'), time, {alpha: 0});
        TweenMax.to($('.preloader-gif'), time, {
            scale: 0, ease: Back.easeIn, onComplete: function () {
                if (isChingon) {
                    playPreloader(false);
                }
            }
        });

    }
}


function setDownArrows() {

    $.each($('.down-arrow'), function () {
        $(this).find('.down-arrow-hs').bind('mouseover', function (e) {
            overDownArrows(e);
        });

        $(this).find('.down-arrow-hs').bind('mouseout', function (e) {
            outDownArrows(e);
        });

        $(this).find('.down-arrow-hs').bind('click', function (e) {
            if (!onProcess) {
                switch (currentSection) {
                    case 1:
                        $.fn.fullpage.moveSectionDown();
                        break;
                    case 2:
                        if (actualHead == undefined) {
                            warningHead();
                        } else {
                            $.fn.fullpage.moveSectionDown();
                        }
                        break;
                    case 3:
                        if (actualColor == undefined) {
                            warningColor();
                        } else {
                            $.fn.fullpage.moveSectionDown();
                        }
                        break;
                }
            }

        });

        TweenMax.set($(this).find('svg'), {alpha: .6});
    });
}

function overDownArrows(e) {
    var thisParent = $(e.currentTarget).parent();
    TweenMax.to($(thisParent).find('svg'), .6, {alpha: 1});
    moveDownArrow(thisParent);
}

function outDownArrows(e) {
    var thisParent = $(e.currentTarget).parent();
    TweenMax.to($(thisParent).find('svg'), .6, {alpha: .6});
    moveDownArrow(thisParent);
}


function moveDownArrow(thisParent) {
    var posDown = 30;
    var pointsOpos = {x1: 32.8, y1: 23, x2: 25, y2: 31, x3: 17.2, y3: 23};
    var points = {
        x1: pointsOpos.x1,
        y1: pointsOpos.y1,
        x2: pointsOpos.x2,
        y2: pointsOpos.y2,
        x3: pointsOpos.x3,
        y3: pointsOpos.y3
    };

    var pointsTween = TweenMax.fromTo(points, .2, {y1: pointsOpos.y1, y2: pointsOpos.y2, y3: pointsOpos.y3}, {
        y1: pointsOpos.y1 + posDown, y2: pointsOpos.y2 + posDown, y3: pointsOpos.y3 + posDown, onUpdate: function () {
            $(thisParent).find('svg').find('.navDownArrowPoly').attr('points', points.x1 + "," + points.y1 + " " + points.x2 + "," + points.y2 + " " + points.x3 + "," + points.y3);
        },
        onComplete: function () {

            var pointsUpTween = TweenMax.fromTo(points, .2, {
                y1: pointsOpos.y1 - posDown,
                y2: pointsOpos.y2 - posDown,
                y3: pointsOpos.y3 - posDown
            }, {
                y1: pointsOpos.y1, y2: pointsOpos.y2, y3: pointsOpos.y3, onUpdate: function () {
                    $(thisParent).find('svg').find('.navDownArrowPoly').attr('points', points.x1 + "," + points.y1 + " " + points.x2 + "," + points.y2 + " " + points.x3 + "," + points.y3);
                }
            });
        }
    });
}


function setUpArrows() {
    $.each($('.up-arrow'), function () {
        $(this).find('.up-arrow-hs').bind('mouseover', function (e) {
            overUpArrows(e);
        });

        $(this).find('.up-arrow-hs').bind('mouseout', function (e) {
            outUpArrows(e);
        });

        $(this).find('.up-arrow-hs').bind('click', function (e) {

            if (!onProcess) {
                $.fn.fullpage.moveSectionUp();
            }
        });

        TweenMax.set($(this).find('svg'), {alpha: .6});
    });
}

function overUpArrows(e) {
    var thisParent = $(e.currentTarget).parent();
    TweenMax.to($(thisParent).find('svg'), .6, {alpha: 1});
    moveUpArrow(thisParent);
}

function outUpArrows(e) {
    var thisParent = $(e.currentTarget).parent();
    TweenMax.to($(thisParent).find('svg'), .6, {alpha: .6});
    moveUpArrow(thisParent);
}

function moveUpArrow(thisParent) {
    var posDown = 30;
    var pointsOpos = {x1: 32.8, y1: 30, x2: 25, y2: 20, x3: 17.2, y3: 30};

    var points = {
        x1: pointsOpos.x1,
        y1: pointsOpos.y1,
        x2: pointsOpos.x2,
        y2: pointsOpos.y2,
        x3: pointsOpos.x3,
        y3: pointsOpos.y3
    };

    var pointsTween = TweenMax.fromTo(points, .2, {y1: pointsOpos.y1, y2: pointsOpos.y2, y3: pointsOpos.y3}, {
        y1: pointsOpos.y1 - posDown, y2: pointsOpos.y2 - posDown, y3: pointsOpos.y3 - posDown, onUpdate: function () {
            $(thisParent).find('svg').find('.navUpArrowPoly').attr('points', points.x1 + "," + points.y1 + " " + points.x2 + "," + points.y2 + " " + points.x3 + "," + points.y3);
        },
        onComplete: function () {

            var pointsUpTween = TweenMax.fromTo(points, .2, {
                y1: pointsOpos.y1 + posDown,
                y2: pointsOpos.y2 + posDown,
                y3: pointsOpos.y3 + posDown
            }, {
                y1: pointsOpos.y1, y2: pointsOpos.y2, y3: pointsOpos.y3, onUpdate: function () {
                    $(thisParent).find('svg').find('.navUpArrowPoly').attr('points', points.x1 + "," + points.y1 + " " + points.x2 + "," + points.y2 + " " + points.x3 + "," + points.y3);
                }
            });
        }
    });
}


function setSideArrows() {
    $.each($('.arrow-right'), function () {
        $(this).find('.arrowSides-hs').bind('mouseover', function (e) {
            overSideArrows(e);
        });
        $(this).find('.arrowSides-hs').bind('mouseout', function (e) {
            outSideArrows(e);
        });
        TweenMax.set($(this).find('svg'), {alpha: .6});
    });
}


function overSideArrows(e) {
    var thisParent = $(e.currentTarget).parent();
    TweenMax.to($(thisParent).find('svg'), .6, {alpha: 1});
    moveRightArrow(thisParent);
}
function outSideArrows(e) {
    var thisParent = $(e.currentTarget).parent();
    TweenMax.to($(thisParent).find('svg'), .6, {alpha: .6});
    moveRightArrow(thisParent);
}

function moveRightArrow(thisParent) {
    var posDown = 30;
    var pointsOpos = {x1: 22, y1: 17.2, x2: 31, y2: 25, x3: 22, y3: 32.8};
    var points = {
        x1: pointsOpos.x1,
        y1: pointsOpos.y1,
        x2: pointsOpos.x2,
        y2: pointsOpos.y2,
        x3: pointsOpos.x3,
        y3: pointsOpos.y3
    };

    var pointsTween = TweenMax.fromTo(points, .2, {x1: pointsOpos.x1, x2: pointsOpos.x2, x3: pointsOpos.x3}, {
        x1: pointsOpos.x1 + posDown, x2: pointsOpos.x2 + posDown, x3: pointsOpos.x3 + posDown, onUpdate: function () {
            $(thisParent).find('svg').find('.ar2').attr('points', points.x1 + "," + points.y1 + " " + points.x2 + "," + points.y2 + " " + points.x3 + "," + points.y3);
        },
        onComplete: function () {

            var pointsUpTween = TweenMax.fromTo(points, .2, {
                x1: pointsOpos.x1 - posDown,
                x2: pointsOpos.x2 - posDown,
                x3: pointsOpos.x3 - posDown
            }, {
                x1: pointsOpos.x1, x2: pointsOpos.x2, x3: pointsOpos.x3, onUpdate: function () {
                    $(thisParent).find('svg').find('.ar2').attr('points', points.x1 + "," + points.y1 + " " + points.x2 + "," + points.y2 + " " + points.x3 + "," + points.y3);
                }
            });
        }
    });
}


function setLeftArrow() {
    $.each($('.arrow-left'), function () {
        $(this).find('.arrowSides-hs').bind('mouseover', function (e) {
            overLeftArrows(e);
        });
        $(this).find('.arrowSides-hs').bind('mouseout', function (e) {
            outLeftArrows(e);
        });
        TweenMax.set($(this).find('svg'), {alpha: .6});
    });
}

function overLeftArrows(e) {
    var thisParent = $(e.currentTarget).parent();
    TweenMax.to($(thisParent).find('svg'), .6, {alpha: 1});
    moveLeftArrow(thisParent);
}
function outLeftArrows(e) {
    var thisParent = $(e.currentTarget).parent();
    TweenMax.to($(thisParent).find('svg'), .6, {alpha: .6});
    moveLeftArrow(thisParent);
}

function moveLeftArrow(thisParent) {
    var posDown = 30;
    var pointsOpos = {x1: 28, y1: 32.8, x2: 19, y2: 25, x3: 28, y3: 17.2};
    var points = {
        x1: pointsOpos.x1,
        y1: pointsOpos.y1,
        x2: pointsOpos.x2,
        y2: pointsOpos.y2,
        x3: pointsOpos.x3,
        y3: pointsOpos.y3
    };

    var pointsTween = TweenMax.fromTo(points, .2, {x1: pointsOpos.x1, x2: pointsOpos.x2, x3: pointsOpos.x3}, {
        x1: pointsOpos.x1 - posDown, x2: pointsOpos.x2 - posDown, x3: pointsOpos.x3 - posDown, onUpdate: function () {
            $(thisParent).find('svg').find('.al2').attr('points', points.x1 + "," + points.y1 + " " + points.x2 + "," + points.y2 + " " + points.x3 + "," + points.y3);
        },
        onComplete: function () {

            var pointsUpTween = TweenMax.fromTo(points, .2, {
                x1: pointsOpos.x1 + posDown,
                x2: pointsOpos.x2 + posDown,
                x3: pointsOpos.x3 + posDown
            }, {
                x1: pointsOpos.x1, x2: pointsOpos.x2, x3: pointsOpos.x3, onUpdate: function () {
                    $(thisParent).find('svg').find('.al2').attr('points', points.x1 + "," + points.y1 + " " + points.x2 + "," + points.y2 + " " + points.x3 + "," + points.y3);
                }
            });
        }
    });
}


function handleSections() {
    switch (currentSection) {
        case 1:

            playInstrucciones(true);

            if (isChingon) {
                if (animflower_B_arry.length != 0) {
                    killAllFlowersAnims(animflower_B_arry);
                    skulAnim_B.getCurrentLoopSkulRotation().killSkullTweens();
                }

                setFlowerAnims(animflower_A_arry, 'animflower_A', '.flor-a-');
                skulAnim_A = setSkulcitosRotation('a');
            }


            break;
        case 2:
            $.fn.fullpage.setAllowScrolling(false);

            playInstrucciones(false);

            if (isChingon) {
                killAllFlowersAnims(animflower_A_arry);
                skulAnim_A.getCurrentLoopSkulRotation().killSkullTweens();

                setFlowerAnims(animflower_B_arry, 'animflower_B', '.flor-b-');
                skulAnim_B = setSkulcitosRotation('b');
            }

            break;
        case 3:

            $.fn.fullpage.setAllowScrolling(false);

            if (isChingon) {
                killAllFlowersAnims(animflower_B_arry);
                skulAnim_B.getCurrentLoopSkulRotation().killSkullTweens();

                setFlowerAnims(animflower_C_arry, 'animflower_C', '.flor-c-');
                skulAnim_C = setSkulcitosRotation('c');
            }

            break;
        case 4:

            $.fn.fullpage.setAllowScrolling(false);

            if (isChingon) {
                killAllFlowersAnims(animflower_C_arry);
                skulAnim_C.getCurrentLoopSkulRotation().killSkullTweens();

                setFlowerAnims(animflower_D_arry, 'animflower_D', '.flor-d-');
                skulAnim_D = setSkulcitosRotation('d');
            }

            break;
        case 5:
            $.fn.fullpage.setAllowScrolling(true);
            $.fn.fullpage.setAllowScrolling(false, 'up');


            break;
        case 6:
            $.fn.fullpage.setAllowScrolling(true, 'up', 'down');
            break;

    }
}


function gotoToFinalScreen() {

    if (isChingon) {
        killAllFlowersAnims(animflower_D_arry);
        skulAnim_D.getCurrentLoopSkulRotation().killSkullTweens();
    }

    TweenMax.delayedCall(.5, showingPreloader, [true, .4]);
    $('.preloader-message').css('display', 'block');

    createCanvasGif();

    TweenMax.delayedCall(1, function () {
        $.fn.fullpage.moveSectionDown();
    });

}


function setNombreCanvas() {

    $('#inputusername').focus(function () {
        onFocusText();
    });
    $('#inputusername').focusout(function () {
        onFocusoutText();
    });
    $('#inputusername').on('change paste keyup', function (e) {
        onChangeText(e);
    });

    $("#inputusername").on({
        keydown: function (e) {

            var code = e.which;

            if (code == '13') {//enter key
                onFocusoutText();
                gotoToFinalScreen();
                return false;
            }

            if (code === 32)//space bar
                return false;
        },
        change: function () {
            this.value = this.value.replace(/\s/g, "");
        }
    });


}


function onFocusText() {
    TweenMax.to($('.calavera-nombre-container'), .6, {scale: 2.5, ease: Back.easeOut});

    TweenMax.to($('.calavera-nombre-container'), .2, {y: 170 + 30});
    TweenMax.to($('.calavera-nombre-container'), .4, {delay: .2, y: 170});

}

function onFocusoutText() {
    TweenMax.to($('.calavera-nombre-container'), .4, {scale: 1, y: 0, ease: Back.easeIn.config(4)});
}

function onChangeText(e) {
    $('.renderName p').html($(e.currentTarget).val());
}


///////////////// ticks select  ////////////////////////////////////////////////////////

function setTicksSelects() {
    $.each($('.tickOption'), function (i) {
        ticksArray.push($(this));

        $(ticksArray[i]).bind('click', function (e) {
            clickTick(e);
        });
    });
}


function clickTick(e) {

    TweenMax.set($(e.currentTarget).find('svg'), {scale: 1, transformOrigin: "50% 50%"});
    TweenMax.to($(e.currentTarget).find('svg'), .1, {scale: 1.3, yoyo: true, repeat: 1, transformOrigin: "50% 50%"});

    TweenMax.set($(e.currentTarget).find('.opcion-calavera'), {rotation: 0});
    TweenMax.to($(e.currentTarget).find('.opcion-calavera'), .1, {
        rotation: 10,
        ease: Back.easeIn,
        yoyo: true,
        repeat: 1
    });

    if (actualHead != undefined) {
        prevHead = actualHead;
        blackTick(prevHead);
    }

    actualHead = $(e.currentTarget).index();
    greenTick(actualHead);


    switch (actualHead) {
        case 1:
            $('.renderName').css('top', 40);
            break;
        case 2:
            $('.renderName').css('top', 49);
            break;
        case 3:
            $('.renderName').css('top', 32);
            break;
        case 4:
            $('.renderName').css('top', 40);
            break;
        case 5:
            $('.renderName').css('top', 38);
            break;
        case 6:
            $('.renderName').css('top', 39);
            break;
    }


    $('.calavera-nombre-container').find('img').attr('src', miCabeza[actualHead - 1]);
}

function greenTick(e) {
    TweenLite.to($(ticksArray[e - 1]).find('svg').find('.tckfront'), .3, {fill: '#17ac28'});
}

function blackTick(e) {
    TweenLite.to($(ticksArray[e - 1]).find('svg').find('.tckfront'), .3, {fill: '#000'});
}


function warningHead() {

    $.each($('.opcion-calavera'), function () {
        TweenMax.set($(this), {y: 0});
        TweenMax.to($(this), .1, {
            y: 10,
            ease: Back.easeIn,
            yoyo: true,
            repeat: 1
        });
    });
}


function warningNombre() {
    TweenMax.to($('#inputusername'), .1, {rotation: 10});
    TweenMax.to($('#inputusername'), .1, {delay: .1, rotation: 0});
    TweenMax.to($('#inputusername'), .1, {delay: .2, rotation: 10});
    TweenMax.to($('#inputusername'), .1, {delay: .3, rotation: 0});
}

///////////////// colors ////////////////////////////////////////////////////////


function setColors() {

    $.each($('.colorOption'), function (i) {
        colorArray.push($(this));

        $(colorArray[i]).bind('click', function (e) {
            clickColor(e);
        });

        $(colorArray[i]).bind('mouseover', function (e) {
            overColor(e);
        });
        $(colorArray[i]).bind('mouseout', function (e) {
            outColor(e);
        });

        TweenLite.set($(colorArray[i]).find('path'), {alpha: 0});
    });
}

function clickColor(e) {

    if (actualColor != undefined) {
        prevColor = actualColor;
        removeOutlineColor(prevColor);
    }

    actualColor = $(e.currentTarget).index();
    outlineColor(actualColor);
}

function outlineColor(e) {
    TweenLite.to($(colorArray[e]).find('path'), .3, {alpha: 1});
}
function removeOutlineColor(e) {
    TweenLite.to($(colorArray[e]).find('path'), .4, {alpha: 0});
}
function overColor(e) {
    //TweenMax.set($(colorArray[$(e.currentTarget).index()]).find('svg'), {scale: 1});
    TweenMax.to($(colorArray[$(e.currentTarget).index()]).find('svg'), .3, {scale: 1.1, ease: Back.easeOut});
}
function outColor(e) {
    //TweenMax.set($(colorArray[$(e.currentTarget).index()]).find('svg'), {scale: 1});
    TweenMax.to($(colorArray[$(e.currentTarget).index()]).find('svg'), .3, {scale: 1, ease: Back.easeOut});
}


function warningColor() {
    TweenMax.staggerTo($('.colorOption').find('svg'), .2, {scale: 1.1, yoyo: true, repeat: 1}, 0.07);
}

///////////////// INIT Flowers ////////////////////////////////////////////////////////


function setFlowerAnims(currArray, flowerGroup, flowerPrefix) {
    for (var i = 0; i < 6; i++) {

        currArray.push(window[flowerGroup + (i + 1)]);

        if ((i % 2) == 0) {
            currArray[i] = createFlowerTween({flowerID: $(flowerPrefix + (i + 1)), clockwise: false});
        } else {
            currArray[i] = createFlowerTween({flowerID: $(flowerPrefix + (i + 1)), clockwise: true});
        }
    }
}

function killAllFlowersAnims(arrayID) {
    for (var i = 0; i < 6; i++) {
        arrayID[i].changeAllowingFlowerAnim(false);
    }
}

function createFlowerTween(options) {

    var that = {},

        allowAnimation,
        maxSpeedFlower,
        tween,
        clockwise,
        minSpeedFlower,
        flowerID;


    maxSpeedFlower = randy(.2, 1);

    flowerID = options.flowerID;
    clockwise = options.clockwise;
    minSpeedFlower = 10;
    allowAnimation = true;


    if (clockwise) {
        tween = TweenMax.to(options.flowerID, minSpeedFlower, {
            rotation: 360,
            transformOrigin: "50% 50%",
            ease: Linear.easeNone,
            repeat: -1,
            paused: true
        });
    } else {
        tween = TweenMax.to(options.flowerID, minSpeedFlower, {
            rotation: -360,
            transformOrigin: "50% 50%",
            ease: Linear.easeNone,
            repeat: -1,
            paused: true
        });
    }

    tween.timeScale(0);
    tween.play();

    that.playTween = function () {
        tween.play();
    }
    that.pauseTween = function () {
        tween.pause();
    }

    that.speedUpTween = function () {

        var scope = {increment: 0};
        var tweenscope = TweenMax.to(scope, 3, {
            increment: maxSpeedFlower, ease: Power1.easeIn, onUpdate: function () {
                tween.timeScale(scope.increment);
            }, onComplete: function () {
                if (allowAnimation) {
                    TweenMax.delayedCall(3, function () {
                        that.speedDownTween();
                    });
                }
            }
        });

    };

    that.speedDownTween = function () {

        var scope = {increment: maxSpeedFlower};
        var tweenscope = TweenMax.to(scope, 3, {
            increment: 0, ease: Power1.easeOut, onUpdate: function () {
                tween.timeScale(scope.increment);
            }, onComplete: function () {
                if (allowAnimation) {
                    TweenMax.delayedCall(3, function () {
                        that.speedUpTween();
                    });
                }
            }
        });
    }

    that.changeAllowingFlowerAnim = function (on_off) {

        if (on_off) {
            allowAnimation = true;
        } else {
            console.log('kill: ' + options.flowerID);
            allowAnimation = false;
        }
    }

    that.speedUpTween();

    return that;
}

function distributeFlowers(florID) {
    $(florID + '1').css('top', 30);
    $(florID + '2').css('top', ( ($(window).height() / 2) - ( $(florID + '2').height() / 2 ) ) - ($(florID + '2').height() / 4));
    $(florID + '3').css('top', $(window).height() - ( $(florID + '3').height() + 100 ));

    $(florID + '4').css('top', 30);
    $(florID + '5').css('top', ( ($(window).height() / 2) - ( $(florID + '5').height() / 2 ) ) - ($(florID + '5').height() / 4));
    $(florID + '6').css('top', $(window).height() - ( $(florID + '6').height() + 100 ));
}


///////////////// END Flowers ////////////////////////////////////////////////////////


/*////////////////// INIT skulcitos ////////////////////////////////////////////////////////////*/

function setSkulcitosOver(idsect) {
    for (var i = 0; i < 6; i++) {
        $('.skulcito-' + idsect + '-' + (i + 1)).mouseover(function (e) {
            singleSkulcitoRotation(e.currentTarget);
            scaleSkulcito(e.currentTarget);
        });
    }
}

function setSkulcitosRotation(sectid) {

    var that = {};
    var arr = [];

    for (var i = 0; i < 6; i++) {
        arr.push('.skulcito-' + sectid + '-' + (i + 1));
    }

    shuffle(arr)

    var currentLoopSkulRotation = loopSkulcitosRotation(arr);

    that.getCurrentLoopSkulRotation = function () {
        return currentLoopSkulRotation;
    }

    return that;
}


function loopSkulcitosRotation(curr_arr) {

    var that = {};
    var it_skulcitos = 0;

    var rotateSkul_1, rotateSkul_2, rotateSkul_3, rotateSkul_4, rotateSkul_5, rotateSkul_6;
    var rotateSkul_arry = [];

    for (var i = 0; i < 6; i++) {
        rotateSkul_arry.push(window['rotateSkul_' + i]);
    }

    var loopfunc = function (curr_arr) {

        return function (curr_arr) {

            TweenMax.delayedCall(randy(.1, .3), function () {

                if (it_skulcitos < 6) {

                    rotateSkul_arry[it_skulcitos] = rotateSkulcito(curr_arr[it_skulcitos]);
                    loopfunc(curr_arr);

                    console.log(it_skulcitos + ' was created');
                    onProcess = true;
                    it_skulcitos++;
                } else {
                    console.log('finish creating skulcitos');
                    onProcess = false;
                }
            });
        }

    }(curr_arr)


    that.killSkullTweens = function () {

        for (var i = 0; i < 6; i++) {
            rotateSkul_arry[i].changeAllowSkullAnim(false);
        }
    }


    loopfunc(curr_arr);

    return that;

}


function rotateSkulcito(skulcito) {

    var that = {};
    var allowSkullAnim = true;
    var it_skulcitos = 0;


    var loopfunc = function (skulcito) {

        return function (skulcito) {

            TweenMax.delayedCall(randy(1, 3), function () {

                if (allowSkullAnim) {
                    loopfunc(skulcito);

                    //console.log('anim: ' + skulcito);
                    TweenMax.to($(skulcito), .1, {rotation: 20});
                    TweenMax.to($(skulcito), .1, {delay: .1, rotation: 0});
                    TweenMax.to($(skulcito), .1, {delay: .2, rotation: 20});
                    TweenMax.to($(skulcito), .1, {delay: .3, rotation: 0});

                    it_skulcitos++;
                }
            });
        }

    }(skulcito)

    loopfunc(skulcito);


    that.changeAllowSkullAnim = function (on_off) {
        if (on_off) {
            allowSkullAnim = true;
        } else {
            console.log('kill = ' + skulcito);
            allowSkullAnim = false;
        }
    }

    return that;
}


function singleSkulcitoRotation(skulcito) {
    TweenMax.to($(skulcito), .1, {rotation: 20});
    TweenMax.to($(skulcito), .1, {delay: .1, rotation: 0});
    TweenMax.to($(skulcito), .1, {delay: .2, rotation: 20});
    TweenMax.to($(skulcito), .1, {delay: .3, rotation: 0});
}

function scaleSkulcito(skulcito) {
    TweenMax.set($(skulcito), {scale: 1});
    TweenMax.to($(skulcito), .15, {scale: 1.3, yoyo: true, repeat: 1});
}


function distributeSkulcitos(skulcitoID) {

    $(skulcitoID + '1').css('top', 90);
    $(skulcitoID + '2').css('top', ( ($(window).height() / 2) - ( $(skulcitoID + '2').height() / 2 ) ) - ($(skulcitoID + '2').height()));
    $(skulcitoID + '3').css('top', $(window).height() - ( $(skulcitoID + '3').height() + 100 ));

    $(skulcitoID + '4').css('top', 90);
    $(skulcitoID + '5').css('top', ( ($(window).height() / 2) - ( $(skulcitoID + '5').height() / 2 ) ) - ($(skulcitoID + '5').height()));
    $(skulcitoID + '6').css('top', $(window).height() - ( $(skulcitoID + '6').height() + 100 ));
}

/*////////////////// END skulcitos /////////////////////////////////////////////////////*/


function gameLoop() {

    canvasAnim = window.requestAnimationFrame(gameLoop);


    coin.update();
    coin.render();

}


function stopCanvasAnim() {
    cancelAnimationFrame(canvasAnim);
}


function sprite(options) {

    var that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;

    that.gifcontext = options.gifcontext;
    that.bgcontext = options.bgcontext;
    that.namecontext = options.namecontext;
    that.textcontext = options.textcontext;
    that.insisiblecontext = options.insisiblecontext;

    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.update = function () {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

            tickCount = 0;

            // If the current frame index is in range


            saveGif();

            if (frameIndex == numberOfFrames - 1) {
                if (allowsaving) {
                    nowSave = true;
                    gifSpeed = speedWhenCapturing;
                }
            }


            if (frameIndex < numberOfFrames - 1) {
                // Go to the next frame
                frameIndex += 1;

            } else {

                frameIndex = 0;
            }
        }
    };

    that.render = function () {

        // Clear the canvas
        that.gifcontext.clearRect(0, 0, that.width, that.height);

        // draw el fondo
        that.bgcontext.drawImage(backImgUrl, 0, 0);


        // Draw the animation
        that.gifcontext.drawImage(
            that.image,
            (frameIndex * that.width / numberOfFrames),
            0,///top position wey
            that.width / numberOfFrames,
            that.height,
            0,///left position wey
            0,
            that.width / numberOfFrames,
            that.height);


        that.namecontext.fillStyle = '#fff';
        that.namecontext.font = "bold 20px american";
        that.namecontext.textAlign = "left";
        var txt = nombreDelParticipante;
        that.namecontext.fillText(txt, 460 + ((153) - (that.namecontext.measureText(txt).width / 2)), 161);


        that.textcontext.fillStyle = '#fff9e3';
        that.textcontext.textAlign = "center";


        var lineheight = 0;

        switch (actualHead) {
            case 1:
                that.textcontext.font = "23px american";
                lineheight = 23;
                break;
            case 2:
                that.textcontext.font = "28px american";
                lineheight = 28;
                break;
            case 3:
                that.textcontext.font = "24px american";
                lineheight = 24;
                break;
            case 4:
                that.textcontext.font = "24px american";
                lineheight = 24;
                break;
            case 5:
                that.textcontext.font = "24px american";
                lineheight = 24;
                break;
            case 6:
                that.textcontext.font = "24px american";
                lineheight = 24;
                break;
        }


        var x = 30;
        var y = 30;

        var lines = texto_calaverita.split('\n');


        var measureLines = [];

        if (flag) {
            /*flag = false;*/
            for (var i = 0; i < lines.length; i++) {
                measureLines.push(lines[i].length)
            }

            var ind = indexOfMax(measureLines);
            var texto_medido = lines[ind];
            that.insisiblecontext.fillText(lines[ind], 0, 0);


            for (var j = 0; j < lines.length; j++) {

                var newxpos = (20 + (that.insisiblecontext.measureText(texto_medido).width / 2)) + ((390 / 2) - (that.insisiblecontext.measureText(texto_medido).width / 2));

                that.textcontext.fillText(lines[j], newxpos, (140) + (j * lineheight));
            }

        }

    };

    return that;
}

function saveGif() {

    if(spriteLoaded && backLoaded) {
        if (nowSave) {

            count++;
            encoder.addFrame(coin.gifcontext);
            console.log('rcording: ' + count)


            if (count > grabLimit - 1) {
                console.log('stop rcording');

                showResults(encoder);


                allowsaving = false;
                nowSave = false;
                count = 0;
                gifSpeed = normalSpeed;
            }
        }
    }
}


function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return 'calaverita-' + uuid;
}


function uploadGif(imagedata) {

    console.log('posting to giphy');

    var currentName = generateUUID();

    $.ajax({
        url: "save.php",
        // send the base64 post parameter
        data: {
            base64: imagedata,
            uuidname: currentName
        },
        // important POST method !
        type: "post",
        success: function (response) {

            console.log(response);
            console.log(response.url);
            var myurl = 'https://izzi.mx/' + response.url;
            GIPHYGif(myurl);

        },
        complete: function (e) {
            /*console.log(e);
             console.log(e.responseText);
             var myobj = JSON.parse(e.responseText);
             console.log(myobj.url);
             var myurl = 'http://izzi.mx/' + myobj.url;
             GIPHYGif(myurl);*/
        }
    });
}

function changeAllowSaving() {
    allowsaving = true;
};



function showResults() {
    console.log('Finishing');

    encoder.finish();

    stopCanvasAnim();

    var binary_gif = encoder.stream().getData();
    var data_url = 'data:image/gif;base64,' + encode64(binary_gif);
    $('.canvas-container').html('<img src="' + data_url + '"/>');


    $('.dw-hs').bind('click', function () {
        var a = $("<a>").attr("href", data_url).attr("download", "calaverizzima-" + $('#inputusername').val() + ".gif").appendTo("body");
        a[0].click();
        a.remove();
    });

    //$('.preloader-message').html('ya falta poco :O');


    $('.preloader-message').html('listo! :D');
    TweenMax.delayedCall(2, showingPreloader, [false, .4]);


    //uploadGif(data_url);
    //TweenMax.delayedCall(2, showingPreloader, [false, .4]);
}




function GIPHYGif(currentURL) {
    $.ajax({
        type: 'POST',
        url: 'https://upload.giphy.com/v1/gifs',
        data: {
            username: 'alonso19m',
            api_key: 'l0MYMT0GdpmGyJjpK',
            file: '',
            source_image_url: currentURL,
            tags: 'izzi, calaverita'
        },
        success: function (e) {

            console.log(e);
            console.log(e.data.id);

            giphyURL = 'https://media.giphy.com/media/' + e.data.id + '/giphy.gif';

            $('.fb-hs').click(function () {
                shareGal(giphyURL, $('#inputusername').val());
            });

            $('.tw-hs').click(function () {
                tweet('https://giphy.com/gifs/' + e.data.id, 'izzi_mx');
            });


            if (isChingon) {
                setFlowerAnims(animflower_E_arry, 'animflower_E', '.flor-e-');
                skulAnim_E = setSkulcitosRotation('e');
            }


            $('.preloader-message').html('listo! :D');
            TweenMax.delayedCall(2, showingPreloader, [false, .4]);

            //window.open('https://media.giphy.com/media/' + e.data.id + '/giphy.gif');
        },
        error: function () {
            console.log('error')
        }
    });
}



function createCanvasGif() {



    nombreDelParticipante = $('#inputusername').val().toUpperCase();

    textos_calaveritas = [
        "\nDe una fuerte indigestión" +
        "\n" + nombreDelParticipante + " se nos murió. " +
        "\nNi de tacos, ni de garnachas, fue " +
        "\nde pozole que apenas un " +
        "\nplato probó. " +
        "\nEn la otra vida " +
        "\nni los tamales se chutó. " +
        "\nPor eso en nuestra ofrenda " +
        "\nle pondremos esos platillos " +
        "\nque bien saboreó.",

        '\nYa casi no sale' +
        '\n' + nombreDelParticipante + ' a jugar.' +
        '\nPues en esta temporada' +
        '\nsale la flaca a pasear.' +
        '\nPero la muchacha no se' +
        '\nqueda en casa a bailar.' +
        '\nLo que ella prefiere es ver' +
        '\ntele y ponerse a chatear.',

        '\nAhí les encargo, mis amigos,' +
        '\notra pieza de pan de muerto.' +
        '\nAsí tendré qué comer' +
        '\npara este encuentro.' +
        '\nNo estén tristes,' +
        '\nporque aunque parece' +
        '\nque chupé faros,' +
        '\nEstoy muy feliz' +
        '\nentre todos estos ' +
        '\ntipos raros.',

        '\nDe una fuerte indigestión'+
        '\n' + nombreDelParticipante + '  se nos murió'+
        '\nNi tacos ni garnachas, '+
        '\nfue pozole el que probó '+
        '\nAhora en otra vida, '+
        '\nnuestra amiga '+
        '\nnos cuida de lejitos'+
        '\nPor eso en nuestra ofenda '+
        '\nle pondremos sus platillos favoritos',


        '\nYa casi no sale'+
        '\n'+nombreDelParticipante+' a jugar.'+
        '\nPues en esta temporada'+
        '\nsale la flaca a pasear.'+
        '\nPero el muchacho no se'+
        '\nqueda en casa a bailar.'+
        '\nLo que él prefiere es ver'+
        '\ntele y ponerse a chatear.',


        '\nAhí les encargo, mis amigos,' +
        '\notra pieza de pan de muerto.' +
        '\nAsí tendré qué comer' +
        '\npara este encuentro.' +
        '\nNo estén tristes,' +
        '\nporque aunque parece' +
        '\nque chupé faros,' +
        '\nEstoy muy feliz' +
        '\nentre todos estos' +
        '\ntipos raros.'

    ];

    texto_calaverita = textos_calaveritas[actualHead - 1];


    coinImage.src = skullSpriteArray[actualHead - 1];
    backImgUrl.src = fondosArray[actualColor];

    coinImage.addEventListener("load", gameLoop);
    TweenMax.delayedCall(2, changeAllowSaving);

    coinImage.onload = function(){
        console.log('sprite loaded');
        spriteLoaded = true;
    };

    backImgUrl.onload = function(){
        console.log('background loaded');
        backLoaded = true;
    };

}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var indexOfMax = function (arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}


function randy(min, max) {
    return Math.random() * (max - min ) + min;
}


function pos_to_neg(num) {
    return -Math.abs(num)
}


/*FACEBOOK API*/
window.fbAsyncInit = function () {
    FB.init({
        appId: '1906800279460352',
        xfbml: true,
        version: 'v2.5'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function shareGal(_img, _gif) {
    FB.ui({
        method: 'share',
        href: _img,
        caption: 'http://izzi.mx/calaverizzimas'
    }, function (response) {

        /*ga('send', 'event', {
         eventCategory: _gif,
         eventAction: 'compartir-completo'
         });*/

    });
}


function tweet(mygif, mytext) {
    window.open('http://twitter.com/share?text=La calaca vino por mi, y esta Calaverizzima con @izzi_mx escribí. Entra a www.izzi.mx/calaverizzimas&url=' + mygif, '_blank', 'top=0,left=0,width=400,height=400');
}


function get_short_url(long_url, login, api_key) {
    $.getJSON(
        "http://api.bitly.com/v3/shorten?callback=?",
        {
            "format": "json",
            "apiKey": api_key,
            "login": login,
            "longUrl": long_url
        },
        function (response) {
            short_url = response.data.url;
            console.log(short_url);
        }
    );
}

