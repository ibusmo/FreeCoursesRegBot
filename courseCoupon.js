// ==UserScript==
// @name         courseCoupon
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.onlinecoursesupdate.com/2*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    var buttonText = 'Take This Course';
    var delay = 100;

    function getTakeThisCourseLink() {
        let elements = document.getElementsByTagName('a');

        for(let i=0; i<elements.length; ++i){
            let text = elements[i].innerHTML;

            if (text.toLowerCase().includes(buttonText.toLowerCase())) {
           		let link = elements[i].getAttribute("href");
                // console.log(i + ' ' + text + ' ' + link);

        		return link;

            } else {}
        }

        return null;
    }

	function closeWindow() {
     	setTimeout(function() {
			window.close();
		}, delay);
	}

    var link = getTakeThisCourseLink();
    if (link) {
	    console.log(link);
	    window.open(link, '_self');

    } else {
	    console.log('Coupon not found !!!');
    	closeWindow();

    }

})();
