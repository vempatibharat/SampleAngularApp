import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-queens-trivia',
  templateUrl: './queenstrivia.html',
  styleUrls: ['./queenstrivia.css'],
})
export class QueensTriviaComponent implements OnInit {
  question: any = '';
  answer: any = '';
  trivia = { triviaAns: '' };
  apiUrl = 'https://jservice.io/api/random';
  answerForm!: FormGroup;
  IsWait = false;
  isRight = false;
  loaderkeep = false;
  Issubmitted: any = false;
  displayAns: any;
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    // this.answerForm = new FormGroup({
    //   triviaAns: new FormControl(this.trivia.triviaAns, [
    //     Validators.required
    //   ])});
    this.loaderkeep = true;
    this.IsWait = true;
    this.addQuestions();
  }

  vallidateAnswer(userAnswer: any) {
    this.Issubmitted = true;
    this.displayAns = userAnswer;
    if (this.answer == userAnswer) {
      this.isRight = true;
    } else {
      this.isRight = false;
    }

    this.addQuestions();
    this.trivia.triviaAns = '';
  }

  get name() {
    return this.answerForm.get('triviaAns')!;
  }

  async addQuestions() {
    var resp = this.sendGetRequest().subscribe((responseBody: any) => {
      var self = this;
      setTimeout(function () {
        self.loaderkeep = true;
        self.IsWait = true;
        setTimeout(function () {
          self.Issubmitted = false;
          self.IsWait = false;
          for (var _i = 0; _i < responseBody.length; _i++) {
            let item: any = responseBody[_i];
            self.question = item.question;
            self.answer = item.answer;
          }
          self.loaderkeep = false;
        }, 3000);
      }, 2000);
    });
    return resp;
  }

  sendGetRequest() {
    return this.http.get(this.apiUrl);
  }
}
