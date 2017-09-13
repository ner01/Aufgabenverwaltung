import { Component } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

export class Task {
  task: string;
  done: boolean;
  date: string;
}

const TASKS: Task[] = [
  { task: "erste aufgabe", done: false, date: "27.08.17" },
  { task: "zweite Aufgabe", done: true, date: "12.09.17" },
  { task: "dritte Aufgabe!!", done: true, date: "27.06.17" }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  closeResult: string;
  public progressBar: number;
  tasks = TASKS;

  constructor(private modalService: NgbModal) {
    this.checkboxChanged();
  }

  onDeleteClick(task: Task)
  {
    this.tasks = this.tasks.filter(obj => obj !== task);
    var numberOfDoneTasks = this.tasks.reduce((acc, e) => e.done ? acc+1 : acc, 0);
    this.progressBar = (numberOfDoneTasks / this.tasks.length) * 100;
  }

  checkboxChanged()
  {
    var numberOfDoneTasks = this.tasks.reduce((acc, e) => e.done ? acc+1 : acc, 0);
    this.progressBar = (numberOfDoneTasks / this.tasks.length) * 100;
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }
    else return  `with: ${reason}`;
    
  }
}

