//
//  ViewController.swift
//  MediaPlayer
//
//  Created by Hector de Jesus Ramirez Landa on 2017-06-10.
//  Copyright © 2017 Hector de Jesus Ramirez Landa. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet var webview: UIWebView!
    
    var webviewDelegate: WebviewDelegate!
    //var webviewDelegate = WebviewDelegate()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        self.webviewDelegate = WebviewDelegate(vc: self)
        self.webview.scalesPageToFit = true
        self.webview.delegate = webviewDelegate
        //self.webviewDelegate.webView = self.webview
        
        let url = URL (string: "http://pg214.vfs.local/MediaPlayer/")
        let requestObj = URLRequest(url: url!)
        self.webview.loadRequest(requestObj)
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func clickedOpen(_ sender: Any) {
        let drawerController = self.navigationController?.parent as! KYDrawerController
        drawerController.setDrawerState(KYDrawerController.DrawerState.opened, animated: true)
    }
    
    func clickedPreviousSong() {
        self.webview.stringByEvaluatingJavaScript(from: "vfs.mediaPlayer.previousSong()")
    }
    
    func clickedNextSong() {
        self.webview.stringByEvaluatingJavaScript(from: "vfs.mediaPlayer.nextSong()")
    }
    
    func clickedVolumeDown() {
        self.webview.stringByEvaluatingJavaScript(from: "vfs.mediaPlayer.changeVolumeApp(-10)")
    }
    
    func clickedVolumeUp() {
        self.webview.stringByEvaluatingJavaScript(from: "vfs.mediaPlayer.changeVolumeApp(10)")
    }
    
    func startedNewSong() {
        let sT = self.webview.stringByEvaluatingJavaScript(from: "vfs.mediaPlayer.getSongTitle()")
        let alert = UIAlertController(title: "Playing:", message: sT, preferredStyle: UIAlertControllerStyle.alert)
        alert.addAction(UIAlertAction(title: "Ok", style: UIAlertActionStyle.default, handler: nil))
        self.present(alert, animated: true, completion: nil)
    }

}

