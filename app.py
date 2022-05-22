from flask import Flask, render_template, jsonify, request
from surveys import satisfaction_survey

app = Flask(__name__)

answers = list()

@app.route("/")
def hello_world():
    return render_template("index.html")

@app.route('/surveyquestions')
def survey_api():
    questions = list()
    for q in satisfaction_survey.questions:
        questions.append({'question': q.question, 'choices': q.choices})
    return jsonify(questions)

@app.route('/answerlog', methods=['POST'])
def store_answers():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        answers.append(request.json)
        print(answers)

app.run()