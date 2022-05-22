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

  postAnswer (answer: string): any {
      const res: any = this.http.post('/answerlog', {answer: answer});
      console.log(res);
      return res;
  }

}
