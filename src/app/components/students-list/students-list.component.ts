import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'students-list',
  templateUrl: './students-list.component.html',
  styleUrls: [ './students-list.component.scss' ]
})
export class StudentsListComponent implements OnInit, OnDestroy {

  private connection;
  @Input() private students;
  @Input() private selectedStudent: number;
  @Output() selectedStudentChange: EventEmitter<number> = new EventEmitter();

  constructor(private websocket: WebsocketService) {
    this.websocket.connect();
  }

  ngOnInit() {
    this.connection = this.websocket.addListener('connect-student').subscribe((data: any) => {
      this.selectedStudentChange.emit(data.id);
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
    this.websocket.disconnect();
  }

  selectStudent(id): void {
    this.websocket.send(
      'connect-student',
      {
        id: this.students[id].id
      }
    );
  }
}
