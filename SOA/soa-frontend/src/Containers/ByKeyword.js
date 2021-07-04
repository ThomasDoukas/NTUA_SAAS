import React from "react";
import { Bar } from "react-chartjs-2";

class ByKeyword extends React.Component {
  state = {
    questionsCounter: [],
    labelTitles: [],
  };

  getQuestions = async (e) => {
    if (e) e.preventDefault();
    await fetch(
      "http://localhost:3000/saas/soa/esb",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "url-destination": "saas/soa/analytics/labelQuestions"
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({
            questionsCounter: data.map((el) => {
              return el.questionCounter;
            }),
            labelTitles: data.map((el) => {
              return el.labelTitle;
            }),
          });
          console.log(this.state.questionsCounter);
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

  render() {
    return (
      <div>
        <br />
        <h1>Questions by Keyword</h1>
        <br />
        <Bar
          data={{
            labels: this.state.labelTitles,
            datasets: [
              {
                label: "Times encountered",
                backgroundColor: "#06eeaa",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
                data: this.state.questionsCounter,
              },
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
      </div>
    );
  }
}

export default ByKeyword;
