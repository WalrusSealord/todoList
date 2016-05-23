import { Template } from "meteor/templating";

import { Tasks } from "../api/tasks.js";

import "./task.js";
import "./body.html";

Template.body.helpers({
    tasks() {   // Get all task. group by user, most recent first
        return Tasks.find ( {}, { sort: { userName : 1, createdAt : -1} } );
    }
});

Template.body.events({
    "submit .new-task" (event) {
        event.preventDefault();

        // get data from form
        const form=event.target;
        const text=form.text.value;

        // then insert into db
        Tasks.insert({
            text,                   // value from form
            createdAt: new Date() // mark with timestamp
        });
        // clear input
        form.text.value="";
    }   //add comma here if adding more
});
