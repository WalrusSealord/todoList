import { Template } from "meteor/templating";

import { Tasks } from "../api/tasks.js";

import "./body.html";

Template.body.helpers({
    tasks() {
        return Tasks.find({});
    }
});

Template.body.events({
    "submit .new-task" (event) {
        console.log ("In add task event")
        // don't let browser do submit
        event.preventDefault();

        // get data from form
       const target=event.target;
        const text=target.text.value;

        // then insert into db
        Tasks.insert({
            text,                   // value from form
            createdAt: new Date(), // mark with timestamp
        });
        // clear input
        target.text.value="";
    }, //add comma here if adding more
});
