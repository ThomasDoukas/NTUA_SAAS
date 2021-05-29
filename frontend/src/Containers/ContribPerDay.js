import React, { useContext, useEffect, useState } from "react";
import Answer from "./Answer";
import AuthContext from "../source/auth-context";
import { Bar } from "react-chartjs-2";

class ContribPerDay extends React.Component {
  state = {
    timeCreated: undefined,
    answersCounter: undefined,
    questionsCounter: undefined,
  };

  static contextType = AuthContext;

  getContribs = async (e) => {
    if (e) e.preventDefault();
    await fetch("http://localhost:3000/saas/architecture/questions/myContr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.context.email,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({
            timeCreated: data.answers[0].timeCreated.split("T")[0],
            questionsCounter: data.questions[0].questionsCounter,
            answersCounter: data.answers[0].answersCounter,
          });
          console.log(this.state.timeCreated);
        });
      } else {
        return res.json().then((data) => {
          alert(data.message);
        });
      }
    });
  };

  componentDidMount() {
    this.getContribs();
  }

  render() {
    return (
      <div>
        <h1>Contributions per day page</h1>
        <Bar
          data={{
            datasets: [
              {
                label: "Answers",
                backgroundColor: "#06EEAA",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
                data: [`${this.state.answersCounter}`],
              },
              {
                label: "Questions",
                backgroundColor: "#343a40",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
                data: [`${this.state.questionsCounter}`],
              },
            ],
          }}
          options={{
            labels: [`${this.state.timeCreated}`],
            title: {
              display: true,
              text: "My Daily Contributions",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
            maintainAspectRatio: false,
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

export default ContribPerDay;
