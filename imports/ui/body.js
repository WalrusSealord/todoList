import { Template } from "meteor/templating";
import { ReactiveDict } from "meteor/reactive-dict";

import { Tasks } from "../api/tasks.js";

import "./task.js";
import "./body.html";

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.body.helpers({
    tasks() {
        const instance = Template.instance();

        if (instance.state.get("hide-completed")) { //don't show complered things
            return Tasks.find({ completed: { $ne: true }}, {sort: { userName: 1, createdAt: -1} });
        } else {
            // Get all task. group by user, most recent first
            return Tasks.find({}, { sort: { userName: 1, createdAt: -1 } });
        }
    }
});

Template.body.events({
    "change .hide-completed" (event, instance) {
        instance.state.set("hide-completed", event.target.checked);
    },

    "submit .new-task" (event) {
        event.preventDefault();

        // get data from form
        const form = event.target;
        const text = form.text.value;


        // then insert into db
        Tasks.insert({

            text, // value from form
            createdAt: new Date() // mark with timestamp
        });
        // clear input
        form.text.value = "";
    } //add comma here if adding more
});
