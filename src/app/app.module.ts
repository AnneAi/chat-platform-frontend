import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatHeaderComponent } from './components/chat-header/chat-header.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { StudentChatComponent } from './components/student-chat/student-chat.component';
import { StudentLoginComponent } from './components/student-login/student-login.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentSpaceComponent } from './components/student-space/student-space.component';
import { TeacherChatComponent } from './components/teacher-chat/teacher-chat.component';
import { TextComponent } from './components/chat/messages/text/text.component';
import { TeacherLoginComponent } from './components/teacher-login/teacher-login.component';
import { TypingIndicatorComponent } from './components/chat/messages/typing-indicator/typing-indicator.component';
import { VideoComponent } from './components/chat/messages/video/video.component';

// Guards
import { TeacherAuthGuard } from './guards/teacher-auth.guard';

// Pipes
import { SafePipe } from './pipes/safe.pipe';

// Services
import { TokenManager } from './services/token-manager.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatHeaderComponent,
    HeaderComponent,
    LandingPageComponent,
    StudentChatComponent,
    StudentLoginComponent,
    StudentsListComponent,
    StudentSpaceComponent,
    TeacherChatComponent,
    TextComponent,
    TeacherLoginComponent,
    TypingIndicatorComponent,
    VideoComponent,

    SafePipe
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
          component: TeacherLoginComponent
        },
        {
          path: 'teacher/chat',
          component: TeacherChatComponent,
          canActivate: [ TeacherAuthGuard ]
        },
        {
          path: '',
          component: LandingPageComponent
        }
      ]
    )
  ],
  providers: [
    TeacherAuthGuard,

    TokenManager
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
