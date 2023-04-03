import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title> Home </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="ion-justify-content-center form-container">
        <form class="form" [formGroup]="myForm" (ngSubmit)="handleSubmit()">
          <input formControlName="guess" type="text" placeholder="Guess the number from 1 to 100" />
          <ion-button type="submit">Submit</ion-button>
        </form>
      </div>
      <div class='result'>
        {{ result$ | async}}
      </div>

      <ion-list *ngFor="let guess of previousGuesses$ | async">
        <ion-label>Your previous guesses</ion-label>
        <ion-item>
          <ion-label>{{guess}}</ion-label>
        </ion-item>
      </ion-list>

    </ion-content>
  `,
  styles: [
    `
      .form-container {
        display: flex;

        .form {
          display: flex;
        }
      }

      input {
        padding: 5px;
      }

      .result {
        margin-top: 50px;
        padding: 20px;
        text-align: center;
        border: 1px solid orangered;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  previousGuesses$ = new BehaviorSubject<any[]>([]);
  result$ = new BehaviorSubject<any>('');
  myForm = this.fb.group({
    guess: ['', Validators.required],
  })

  handleSubmit() {
    this.previousGuesses$.next([...this.previousGuesses$.getValue(), ...[this.myForm.value.guess]]);

    this.http.post('http://localhost:3000/', this.myForm.value).subscribe((res: any) => {
      if (res) {
        this.result$.next(res.result);
      }
    });

  }

  ngOnInit() {
    this.http.get('http://localhost:3000/').subscribe((res) => {
      console.log(res);
    });
  }

}
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ]),
  ],
  declarations: [HomeComponent],
})
export class HomeComponentModule  {}
