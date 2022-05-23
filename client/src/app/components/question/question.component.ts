import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public questions: Array<{question: string; choices: Array<string>;}> = [
    // {question: "Have you shopped here before?", choices: ["Yes", "No"]},
    // {question: "Did someone else shop with you today?", choices: ["Yes", "No"]},
    // {question: "On average, how much do you spend a month on frisbees?", choices: ["Less than $10,000", "$10,000 or more"]},
    // {question: "Are you likely to shop here again?", choices: ["Yes", "No"]}
  ];
  public formControls: Array<any> = [];
  public answers: Array<any> = [];
  public models: any = {};

  constructor(private api: ApiService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions (): void {
    try{
      this.api.getQuestions().subscribe((data: any) => {
      console.log('api response<questions>:', data);
      this.questions = data;
      this.questions.map((n: any, i: number): void => {
        this.formControls.push([`question-${i}`, this.questions[i]]); 
      })
      this.snack.open('questions loaded', 'yay', {duration: 1500,})
      })
    } catch (e) {
      console.error(e);
      this.snack.open('Oops! Something went wrong', 'nuts', {duration: 1500,})
    }
  }

  handleSubmit(): void {
    try {
      this.api.postAnswer(this.models).subscribe((res: any) => {
        console.log('api response to post:', res)
        this.snack.open('Submitted answers!', 'nice', {duration: 1500,});
      })
    } catch (e) {
      console.error(e);
      this.snack.open('Oops! Something went wrong', 'nuts', {duration: 1500,});
    }

    this.router.navigate(['thank-you'])
  }

}
