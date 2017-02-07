export default function () {
	
	$('.js_gallery').magnificPopup({
		type: 'image',
		gallery:{
		    enabled:true,
		    navigateByImgClick: true,
			arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
			closeMarkup: '<button title="%title%" type="button" class="mfp-close">123</button>',
			tPrev: '', // title for left button
			tNext: '', // title for right button
			tCounter: ''
		},
		callbacks: {
			open: function() {
		    	 $('#share-container>div').clone().prependTo( $('.mfp-bottom-bar') );
		    },
		    close: function() {
		      // Will fire when popup is closed
		    },
		    buildControls: function() {
		      // re-appends controls inside the main container
		      this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
		    }
		}
	});
	
	$('.js_fullscreen').magnificPopup({
		type: 'image',
		callbacks: {
			open: function() {
		    	 $('#share-container>div').clone().prependTo( $('.mfp-bottom-bar') );
		    }
		}
	});
	

}