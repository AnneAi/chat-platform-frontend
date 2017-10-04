import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { StudentChatComponent } from './components/student-chat/student-chat.component';
import { StudentLoginComponent } from './components/student-login/student-login.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentSpaceComponent } from './components/student-space/student-space.component';
import { TeacherChatComponent } from './components/teacher-chat/teacher-chat.component';
import { TextComponent } from './components/chat/messages/text/text.component';
import { TeacherLoginComponent } from './components/teacher-login/teacher-login.component';
import { TeacherSpaceComponent } from './components/teacher-space/teacher-space.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HeaderComponent,
    LandingPageComponent,
    StudentChatComponent,
    StudentLoginComponent,
    StudentsListComponent,
    StudentSpaceComponent,
    TeacherChatComponent,
    TextComponent,
    TeacherLoginComponent,
    TeacherSpaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: 'student',
          component: StudentSpaceComponent
        },
        {
          path: 'teacher',
          component: TeacherSpaceComponent
        },
        {
          path: '',
          component: LandingPageComponent
        }
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
