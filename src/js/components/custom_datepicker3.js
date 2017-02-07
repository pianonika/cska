var data = {},
	datepickerTimer,
	monthNames = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],
	dayNames   = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Cб"];

$(document).ready(function(){
	
	$datapicker3 = $("#js-datepicker3");
	
	$('#js-datepicker3').datepicker({
		inline: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		dateFormat: "dd.mm.yy",
		firstDay: 1, // понедельник первый в строке
		monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
		monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
		dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
		dayNamesMin: dayNames,
		appendToCell: function(date){
			
			var date   = date.split('.'),
				day    = Number(date[0]),
				month  = date[1],
				year   = date[2],
				text   = '';
			
			if(objHasKeys(data, [year, month, day])){
				var events = data[year][month][day]['events'];
				
				text = '<span class="js_dot ui-datepicker-text"><span class="ui-datepicker-text-inner">'+events['0']+'</span></span>';
				
				if( events[1] ){

					text += '<span class="ui-datepicker-more"><span class="ui-datepicker-more-inner">Еще '+ (Number(events.length) - 1) +'</span><span class="ui-datepicker-more-dots"><span class="ui-datepicker-more-dot"></span><span class="ui-datepicker-more-dot"></span><span class="ui-datepicker-more-dot"></span></span></span>';
					
				} else {
					text += '<span class="ui-datepicker-more"><span class="ui-datepicker-more-dots"><span class="ui-datepicker-more-dot"></span></span></span>'; 
				}
				
			}
			return text;
		},
		onSelect: function(selectedDate) {
			
			var date  = selectedDate.split('.'),
				day   = Number(date[0]),
				month = date[1]-1,
				year  = date[2];
				popup = popupContent(year,Number(date[1]),Number(day));
					
			setTimeout(function(){
				var el = $('.ui-datepicker-calendar td[data-month="'+month+'"][data-year="'+year+'"] a').filter(function() {return $(this).text() == day;}).parent();
				
				$(el).unbind('click');
				$(el).append( popup );
				$(el).addClass('active');
				$('html').addClass('prevent-scroll');
				$('body').addClass('date-detail');
				
				
				var parentLeft  = Number($('.ui-datepicker-calendar').offset().left),
					parentRight = parentLeft + $('.ui-datepicker-calendar').width(),
					popupLeft   = Number($('#calendar-popup',el).offset().left),
					popupRight  = popupLeft + $('#calendar-popup',el).outerWidth();

					if( parentLeft > popupLeft ){
						var diff 	  = parentLeft - popupLeft,
							left 	  = Number($('#calendar-popup',el).css('marginLeft').replace('px','')) + diff,
							arrowLeft = $(el).outerWidth()/2 - $('#calendar-popup .popup-bottom',el).width()/2 + ( $(el).offset().left - $('.ui-datepicker-calendar').offset().left );
						
						$('#calendar-popup',el).css('marginLeft', left );
						$('#calendar-popup .popup-bottom',el).css({'marginLeft':arrowLeft});
						
					} 
					else if( parentRight < popupRight ){
						
						var diff  = popupRight - parentRight,
							left = Number($('#calendar-popup',el).css('marginLeft').replace('px','')) - diff,
							arrowRight = $(el).outerWidth()/2 - $('#calendar-popup .popup-bottom',el).width()/2 + ( parentRight - $(el).offset().left - $(el).outerWidth() );
							
						
						$('#calendar-popup',el).css('marginLeft', left );
						$('#calendar-popup .popup-bottom',el).css({'marginRight':arrowRight});
					}
				
			},10);
			
		},
		beforeShowDay: function(date) {
			
			clearTimeout(datepickerTimer);
			datepickerTimer = setTimeout(function(){
				$(".js_dot").dotdotdot({watch: "window"});
			}, 10);
			$('.ui-datepicker').addClass('ui-datepicker3');
			return setAvaDates(date);
		},
		onChangeMonthYear: function(year, month, inst) {
			updateAvaDates(year, month);
		}
	});
	
	$('body').on('click','#calendar-popup .mfp-close',function(){
		$(this).parents('#calendar-popup').addClass('hidden');
		$( "#js-datepicker3" ).datepicker("refresh");
		$('.ui-datepicker td.active').removeClass('active');
		$('html').removeClass('prevent-scroll');
		$('body').removeClass('date-detail');
		
		
		
	});
	
	$('.js_datepicker-today').click(function(){
		$datapicker3.datepicker('setDate', $(this).attr('data-date'));
		var date  = $(this).attr('data-date').split('.'),
			day   = date[0],
			month = date[1]-1,
			year  = date[2];
		
		setTimeout(function(){
			$('.ui-datepicker-calendar td[data-month="'+month+'"][data-year="'+year+'"] a').filter(function() {return $(this).text() == day;}).parent().trigger('click');
		}, 10);	
		
		
	});
	
});

function popupContent(year,month,day){
	
	var html   = '<div class="common__popup common__popup__child" id="calendar-popup">',
		events = data[year][month][day]['events'],
		dayNum = new Date(year,month,day).getDay();
	
	html += '<h2 class="common__h2-deco common__h2-deco__small">'+dayNames[dayNum]+', '+ day+' '+monthNames[month-1]+' '+year+'</h2><ul class="dates-list">';
	
	for (var key in events) {
	   	html += '<li>'+events[key]+'</li>';
	}
	html += '</ul><button title="Close (Esc)" type="button" class="mfp-close mfp-close_small">×</button><div class="popup-bottom"></div></div>';	
	
	return html;
}

function setAvaDates(date){
	
	var a_year  = date.getFullYear();
	var a_month = date.getMonth();
	a_month = a_month + 1;
	var a_day   = date.getDate();

	if(objHasKeys(data, [a_year, a_month, a_day])){
		
		return [true, ''];
	}
	
	return [false, ''];
}

function updateAvaDates(year, month){
	$.ajax({
		url:  "./ajax/6.php",  
		dataType : "json",  
		type: 'GET', 		
		data: {
			month: month,
			year: year
		},
		success: function (rspData, textStatus) {
			
			console.log(rspData);
			
			data = rspData;
			$datapicker3.datepicker("refresh");
			
		},
		error: function (data, textStatus) {
			alert("Что-то пошло не так");
		}
    });
};

function objHasKeys(obj, keys) {
  var next = keys.shift();
  return obj[next] && (! keys.length || objHasKeys(obj[next], keys));
}