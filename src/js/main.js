import sliders from './components/sliders';
import handlers from './components/handlers';
import form from './components/form';
import popups from './components/popups';
import formstyler from './components/formstyler';
import table from './components/table';
import videoPlayer from './components/video-player';
import header from './components/header';
import filter from './components/filter';
import datepicker from './components/datepicker';
import map1 from './components/scheme-map';

$(function(){
	sliders();
	handlers();
	form();
	popups();
	formstyler();
	table();
	videoPlayer();
	header();
	filter();
	datepicker();
});

ymaps.ready(function(){
	map1();
});
