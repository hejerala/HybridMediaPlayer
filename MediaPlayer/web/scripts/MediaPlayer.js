/**
 * App Singleton MAIN
 *
 * @copyright: (C) 2014-2016 Vancouver Film School. All Rights Reserved.
 * @author: Hector Ramirez {@link mailto:pg08hector@vfs.com}
 * @version: 1.2.0
 *
 * @summary: Framework Singleton Class to contain a web app
 *
 */
'use strict';

// Introduce a "namespace"
var vfs = {
	__private__: new WeakMap(),
	mediaPlayer: null,
	appHandler: null
};

// Define the App Controller
class MediaPlayer {

    constructor() {

        // the local object contains all the private members used in this class
        // Do some initialization of the member variables for the app
	    var myData = {
				self: this,
				musicDir: "music/",
				songList: [],
				songPlayerList: [],
				currentSong: -1,
				currentVolume: 70,
				isPlaying: false,
				spinner: null,
        done:   false,
        userId: 0
	    };
	    vfs.__private__.set( this, myData );
	    var my = myData;

		$( "#pause-icon" ).hide();

		$( "#song-progress" ).slider({
			value: 0,
			orientation: "horizontal",
			min: 0,
			max: 100,
			step: 1,
			range: "min",
			animate: true,
			disabled: true
	    });

		var handle = $( "#custom-handle" );
		$( "#volume-range" ).slider({
			value: my.currentVolume,
			orientation: "horizontal",
			min: 0,
			max: 100,
			step: 1,
			range: "min",
			animate: true,
			create: function() {
				handle.text( $( this ).slider( "value" ) );
			},
			slide: function( event, ui ) {
				handle.text( ui.value );
				my.self.changeVolume(ui.value);
			},
			change: function( event, ui ) {
				if(ui.value != my.currentVolume) {
					handle.text( ui.value );
					my.self.changeVolume(ui.value);
				}
			}
	    });

		$(function() { FastClick.attach(document.body); });

		var spinnerOpts = {
			lines: 13 // The number of lines to draw
			, length: 28 // The length of each line
			, width: 14 // The line thickness
			, radius: 42 // The radius of the inner circle
			, scale: 1 // Scales overall size of the spinner
			, corners: 1 // Corner roundness (0..1)
			, color: '#000' // #rgb or #rrggbb or array of colors
			, opacity: 0.25 // Opacity of the lines
			, rotate: 0 // The rotation offset
			, direction: 1 // 1: clockwise, -1: counterclockwise
			, speed: 1 // Rounds per second
			, trail: 60 // Afterglow percentage
			, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
			, zIndex: 2e9 // The z-index (defaults to 2000000000)
			, className: 'spinner' // The CSS class to assign to the spinner
			, top: '50%' // Top position relative to parent
			, left: '50%' // Left position relative to parent
			, shadow: false // Whether to render a shadow
			, hwaccel: false // Whether to use hardware acceleration
			, position: 'absolute' // Element positioning
		}
		my.spinner = new Spinner(spinnerOpts);

	}


	run() {
        // Run the app
		var my = vfs.__private__.get( this );
		// One way to make private things easier to read as members
		this.getAllSongs();
	}

	getAllSongs() {
		var my = vfs.__private__.get( this );
		var target = document.getElementById('playlist-list');
		my.spinner.spin(target);

		var us_requestParams = {action: "getAllSongs"};
		// Note: the trailing slash IS important
		$.post( "server/getAllSongs/", us_requestParams ).then( function( data ) {
			// this callback is triggered WHEN we get a response
			var response = $.parseJSON( data );
			var songList = response.songs;
			my.songList = songList;
			var songCount = songList.length;

			for(var i=0; i<songCount; i++) {
				var newItem = document.createElement('li');
				var txt = document.createTextNode(songList[i].Title+" by "+songList[i].Author);
				var attr = document.createAttribute("song-id");        // Create a "href" attribute
				attr.value = i;
				newItem.id = "playlist-item-"+i;
				newItem.className = "list-group-item playlist-item";
				newItem.setAttributeNode(attr);
				newItem.appendChild(txt);
				document.getElementById('playlist-list').appendChild(newItem);

				my.songPlayerList.push(
					new buzz.sound(my.musicDir+songList[i].Title, {
				    formats: [ "mp3", "ogg", "aac", "wav" ],
				    preload: false,
				    autoplay: false,
				    loop: false,
					volume: my.currentVolume
				}));
				my.songPlayerList[i].bind("timeupdate", function(e) {
					var timer = my.songPlayerList[my.currentSong].getPercent();
					$( "#song-progress" ).slider( "value", timer );
				})
				my.songPlayerList[i].bind("ended", function(e) {
					my.self.nextSong();
				})
			}

			my.self.addClickEvents();

			my.spinner.stop();
		});
	}

