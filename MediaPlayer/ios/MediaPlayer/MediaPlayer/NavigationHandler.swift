//
//  NavigationHandler.swift
//  MediaPlayer
//
//  Created by Hector de Jesus Ramirez Landa on 2017-06-11.
//  Copyright © 2017 Hector de Jesus Ramirez Landa. All rights reserved.
//

import UIKit
import JavaScriptCore

@objc protocol NavigationHandlerJS: JSExport {
    func songPlayed()
}

class NavigationHandler: NSObject, NavigationHandlerJS {
    
    var parent: ViewController
    
    init(vc: ViewController) {
        parent = vc
    }
    
    func songPlayed() {
        //print("clicked")
        parent.startedNewSong()
    }

}
