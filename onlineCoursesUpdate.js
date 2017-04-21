// ==UserScript==
// @name         onlineCoursesUpdate
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.onlinecoursesupdate.com/search*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

//http://www.onlinecoursesupdate.com/search?max-results=100
//http://www.onlinecoursesupdate.com/search
//updated-max=2017-04-20T18:30:00%2B07:00
//max-results=12

(function() {
    'use strict';

    var delay = 3000;
    var closeDelay = 10000;
    var buttonText = 'links to this post';

    function getCourseLinks() {
        let links = [];
        let elements = document.getElementsByTagName('a');

        for(let i=0; i<elements.length; ++i){
            let text = elements[i].innerHTML;
            
            if (text.toLowerCase().includes(buttonText.toLowerCase())) {
            	let link = elements[i].getAttribute("href");
                // console.log(i + ' ' + text + ' ' + link);
                links.push(link);

            } else {}
        }
        
        return links;

    }

    function openLinkAsNewTab(link) {
        window.open(link, '_blank');

    }

  	var i = 0;
  	function openCourseLink() {
  		//operation
  		let link = links[i];
  		
  		if (link) {
         		console.log(i + ' ' + link);
          	openLinkAsNewTab(link);

  		}

          //delay controller
  	    i++;
  	    if( i < links.length ){
  	        setTimeout( openCourseLink, delay );

  	    } else {

  	    	closeWindow();
  	    }

  	}

  	function closeWindow() {
       	setTimeout(function() {
  			window.close();
  		}, closeDelay);

  	}

  	function takeAllTheseCourses(links) {
     		console.log('There are ' + links.length + ' courses.');
     		
     		if (links) {
     			openCourseLink();

     		} else {
     			console.log('There is no course.');
     			closeWindow();

     		}

  	}

  	function KeyCheck(e)
  	{
         	console.log(e.keyCode);
         	if (e.keyCode === 73) {			//g
         		console.log('HIT & RUN');
         		takeAllTheseCourses(links);
         	}
  	}

  	window.addEventListener('keydown', KeyCheck, true);

  	var links = getCourseLinks();
    setTimeout(function() {
        takeAllTheseCourses(links);
    }, delay);

})();
