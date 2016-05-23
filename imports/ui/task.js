import { Template } from "meteor/templating";

import { Tasks } from "../api/tasks.js";

import "./task.html";

Template.task.events({
    "click .toggle-checked" () { // set checked to opposite on current task
        Tasks.update ( this._id, { $set: { completed : ! this.completed }
        });
    },
    "click .delete" () { // delete current task ( this )
        Tasks.remove(this._id);
    }
});
