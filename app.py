from flask import Flask, render_template, jsonify, request, session, Response
from surveys import satisfaction_survey

app = Flask(__name__)
app.config["SECRET_KEY"] = "SUPERsecretSurvey69"

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
    print('request:',request.headers)
    if (content_type == 'application/json'):
        session['answers'] = request.json
        print('***Session***', session)
        print('answer list:',session['answers'])
        return Response('OK', status=201)

app.run()