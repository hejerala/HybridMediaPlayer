package com.example.hector.mediaplayer;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

/**
 * Created by Hector on 6/10/2017.
 */

public class NavigationHandler {
    Context mContext;

    /** Instantiate the interface and set the context */
    NavigationHandler(Context c) {
        mContext = c;
    }

    @JavascriptInterface
    public void songPlayed(String songTitle) {
        Toast.makeText(mContext, songTitle, Toast.LENGTH_SHORT).show();
    }
}
