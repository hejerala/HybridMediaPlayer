//
//  WebviewDelegate.swift
//  MediaPlayer
//
//  Created by Hector de Jesus Ramirez Landa on 2017-06-11.
//  Copyright © 2017 Hector de Jesus Ramirez Landa. All rights reserved.
//

import UIKit
import JavaScriptCore

class WebviewDelegate: NSObject, UIWebViewDelegate {
    
    var parent: ViewController
    var navigationHandler: NavigationHandler
    
    init(vc: ViewController) {
        parent = vc
        navigationHandler = NavigationHandler(vc: parent)
    }
    
    //var navigationHandler = NavigationHandler(vc: parent)
    
    open func webViewDidFinishLoad(_ webView: UIWebView) {
        
        let context: JSContext = webView.value(forKeyPath: "documentView.webView.mainFrame.javaScriptContext") as! JSContext
        
        context.setObject(self.navigationHandler, forKeyedSubscript: "navigationHandler" as (NSCopying & NSObjectProtocol)!)
    }

}
