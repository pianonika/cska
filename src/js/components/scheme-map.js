export default function () {
   var myMap = new ymaps.Map("path-scheme__map", {
           center:[55.7933971394812,37.53946434116031],
           zoom:15,
           controls: []
       }),
       objects = [
	   		[55.795252716687386,37.538989560852016],
	   		[55.794225209334456,37.53744460845945],
	   		[55.78949706894418,37.53400199999998],
	   		[55.7902510689461,37.54448549999999]
       ],
       pathes = [
       	    [55.80002139476088,37.53437737879303],
       	    [55.790447145122,37.556617987576594]
       ],    
       redPlacemarkStyle = {
       	   iconLayout: 'default#image',
	       iconImageHref: './img/map_red.svg',
		   iconImageSize: [57, 55],
		   iconImageOffset: [-19, -55]
       },
       bluePlacemarkStyle = {
       	   iconLayout: 'default#image',
	       iconImageHref: './img/map_blue.svg',
		   iconImageSize: [57, 55],
		   iconImageOffset: [-19, -55]
       },
       collection = new ymaps.GeoObjectCollection();
	   myMap.geoObjects.add(collection);
       
       
       for(var i = 0; i<objects.length; i++){
	       
	       if(i>0){
		        var myPlacemark = new ymaps.Placemark(objects[i],{},bluePlacemarkStyle);
	       } else {
		       var myPlacemark = new ymaps.Placemark(objects[i],{},redPlacemarkStyle);
	       }
	       
		   myMap.geoObjects.add(myPlacemark);
	       

       }
	   
	   
	   
	   
    $('.js_show-pathes').click(function(){
		 myMap.setCenter([55.7933971394812,37.53946434116031]);
		 myMap.setZoom(14);
		 addPathes();
    });
    $('.js_show-parking').click(function(){
	    myMap.setCenter(objects[$(this).attr('data-id')]);
		myMap.setZoom(16);
		removePathes();
    });
    
    function addPathes(){
	    for(var i = 0; i<pathes.length; i++){
		   var color;
		   
		   if(i>0){
				color = "#1b3d83";   
		   } else {
			   color = "#ee1c25"; 
		   }
		   
		   var multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: [
                pathes[i],
		        objects[0]
            ],
            params: {
                //Тип маршрутизации - пешеходная маршрутизация.
	                routingMode: 'pedestrian',
	                routeMarker: false
	            }
	        }, {
	            // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
	            boundsAutoApply: false,
			    routeActivePedestrianSegmentStrokeColor: color,
			    routeActivePedestrianSegmentStrokeOpacity: 1,
			    routeActivePedestrianSegmentStrokeStyle: "solid",
			    
			    wayPointVisible:false,
			    viaPointVisible:false,
			    pinVisible:false,
	        });
		    collection.add(multiRoute);
	   }
    }
    function removePathes(){
	    collection.removeAll();
    }
}