	addClickEvents() {
		var my = vfs.__private__.get( this );
		$('#previous-icon').on('click', function( event ) {
		    event.preventDefault();
			my.self.previousSong();
		});
		$('#play-icon').on('click', function( event ) {
			event.preventDefault();
			my.self.playSong((my.currentSong == -1)?0:my.currentSong);
		});
		$('#pause-icon').on('click', function( event ) {
			event.preventDefault();
			my.self.pauseSong();
		});
		$('#next-icon').on('click', function( event ) {
			event.preventDefault();
			my.self.nextSong();
		});
		$('.playlist-item').on('click', function( event ) {
			event.preventDefault();
			my.self.playSong(parseInt(event.target.getAttribute("song-id")));
		});
	}

	playSong(songId) {
		var my = vfs.__private__.get( this );
		if(my.currentSong != songId) {
			if(my.currentSong != -1)
				my.songPlayerList[my.currentSong].stop();
			$( "#play-icon" ).hide();
			$( "#pause-icon" ).show();
			$("#current-song-title").text(my.songList[songId].Title+" by "+my.songList[songId].Author);
			my.songPlayerList[songId].setVolume(my.currentVolume);
			my.songPlayerList[songId].play();
			my.currentSong = songId;
		} else {
			if(my.songPlayerList[my.currentSong].isPaused()) {
				my.songPlayerList[my.currentSong].play();
				$( "#play-icon" ).hide();
				$( "#pause-icon" ).show();
			}
		}
		if(typeof(navigationHandler) != "undefined")
			navigationHandler.songPlayed(my.songList[songId].Title+" by "+my.songList[songId].Author);
	}

	pauseSong() {
		var my = vfs.__private__.get( this );
		my.songPlayerList[my.currentSong].pause();
		$( "#pause-icon" ).hide();
		$( "#play-icon" ).show();
	}

	previousSong() {
		var my = vfs.__private__.get( this );
		if(my.currentSong == 0) {
			my.self.playSong(my.songList.length-1);
		} else {
			if(my.currentSong == -1) {
				my.self.playSong(0);
			} else {
				my.self.playSong(my.currentSong-1);
			}
		}
	}

	nextSong() {
		var my = vfs.__private__.get( this );
		if(my.currentSong == my.songList.length-1) {
			my.self.playSong(0);
		} else {
			my.self.playSong(my.currentSong+1);
		}
	}

	changeVolume(vol) {
		var my = vfs.__private__.get( this );
		if(my.currentSong != -1)
			my.songPlayerList[my.currentSong].setVolume(vol);
		my.currentVolume = vol;
	}

	changeVolumeApp(vol) {
		var my = vfs.__private__.get( this );
		var newVol = my.currentVolume+vol;
		if(newVol <= 0)
			newVol = 0;
		if(newVol >= 100)
			newVol = 100;
		$( "#volume-range" ).slider( "value", newVol );
	}

	getSongTitle() {
		var my = vfs.__private__.get( this );
		if(my.currentSong != -1) {
			return my.songList[my.currentSong].Title+" by "+my.songList[my.currentSong].Author;
		} else {
			return "No song currently playing."
		}
	}

}  // Run the unnamed function and assign the results to app for use.


// ===================================================================
// MAIN
// Define the set of private methods that you want to make public and return
// them
$(document).ready( function() {
  var mp = new MediaPlayer();
  mp.run();
	vfs.mediaPlayer = mp;

	if(typeof(navigationHandler) != "undefined") {
		if(navigationHandler == null) {
			navigationHandler = {
	            songPlayed: function() {
	            }
	        };
		}
	}

});
