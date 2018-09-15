import React, { Component } from "react";

class Todo extends Component {
  state = {
    todoList: [],
    item: "",
    completed: [],
    deadline: new Date(),
    lastModifiedKey: -1,
    desc: ""
  };
  addTodoItem(item, deadline, desc) {
    let myDate = this.formatDate(deadline);
    console.log("ITEMS", item, myDate);

    if (
      this.state.todoList.indexOf(item) < 0 &&
      this.state.lastModifiedKey < 0
    ) {
      console.log(this.state);
      console.log("item", this.state.item);
      this.setState({
        todoList: [
          ...this.state.todoList,
          { task: item, date: deadline, desc: desc }
        ]
      });
      // this.setState({ todoList: this.state.todoList.push(item) });
      console.log("new state", this.state);
    } else if (this.state.lastModifiedKey > -1) {
      console.log("Handle last modified items");
      console.log("lmk", this.state.lastModifiedKey);
      console.log("state", this.state.todoList);
      //arr.splice(index, 0, item);
      let tA = [...this.state.todoList];
      tA.splice(this.state.lastModifiedKey, 0, {
        task: this.state.item,
        date: this.state.deadline
      });
      console.log("tA", tA);

      this.setState({
        todoList: tA,
        lastModifiedKey: -1
      });
      // if (
      //   confirm("Are you sure you want to save this thing into the Todo List?")
      // ) {
      //   console.log("hi");
      // }
    } else if (this.state.todoList.indexOf(item) > -1) {
      console.log("Handle adding Duplicate items");
      // if (
      //   confirm("Are you sure you want to save this thing into the Todo List?")
      // ) {
      //   console.log("hi");
      // }
    }
    this.setState({ item: "", deadline: new Date(), desc: "" });
    this.mainInput.value = "";
    this.mainDate.value = new Date();
    this.mainDesc.value = "";
  }

  formatDate(date) {
    console.log("In Date");
    var objDate = new Date(date);
    const locale = "en-us";
    let month = objDate.toLocaleString(locale, { month: "short" });
    // let d = new Date(date),
    // month = "" + (d.getMonth() + 1),
    let day = "" + objDate.getDate();
    let year = objDate.getFullYear();
    console.log("In Date", month);
    console.log("In Date", day);
    console.log("In Date", year);

    return " " + day + " " + month + ", " + year;
  }

  markComplete(key) {
    this.setState({
      completed: [...this.state.completed, this.state.todoList[key]]
    });
    this.state.todoList.splice(key, 1);
    this.setState({ todoList: this.state.todoList });
    console.log("Todo Array", this.state.todoList);
    console.log("Completed Array", this.state.completed);
  }

  markIncomplete(key) {
    this.setState({
      todoList: [...this.state.todoList, this.state.completed[key]]
    });
    this.state.completed.splice(key, 1);
    this.setState({ completed: this.state.completed });
    // console.log("Todo Array", this.state.todoList);
    // console.log("Completed Array", this.state.completed);
  }

  removeItem(key, flag) {
    if (flag === "tl") {
      this.state.todoList.splice(key, 1);
      this.setState({ todoList: this.state.todoList });
    } else {
      this.state.completed.splice(key, 1);
      this.setState({ completed: this.state.completed });
    }
  }

  modifyItem(key) {
    this.state.lastModifiedKey = key;
    this.mainInput.value = this.state.todoList[key].task;
    this.mainDate.value = this.state.todoList[key].date;
    this.setState({ item: this.mainInput.value });
    this.setState({ deadline: this.mainDate.value });
    //this.state.item = this.mainInput.value;
    this.mainInput.focus();
    this.state.todoList.splice(key, 1);
    this.setState({ todoList: this.state.todoList });
  }

  increasePriority(key) {
    if (key > 0) {
      let elem = this.state.todoList[key];
      let elem1 = this.state.todoList[key - 1];
      let tempArr = [...this.state.todoList];
      tempArr[key - 1] = elem;
      tempArr[key] = elem1;
      this.setState({ todoList: tempArr });
      // this.setState({ todoList: this.state.todoList });
    }
  }

  decreasePriority(key) {
    console.log("Key D", key);
    console.log("length", this.state.todoList.length);
    if (key < this.state.todoList.length - 1) {
      let elem = this.state.todoList[key];
      let elem1 = this.state.todoList[key + 1];
      let tempArr = [...this.state.todoList];
      tempArr[key + 1] = elem;
      tempArr[key] = elem1;
      this.setState({ todoList: tempArr });
      // this.state.todoList[key + 1] = elem;
      // this.state.todoList[key] = elem1;
      // this.setState({ todoList: this.state.todoList });
    }
  }

