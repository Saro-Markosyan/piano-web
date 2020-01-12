$(function () { 
	
	createElements();
    
    function playNote(fileName, btnID, key) { 
        var audio = new Audio(fileName);
        audio.play();
        var btn = $(btnID).addClass('down_' + (/pitch/.test(btnID) ? 'ptch' : 'sharp'));  
    };
        
    var isClick = false;
    var menuConfigCreated = false;
    var menuConfig = false;
    var keyAssistOffOn = false;
    var keyAssistFirst = true;
    var insturment;
    
	function createElements () {
        var menuConfigBtns = [];
        var menuChangeStyleColors = ['#530358', '#2C5600', '#071635', '#672B06', '#FEF79C', '#FFFFFF'];
        var changeStyle = 0;
        var menuShow = [];
        insturment = 'piano';
        
        $("header").append("<span id='piano' class='piano'>PIANO</span>",
                           "<span id='xylophone' class='xylophone'>XYLOPHONE</span>").css("color:#fff");
        
        $('#piano').click(function() {
                insturment = 'piano';
                $('#piano').css("color",  "#ff8322");
                $('#xylophone').css("color",  "#fff");
        });
        
        $('#xylophone').click(function(){
                insturment = 'xylophone';
                $('#xylophone').css("color",  "#ff8322");
                $('#piano').css("color",  "#fff");
        });
        
        
        var $divPointLeft = $("<div>", {id: "divPointLeft", "class": "divPointLeft"});    
        $($divPointLeft).appendTo('main');    
        var $imgPointLeft = $("<img>", {"class": "imgPointLeft", 
                              attr: { src: 'content/images/virtual_piano.png' }
                                       });
        
        $($imgPointLeft).appendTo($divPointLeft);
        
        var $divMenu = $("<div>", {id: "menu", "class": "menuPiano"});
        $(".divPointLeft").after($divMenu);
        var $spanPlay = $("<span>", {id: "spanPLay", "class": "spanPlay"});
        $spanPlay.text("PLAY!");
        menuShow[0] = $spanPlay;
        $('#menu').append($spanPlay);
        
        var $divMenuRight = $("<div>", {id: "menuRight", "class": "menuRight"});
        menuShow[1] = $divMenuRight;
        var $spanYourKeyboard = $("<span>", {id: "yourKeyboard", "class": "yourKeyboard"});
        $spanYourKeyboard.text("YOUR KEYBOARD:");
        var $divPressAKey = $("<div>", {"class": "pressAKey"});
        $divPressAKey.text("PRESS A KEY");
        
        $('.spanPlay').after($divMenuRight);
        $('#menuRight').append($spanYourKeyboard);
        $('#menuRight').append($divPressAKey);
        
        $spanBtnMenu = $("<span>", {id: "spanBtnMenu", "class" : "spanBtnMenu"});
        $menuBtn = $("<button>", {id: "menuBtn", "class": "menuBtn"});
        $menuBtn.text("MENU");
        
        var titles = ['shift', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
        
        $menuBtn.click(function() {
            if (!menuConfigCreated) {
                menuConfigBtns[0] = $("<button>", {id: "musicSheets", "class": "musicSheets"});
                menuConfigBtns[0].addClass("menuBtnConf");
                menuConfigBtns[0].text("MUSIC SHEETS");
                menuConfigBtns[0].click(function() {
                   window.open('https://virtualpiano.net/category/music-sheets/');
                });
                menuConfigBtns[1] = $("<button>", {id: "keyAssistOff", "class": "keyAssistOff"});
                menuConfigBtns[1].addClass("menuBtnConf");
                menuConfigBtns[1].text("KEY ASSIST OFF");
                menuConfigBtns[1].click(function() {
                    
                    
                    if (keyAssistFirst) {
                        $('.spanAssertKey').css('margin-left', '-15px');
                        $('.spanAssertSharp').css('margin-left', '-9px');
                    }
                    
                    if (!keyAssistOffOn) {
                        keyAssistOffOn = true;
                        
                        if (!keyAssistFirst) {
                            $('.spanAssertKey').css('margin-left', '0');
                            $('.spanAssertSharp').css('margin-left', '0');
                        }
                        
                        $('.spanAssertKey').show();
                        $('.spanAssertSharp').show();
                        
                        $(this).text("KEY ASSIST ON");
                    } else {
                        keyAssistOffOn = false;
                        keyAssistFirst = false;
                        
                        $('.spanAssertKey').hide();
                        $('.spanAssertSharp').hide();
                        
                        $(this).text("KEY ASSIST OFF");
                    }
                });
                menuConfigBtns[2] = $("<button>", {id: "changeStyle", "class": "changeStyle"});
                menuConfigBtns[2].addClass("menuBtnConf");
                menuConfigBtns[2].text("CHANGE STYLE");
                menuConfigBtns[2].click(function() {
                    if (changeStyle != 5) {
                        $('body').css('background', menuChangeStyleColors[changeStyle]);
                        changeStyle++;
                    }  else {
                        $('body').css('background', menuChangeStyleColors[changeStyle]);
                        changeStyle = 0;
                    }
                });
                menuConfigBtns[3] = $("<button>", {id: "theWorld", "class": "theWorld"});
                menuConfigBtns[3].addClass("menuBtnConf");
                menuConfigBtns[3].text("THE WORLD")
                menuConfigBtns[3].click(function() {
                   window.open('https://virtualpiano.net/the-world/'); 
                });
                for (var t = 3; t >= 0; t--) {
                    $('.menuPiano').prepend(menuConfigBtns[t]);
                    menuConfigBtns[t].hide;
                }
                
                menuConfigCreated = true;
            }
            
            if (!menuConfig) {
                
                menuConfig = true;
                $menuBtn.text("BACK");
                for (var t = 0; t < menuShow.length; t++) {
                    menuShow[t].hide();
                }
                
                for (var t = 0; t < menuConfigBtns.length; t++) {
                    menuConfigBtns[t].show();
                }
            } else {
                menuConfig = false;
                $menuBtn.text("MENU");
                for (var t = 0; t < menuShow.length; t++) {
                    menuShow[t].show();
                }
                
                for (var t = 0; t < menuConfigBtns.length; t++) {
                    menuConfigBtns[t].hide();
                }
   
            }
            
        });
        $btnHelp = $("<button>", {id: "btnHelp", "class": "btnHelp"});
        $btnHelp.text("?");
        $btnHelp.click(function() {
            window.open('http://virtualpiano.net/music-sheets/how-to-play/');
        });
        
        $('.menuRight').after($spanBtnMenu);
        $('#spanBtnMenu').append($menuBtn);
        $('#spanBtnMenu').append($btnHelp);
        
        $divRightPoint = $("<div>", {id: "divRightPoint", "class": "divRightPoint"});
        $($divRightPoint).appendTo('main');
        
        var $aMadeByCrystal = $("<a>", {"class": "aMadeByCrystal"});
        $aMadeByCrystal.attr("href", "http://www.cmagics.com/");
        $aMadeByCrystal.text("MADE BY CRYSTAL MAGIC STUDIO");
        
        $('#divRightPoint').append($aMadeByCrystal);
        
        $divDivider = $("<div>", {id: "divDivider", "class": "divDivider"});
        
        $($divDivider).appendTo('main');
        
        /*$('#divRightPoint').append($('<a href="http://www.cmagics.com/">').text('MADE BY CRYSTAL MAGIC STUDIO'));*/
        
        
        var $divContainer = $("<div>", {id: "container", "class": "container"});        
        $($divContainer).appendTo('main');
        
        var i;
        for (i = 0; i < 35; i++) {
            var $divKeys = $("<div>", {id:"key" + i,"class":"key" + i});
            $divKeys.addClass('keys');
            $('#container').append($divKeys);
        }
            
        var sharpInvisableIndexes = [2, 6, 9, 13, 16, 20, 23, 27, 30, 34];
        var $spanAssertKeys;
        var $spanAssertSharp;
        var $divNotes;
        var $divPlus;
        var $divArrow;
        for (var j = 0; j < 35; j++) {
            $buttonPitch = $("<button>", {id: "pitch" + j, "class": "pitch"+ i});
            $buttonSharp = $("<button>", {id: "sharp" + j, "class": "sharp" + i});
            $buttonPitch.addClass('pitch');
            $buttonSharp.addClass('sharp');
            
            $spanAssertSharp = $("<span>", {id: "spanAssertSharp", "class": "spanAssertSharp"});
            $divNotes = $("<div>", {id: "notesSharp", "class": "notesSharp"});
            $divNotes.text(titles[j + 1]);
            $divPlus = $("<div>", {id: "assertPlus", "class": "assertPlus"});
            $divPlus.text("+");
            $divArrow = $("<div>", {id: "assertArrow", "class": "assertArrow"});
            $divArrow.text('\u27A8');
            $spanAssertSharp.append($divNotes);
            $spanAssertSharp.append($divPlus);
            $spanAssertSharp.append($divArrow);
            
            $buttonSharp.append($spanAssertSharp);
            $spanAssertSharp.hide();
            
            $spanAssertKeys = $("<span>", {id: "spanAssertKey", "class": "spanAssertKey"});
            $spanAssertKeys.text(titles[j+1]);
            $buttonPitch.append($spanAssertKeys);
            $spanAssertKeys.hide();

            $($buttonPitch).appendTo(".key" + j);
            $($buttonSharp).appendTo(".key"+ j);
        }
        var btn;
        $('.sharp').each(function(i, obj){
            //if (/^3$|^7$|10|14|17|21|24|28|31|35|36/.test(i.toString)) {
            if (sharpInvisableIndexes.includes(i)) {
                obj.classList.add('sharp', 'invisiable');
            }
            isClick = false;
            var temp = i+1;
            $(obj).on("mousedown", function() {
                
                var audio = new Audio('./sounds/'+ insturment + '/sh_' + temp + '.mp3');
                audio.play();
                
                btn = $(this).addClass("down_sharp");  
                isClick = true;
            });
            
            $('#sharp' + i).bind("mouseenter mouseleave keyup mouseup", function(e) {
                   if (e.type == "mouseenter") {
                    
                       var fileName = './sounds/'+ insturment + '/sh_' + temp + '.mp3';
                       if (isClick) {
                            playNote(fileName, '#sharp' + i); 
                       }
                       var a = 10 + 5;
                   } else if (e.type == "mouseleave") {
                        $(this).removeClass('down_sharp');
                   } else if (e.type == "keyup") {
                        $(this).removeClass('down_sharp');
                   } else {
                       isClick = false;
                   }
            });
            
        });

        $('.pitch').each(function(i, obj) {
                    
              var temp = i+1;
              
              isClick = false;
              $(obj).on("mousedown", function() {

                    var audio = new Audio('./sounds/' + insturment + '/ptch_' + temp + '.mp3');
                    audio.play();
                    isClick = true;
                    var btn =  $(this).addClass("down_ptch"); 
                });  

                $('#pitch' + i).bind("mouseenter mouseleave keyup mouseup", function(e) {
                       if (e.type == "mouseenter") {
                           var fileName = './sounds/'+ insturment + '/ptch_' + temp + '.mp3';
                           if (isClick) {
                             playNote(fileName, '#pitch' + i);
                           }
                       } else if(e.type == "mouseleave") {
                           $(this).removeClass('down_ptch');
                       } else if(e.type == "keyup") {
                           $(this).removeClass('down_ptch');
                       } else {
                          isClick = false;                
                       }
                });
        });
        
        $(document).on('keydown', function (e) {
            var str = String.fromCharCode(e.keyCode);
            if (!/[\da-z]/i.test(str)) {
                return;
            }
            
            var index = titles.indexOf(String.fromCharCode(e.keyCode + (e.keyCode >= 48 && e.keyCode <= 57 ? 0 : 32)));
            var fileName;
            if (e.shiftKey) {
                fileName = './sounds/' + insturment + '/sh_' + index + '.mp3';
                index--;
                
                playNote(fileName, '#sharp' + index);
            } else {
                fileName = './sounds/'+ insturment +'/ptch_' + index + '.mp3';
                index--;
                playNote(fileName, '#pitch' + index);
            }
            
            
            
             $(document).on('keyup', function () {
                    if (e.shiftKey) {
                        $('#sharp' + index).removeClass('down_sharp');
                    } else {
                        $('#pitch'+ index).removeClass('down_ptch');
                    }
             });
        });
        
        
        $(document).on("mouseup", function(e){
            if (e.type == "mouseup") {
                isClick = false;
            }
        });
    }
})