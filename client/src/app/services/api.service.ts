import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getQuestions(): any {
      return this.http.get('/surveyquestions');
  }

  postAnswer (answers: JSON): any {
      const json: string = JSON.stringify(answers)
      const res: any = this.http.post('/answerlog', {answers: json});
      console.log(res);
      return res;
  }

}
