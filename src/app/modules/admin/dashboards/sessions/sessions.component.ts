import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { SessionsService } from './sessions.service';
@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionsComponent implements OnInit {
  sessions: any[] = [];

  constructor(private sessionsService: SessionsService) { }

  ngOnInit(): void {
    this.sessionsService.getSessions().subscribe(data => {
      this.sessions = data;
    });
  }
  onSubmit() {
    // Implement form submission logic here
    console.log('Form submitted:', this.sessions);
    // Add logic to save or update session
  }


  addSessions(newSessions: any): void {
    this.sessionsService.createSessions(newSessions).subscribe(data => {
      this.sessions.push(data);
    });
  }

  updateSessions(id: string, updatedSessions: any): void {
    this.sessionsService.updateSessions(id, updatedSessions).subscribe(data => {
      const index = this.sessions.findIndex(c => c.id === id);
      if (index !== -1) {
        this.sessions[index] = data;
      }
    });
  }

  editSessions(Sessions: any): void {
    console.log('Editing Sessions', Sessions);
    // Implement your edit logic here
  }


  deleteSessions(id: string): void {
    this.sessionsService.deleteSessions(id).subscribe(() => {
      this.sessions = this.sessions.filter(c => c.id !== id);
    });
  }
}