  chageStatus(key) {
    console.log("Key", key);
    this.setState({ deactive: !this.state.deactive });
  }
  render() {
    return (
      <div>
        <div style={{ marginBottom: 11 + "px" }}>
          <label>Task title</label>
          <input
            className="input-sm"
            ref={ref => (this.mainInput = ref)}
            type="text"
            placeholder="Enter your todo item"
            onChange={event => this.setState({ item: event.target.value })}
            onKeyPress={event => {
              if (event.key === "Enter" && this.state.item !== "") {
                this.addTodoItem(this.state.item);
              }
            }}
          />
          <br />

          <label>Enter Deadline</label>
          <input
            className="input-sm"
            ref={ref => (this.mainDate = ref)}
            type="date"
            placeholder="Enter deadline for this task"
            onChange={event => this.setState({ deadline: event.target.value })}
            // onChange={event => this.setState({ item: event.target.value })}
            // onKeyPress={event => {
            //   if (event.key === "Enter" && this.state.item !== "") {
            //     this.addTodoItem(this.state.item);
            //   }
            // }}
          />
          <br />
          <label>Description</label>
          <input
            className="input-lg"
            id="inputlg"
            type="text"
            ref={ref => (this.mainDesc = ref)}
            onChange={event => this.setState({ desc: event.target.value })}
            onKeyPress={event => {
              if (event.key === "Enter" && this.state.item !== "") {
                this.addTodoItem(this.state.item);
              }
            }}
          />
          <br />
          <button
            type="submit"
            onClick={() => {
              if (this.state.item !== "") {
                this.addTodoItem(
                  this.state.item,
                  this.state.deadline,
                  this.state.desc
                );
              }
            }}
          >
            Add
          </button>
        </div>

        <br />
        <div className="row">
          <div className="col-sm-6">
            {" "}
            <ul className="list-group" id="accordion">
              {this.state.todoList.map((item, key) => {
                return (
                  <li
                    key={key}
                    className="list-group-item d-flex justify-content-between align-items-center"
                    // className={this.state.deactive ? "strike" : "no-strike"}
                    onClick={() => {
                      this.chageStatus(key);
                    }}
                  >
                    {this.state.todoList[key].task}
                    <br />
                    Due Date :{this.formatDate(this.state.todoList[key].date)}
                    {console.log("logging", this.state.todoList)}
                    {console.log("Completed Array 2", this.state.completed)}
                    <span
                      className="badge badge-primary badge-pill badgePointer"
                      onClick={() => this.modifyItem(key)}
                    >
                      Modify
                    </span>
                    <span
                      className="badge badge-primary badge-pill badgePointer"
                      onClick={() => this.removeItem(key, "tl")}
                    >
                      Remove
                    </span>
                    <span
                      className="badge badge-primary badge-pill badgePointer"
                      onClick={() => this.markComplete(key)}
                    >
                      Mark as Complete
                    </span>
                    <span
                      className="badge badge-primary badge-pill badgePointer"
                      onClick={() => this.decreasePriority(key)}
                    >
                      &darr;
                    </span>
                    <span
                      className="badge badge-primary badge-pill badgePointer"
                      onClick={() => this.increasePriority(key)}
                    >
                      &uarr;
                    </span>
                    <div className="content">
                      {this.state.todoList[key].desc}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-sm-6">
            {" "}
            <ul className="list-group">
              {this.state.completed.map((item, key) => {
                return (
                  <li
                    key={key}
                    className="list-group-item d-flex justify-content-between align-items-center"
                    // className={this.state.deactive ? "strike" : "no-strike"}
                    onClick={() => {
                      this.chageStatus(key);
                    }}
                  >
                    {this.state.completed[key].task}
                    <br />
                    Due Date :{this.formatDate(this.state.completed[key].date)}
                    <br />
                    Actual Completed Date: {this.formatDate(new Date())}
                    {console.log("logging", this.state.todoList)}
                    {console.log("Completed Array 2", this.state.completed)}
                    <span
                      className="badge badge-primary badge-pill badgePointer"
                      onClick={() => this.removeItem(key, "cl")}
                    >
                      Remove
                    </span>
                    <span
                      className="badge badge-primary badge-pill badgePointer"
                      onClick={() => this.markIncomplete(key)}
                    >
                      Mark as Incomplete
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
