/*
* adapt-backgroundImageReady
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Oliver Foster <oliver.foster@kineo.com>
*/

define(function(require) {

	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');

	function backgroundImageReady(callback) {
		var urls = [];
		var re = new RegExp("url(.*)");
		for (var i =0; i < this.length; i++) {
			var bis = this[i].getElementsByCSSAttributeName("background-image");
			var bs = this[i].getElementsByCSSAttributeName("background");
			for (var bi = 0; bi < bis.length; bi++) {
				var biElement = bis[bi];
				var biValue = $(biElement).css("background-image");
				var match = re.exec(biValue);
				if (match !== null) {
					urls.push(match[0].substr(4,match[0].length-5));
				}
			}
			for (var b = 0; b < bs.length; b++) {
				var bElement = bs[b];
				var bValue = $(bElement).css("background");
				var match = re.exec(biValue);
				if (match !== null) {
					urls.push(match[0].substr(4,match[0].length-5));
				}
			}
		}
		urls = _.unique(urls);
		var images = [];
		for (var u =0; u < urls.length; u++) {
			images.push(new Image());
		}
		$(images).imageready(callback);
		for (var u =0; u < urls.length; u++) {
			images[u].src = urls[u];
		}	

		return urls;
	}
	
	function getElementsByCSSAttributeName(name) {
		if (name === undefined) throw "Must specify a css attribute name";

		var tags = this.getElementsByTagName('*'), el;

		var rtn = [];
		for (var i = 0, len = tags.length; i < len; i++) {
		    el = tags[i];
		    if (el.currentStyle) {
		    	var scriptName = changeCSSAttributeNameFormat(name);
		        if( el.currentStyle[scriptName] !== 'none' ) 
		        	rtn.push(el);		       		
		    }
		    else if (window.getComputedStyle) {
		        if( document.defaultView.getComputedStyle(el, null).getPropertyValue(name) !== 'none' ) 
		        	rtn.push(el);
		    }
		}
		return rtn;
	}

	function changeCSSAttributeNameFormat(CSSName) {
		var noDash = CSSName.replace(/-/g," ");
		var titleCase = toTitleCase(noDash);
		var noSpace = titleCase.replace(/ /g, "");
		var lowerCaseStart = noSpace.substr(0,1).toLowerCase() + noSpace.substr(1);
		return lowerCaseStart;
	}

	function toTitleCase(str){
	    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}

	Element.prototype.getElementsByCSSAttributeName = getElementsByCSSAttributeName;

	$.fn.backgroundImageReady = backgroundImageReady;

})