import { Component, OnInit } from '@angular/core';import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}


export class CoachesComponent implements OnInit {
  coaches: any[] = []; // Example array, replace with your actual data

  dataSource = new MatTableDataSource<any>(this.coaches);

  constructor() { }

  ngOnInit(): void {
    // Initialize your coaches array
  }
}
