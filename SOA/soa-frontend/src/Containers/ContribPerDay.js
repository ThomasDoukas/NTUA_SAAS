import React from "react";
import AuthContext from "../source/auth-context";
import { Bar } from "react-chartjs-2";
import classes from '../Components/Auth/AuthForm.module.css'

class ContribPerDay extends React.Component {
  state = {
    timeCreated: [],
    answersCounter: [],
    questionsCounter: [],
    date: '2021-07'
  };

  static contextType = AuthContext;

  getContribs = async (e) => {
    if (e) e.preventDefault();
    const year = parseInt(this.state.date.split('-')[0])
    const month = parseInt(this.state.date.split('-')[1])
    await fetch("https://saas21-team47-soa.herokuapp.com/saas/soa/esb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "url-destination": "saas/soa/analytics/myContr",
        'Authorization': 'Bearer ' + this.context.jwt
      },
      body: JSON.stringify({
        year: year,
        month: month,
        email: this.context.email
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {   
          let days = []
          let questions = []
          let answers = []   
          days.push(data.map((el) => {return parseInt(el.day)}));
          questions.push(data.map((el) => {return parseInt(el.questions)}));
          answers.push(data.map((el) => {return parseInt(el.answers)}));
          this.setState({
            timeCreated: days[0],
            questionsCounter: questions[0],
            answersCounter: answers[0]
          });
        });
      } else {
        return res.json().then((data) => {
          alert(data.message);
        });
      }
    });
  };

  handleChange = (e) => {
    this.setState({
        date: `${e.target.value}`
    });
};

  componentDidMount() {
    this.getContribs();
  }

  render() {
    return (
      <div>
      <section>
        <br />
        <h1>My Contributions</h1>
        <br/>
        <Bar
          data={{
            labels: this.state.timeCreated,
            datasets: [
              {
                label: "Answers",
                backgroundColor: "#06eeaa",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
                data: this.state.answersCounter,
              },
              {
                label: "Questions",
                backgroundColor: "#343a40",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
                data: this.state.questionsCounter,
              },
            ],
          }}
          options={{
            title: {
              display: true,
              text: "My Daily Contributions",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
            maintainAspectRatio: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
        </section>

        <section className={classes.auth}>
          <div>
            <h1>Filters</h1>
              <div className="form-group">
                <div>
                  <label>Show results for:</label>
                  <input type='month' className="form-control" name='date' value={`${this.state.date}`} onChange={this.handleChange} />
                </div>
                <br />
                <button
                  type='button'
                  className="btn btn-primary"
                  style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE", marginInline: '0.2rem' }}
                  onClick={this.getContribs}
                >
                  Filter 
                </button>
              </div>
          </div>
        </section>

      </div>
    );
  }
}

export default ContribPerDay;
