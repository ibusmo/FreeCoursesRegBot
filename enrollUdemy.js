// ==UserScript==
// @name         enrollUdemy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.udemy.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    var buynowButtonText = 'Buy Now';
    var enrollButtonText = 'Enroll Now';
    var currentPriceClassText = 'price-text__current';
    var delay = 100;

    function checkPrice() {
        let elements = document.getElementsByTagName('span');

        for(let i=0; i<elements.length; ++i) {
            let text = elements[i].getAttribute("class");

    		if (text) {
	            if (text.toLowerCase().includes(currentPriceClassText.toLowerCase())) {
	            	if (elements[i].innerHTML.toLowerCase().includes('free')) {
	                	console.log('This course is free' + ' ' + text + ' ' + elements[i].innerHTML);

	        			return true;
	            	
	            	}
	            } else {}
	        }
	    }

        console.log('This course is not free !!!');
        
        return false;

    }

    function getEnrollLink() {
        let elements = document.getElementsByTagName('a');
        
        for(let i=0; i<elements.length; ++i) {
            let text = elements[i].innerHTML;

            if (text.toLowerCase().includes(enrollButtonText.toLowerCase())) {
            	let link = elements[i].getAttribute("href");
            	console.log('Enroll Now link is found');
                // console.log(i + ' ' + text + ' ' + link);

        		return link;

            } else {}
        }
        
        console.log('Enroll Now Link NOT found !!!');

        return null;

    }

    function getBuyNowLink() {
        let elements = document.getElementsByTagName('a');

        for(let i=0; i<elements.length; ++i) {
            let text = elements[i].innerHTML;

            if (text.toLowerCase().includes(buynowButtonText.toLowerCase())) {
            	let link = elements[i].getAttribute("href");
            	console.log('Buy Now link is found');
                // console.log(i + ' ' + text + ' ' + link);

        		return link;

            } else {}
        }

        console.log('Buy Now Link NOT found !!!');

        return null;

    }

    function linkDidTapped(link) {
    	if (link) {
    		console.log(link);
   	 		window.open(link, '_self');

    	}
    }

    function takeThisCourse() {
	    let isFree = checkPrice();
    	let enrollLink = getEnrollLink();
    	let buynowLink = getBuyNowLink();

	    if (isFree) {
	    	console.log('This course is free');
	    	linkDidTapped(enrollLink);
	    	linkDidTapped(buynowLink);

	    } else {
	    	console.log('This course is NOT free !!!');
	    	closeWindow();

	    }
	}

	function closeWindow() {
     	setTimeout(function() {
			window.close();
		}, delay);
	}

	takeThisCourse();

})();
