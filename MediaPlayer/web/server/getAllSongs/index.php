<?php
include '../AJAXServer.php';
include '../id3TagReader.php';

class Server extends AJAXServer {
    // ========================================================================
    //
    // Login Handler
    //
    public function handleAction( $request ) {
        // The 'action' requested is named for the folder this server lives in

        // Authenticate with username and password
        // Here is the actual worker function, this is where you do your server sode processing and
        // then generate a json data packet to return.

        // Here is what we will send back (echo) to the person that called us.
        // fill this dictionary with attribute => value pairs, then
        // encode as a JSON string, then
        // echo back to caller
        $response = [];
        $response["error"] = -1;
        $response["songs"] = [];
        $dir = "../../music/";
        $songList = $this->dirToArray($dir);

        foreach ($songList as $song) {
            $tagReader = new ID3TagsReader($dir.$song);
            $songInfo = $tagReader->getInfo();
            array_push($response["songs"], $songInfo);
        }



        // Do what you need to do with the info. The following are some examples.
        // This is the real set of actual things we use
        $response["error"] = 0;

        return $response;
    }

    function dirToArray($dir) {
      $result = array();
      $cdir = scandir($dir);
      foreach ($cdir as $key => $value)
      {
        if (!in_array($value,array(".","..")))
        {
           if (is_dir($dir . DIRECTORY_SEPARATOR . $value))
           {
              $result[$value] = dirToArray($dir . DIRECTORY_SEPARATOR . $value);
           }
           else
           {
              $result[] = $value;
           }
        }
      }
      return $result;
    }
}

$myServer = new Server ();
?>
