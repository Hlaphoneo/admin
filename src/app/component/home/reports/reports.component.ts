import { Component, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent  {

  searchString;

  displayedColumns = ['position', 'gategory', 'date', 'phone', 'reference', 'name'];
  dataSource;


  animal:any;
  name: any;
  
  reportsCount;
  rawReportDate: any;

  viewReportItem: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private database: DatabaseService) { 

  }

  public filter() { 
    console.log(this.searchString);
    
      this.dataSource.filter = this.searchString.trim().toLowerCase();  
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.loadData();
  }

  closeReport() { 
    this.viewReportItem = null;
    this.loadData();
  }

  loadData() { 
    var elemList : any = [];

    this.database.get("reports-egov-references").then((list)=>{

      if(list != null) {
        let keys = Object.keys(list);

        keys.forEach((key,index)=>{
          elemList.push({
            position : index,
            gategory : list[key].gategory,
            phone : list[key].phoneNumber,
            date: list[key].timestamp,
            address: list[key].physicalAddress,
            name: list[key].fullName ? list[key].fullName : null,
            dataId : key,
            image: list[key].imgUrl ? list[key].imgUrl : null,
            message: list[key].explainProblem,
            reference: list[key].reference ? list[key].reference : null
          })
        })
  
        console.log(elemList);
        
        this.reportsCount = keys.length;
        this.dataSource = new MatTableDataSource<Element>(elemList);
        this.rawReportDate = list;
        this.dataSource.paginator = this.paginator;
        
      } else { 
        this.reportsCount = 0;
        this.dataSource = [];
      }
    })
  }

  test() {
    alert("testing")
  }
  
  private async done() { 
    await this.database.delete(`reports-egov-references/${this.viewReportItem.dataId}`)
    this.closeReport();
  }

  openDialog(element): void {
    console.log(element);
    // console.log(this.rawReportDate[element.dataId]);
    this.viewReportItem = element;
    
  }

}
