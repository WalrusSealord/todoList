import { Template } from 'meteor/templating';
 
import './body.html';
 
Template.body.helpers({
  tasks: [
    { text: 'This is dummy task 1' },
    { text: 'This is dummy task 2' },
    { text: 'This is dummy task 3' },
  ],
});

