//
//  DrawerTableViewController.swift
//  MediaPlayer
//
//  Created by Hector de Jesus Ramirez Landa on 2017-06-10.
//  Copyright © 2017 Hector de Jesus Ramirez Landa. All rights reserved.
//

import UIKit

class DrawerTableViewController: UITableViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // method to run when table view cell is tapped
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let drawerController = self.navigationController?.parent as! KYDrawerController
        //let storyboard = UIStoryboard(name: "Main", bundle: nil)
        //let viewController = storyboard.instantiateViewController(withIdentifier: "MainController")
        //let vc = viewController as! ViewController
        //let navController = UINavigationController(rootViewController: viewController)
        let mainNav = drawerController.mainViewController as! UINavigationController
        let vc = mainNav.viewControllers.first as! ViewController
        
        switch indexPath.row {
        case 0:
            vc.clickedPreviousSong()
            break
        case 1:
            vc.clickedNextSong()
            break
        case 2:
            vc.clickedVolumeDown()
            break
        case 3:
            vc.clickedVolumeUp()
            break
        default:
            break
        }
        //drawerController.mainViewController = navController
        drawerController.setDrawerState(KYDrawerController.DrawerState.closed, animated: true)
        //print("You tapped cell number \(indexPath.row).")
    }

}
