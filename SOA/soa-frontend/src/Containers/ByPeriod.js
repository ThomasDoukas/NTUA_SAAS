import React from "react";
import { Bar } from "react-chartjs-2";
import classes from '../Components/Auth/AuthForm.module.css'

class ByPeriod extends React.Component {
  state = {
    questionsCounter: [],
    timeCreated: [],
    fromDate: undefined,
    toDate: undefined
  };

  getQuestions = async (e) => {
    if (e) e.preventDefault();
    await fetch(
      "http://localhost:3000/saas/soa/esb",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "url-destination": "saas/soa/analytics/dateQuestions"
        },
        body: JSON.stringify({
          fromDate: (this.state.fromDate ? `${this.state.fromDate}` : undefined),
          toDate: (this.state.toDate ? `${this.state.toDate}` : undefined)
      })
      }
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
            this.setState({
              questionsCounter: data.map((el) => {return el.questionsCounter}),
              timeCreated: data.map((el) => {return el.timeCreated.split("T")[0]}),
            });
        });
      } else {
        return res.json().then((data) => {
          alert(data.message);
        });
      }
    });
  };

  componentDidMount() {
    this.getQuestions();
  }

  handleChangeFrom = (e) => {
    this.setState({
        fromDate: [`${e.target.value}`]
    });
};

handleChangeTo = (e) => {
    this.setState({
        toDate: [`${e.target.value}`]
    });
};

  render() {
    return (
      <div>
      <section>
        <br />
        <h1>Questions by Period</h1>
        <br />
        <Bar
          data={{
            labels: this.state.timeCreated,
            datasets: [
              {
                label: "Questions:",
                backgroundColor: "#06eeaa",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
                data: this.state.questionsCounter,
              }
            ],
          }}
          options={{
            title: {
              display: true,
              text: "Keywords",
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
              <div class="form-group">
                <div>
                  <label>From:</label>
                  <input type='date' className="form-control" name='fromDate' onChange={this.handleChangeFrom} />
                </div>
                <br />
                <div>
                    <label>To:</label>
                    <input type='date' className="form-control" name='toDate' onChange={this.handleChangeTo} />
                </div>
                <br />
                <button
                  type='button'
                  class="btn btn-primary"
                  style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}
                  onClick={this.getQuestions}
                >
                  Filter questions
                </button>
              </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ByPeriod;
