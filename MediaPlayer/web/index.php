<!DOCTYPE html>
<!--
MediaPlayer

@Copyright 2014-2017, Vancouver Film School

@Author: Hector Ramirez

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

-->
<html>
	<head>
		<meta name="viewport" content="width=device-width">
	    <title>Media Player</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
		<link rel='stylesheet' href='css/style.css'>
		<link rel='stylesheet' href='css/media.css'>
	    <!-- Local styles -->
	    <style type='text/css'></style>

	</head>
    <body>
        <!-- The Structure of your app is here - Box model blocks of area -->
        <section id='app-frame'>
            <div class="clearfix"><!-- clear --></div>

	        <section id='wrapper' class='main flex-container'>

	            <div id='app-area' class='content container flex-item'>

	                <div id='app-screen'>

                    <div id='player-area'>
											<h3 id="current-song-title">Current Song</h3>
											<div id="song-progress"></div>
											<span id="previous-icon" class="glyphicon glyphicon-step-backward"></span>
											<span id="play-icon" class="glyphicon glyphicon-play"></span>
											<span id="pause-icon" class="glyphicon glyphicon-pause"></span>
											<span id="next-icon" class="glyphicon glyphicon-step-forward"></span>
											<div id="volume-range">
												<div id="custom-handle" class="ui-slider-handle"></div>
											</div>
											<span id="lower-icon" class="glyphicon glyphicon-volume-down"></span>
											<span id="higher-icon" class="glyphicon glyphicon-volume-up"></span>
                    </div>
										<div id='playlist-area'>
											<ul id='playlist-list' class="list-group">
											</ul>
										</div>

	                </div>
	            </div>
            </section> <!-- wrapper -->
        </section>

        <section id="scripts">
		    <!-- This is the key CDN to pull jQuery from -->
		    <!-- To operate offline we may want these to load from a local source -->
		    <script src='//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>
			<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
			<script src="scripts/jquery.ui.touch-punch.min.js"></script>
			<!-- <script src='//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js' defer></script> -->
			<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
			<script src='scripts/buzz.min.js' type="text/javascript" defer></script>

          <!--
           Load your app core here, while not strictly W3C compliant it guarentees
           that the basic HTML gets loaded and you have something to start
           debugging if any of your code fails.
         -->
		 	<script src='scripts/spin.min.js' type="text/javascript" defer></script>
			<script src='scripts/fastclick.js' type="text/javascript" defer></script>
			<script src='scripts/MediaPlayer.js' type="text/javascript" defer></script>
        </section>
</body>
</html>
