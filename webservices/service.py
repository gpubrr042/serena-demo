from flask import Flask
from flask import request
from flask_cors import CORS
import requests as req
import bs4
import pickle
import conf
import eng_to_ipa as ipa
from googletrans import Translator

app = Flask(__name__)
CORS(app)

word_list = pickle.load(open("word_list.p", "rb"))
translatekey = 'trnsl.1.1.20160620T044235Z.009e3fdaf079e045.51ec20ede6d14038c2cb193de1f8891c28dfc749'


@app.route("/phonetic-trans", methods=['POST'])
def phonetictrans():
    request_data = request.get_json()
    print(request_data)
    sentence = request_data['sentence']
    print(ipa.convert(sentence))
    answer = ipa.convert(sentence)
    return answer
    # words = sentence.split()
    # answer = []
    # for word in words:
    #     word = word.lower()
    #     if word in word_list:
    #         answer.append(word_list[word])
    #     else:
    #         answer.append(word)
    #     return " ".join(answer)


@app.route("/language-translive", methods=['POST'])
def languagetranslive():
    try:
        sentence = request.json['sentence']
        print(sentence)
        print(type(sentence))
    except:
        return "sentence parameter not passed"
    try:
        fromlang = request.json['from-language']
    except:
        return "en"
    try:
        tolang = request.json['to-language']
    except:
        return "to language not passed"

    translator = Translator()
    translation = translator.translate(sentence, dest=tolang)
    print(translation.text)
    res=translation.text
    #  res = req.get('https://translate.yandex.net/api/v1.5/tr/translate?key='+translatekey +
    #               '&text='+sentence+'&lang='+fromlang+'-'+tolang+'&format=plain&options=0')
    soup = bs4.BeautifulSoup(res)
    ret = soup.text
    return ret


@app.route("/currency-conversion", methods=['POST'])
def currencyconversion():
    try:
        cur_amount = request.json['currency_amount']
    except:
        return "cur_amount parameter is not passed"
    try:
        from_cur = request.json['from_cur']
    except:
        return "from_cur parameter is not passed"
    try:
        to_cur = request.json['to_cur']
    except:
        return "to_cur parameter is not passed"

    if (from_cur == "USD" and to_cur == "INR"):
        res = cur_amount*63.88
    elif (from_cur == "USD" and to_cur == "EUR"):
        res = cur_amount*0.88
    elif (from_cur == "INR" and to_cur == "USD"):
        res = cur_amount*0.016
    elif (from_cur == "INR" and to_cur == "EUR"):
        res = cur_amount*0.014
    elif (from_cur == "EUR" and to_cur == "USD"):
        res = cur_amount*1.13
    elif (from_cur == "EUR" and to_cur == "INR"):
        res = cur_amount*73.34
    else:
        res = cur_amount
    return str(res)+" "+to_cur


@app.route("/measurement-conversion", methods=['POST'])
def measurementconversion():
    content = request.get_json()
    print(content)
    try:
        measurement_num = content['measurement_num']
        print(measurement_num)
    except:
        return "to_measure parameter is not passed"
    try:
        from_measure = content['from_measure']
        print(from_measure)
    except:
        return "from_measure parameter is not passed"
    try:
        to_measure = content['to_measure']
        print(to_measure)
    except:
        return "to_measure parameter is not passed"

    if (from_measure == "km" and to_measure == "mi"):
        res = measurement_num*0.62137
    elif (from_measure == "km" and to_measure == "ft"):
        res = measurement_num*3280.8
    elif (from_measure == "mi" and to_measure == "km"):
        res = measurement_num/0.62137
    elif (from_measure == "mi" and to_measure == "ft"):
        res = measurement_num * 5280.0
    elif (from_measure == "ft" and to_measure == "km"):
        res = measurement_num * 0.0003048
    elif (from_measure == "ft" and to_measure == "mi"):
        res = measurement_num * 0.00018939
    else:
        res = measurement_num
    return str(res)+" "+to_measure


@app.route("/test", methods=['GET'])
def test():
    return "some test string"


if __name__ == '__main__':
    app.run(host=conf.HOST[0], port=conf.PORT[0], debug=True)
