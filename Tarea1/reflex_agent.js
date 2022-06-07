// MIT License
// Copyright (c) 2020 Luis Espino
// Modify by: Juan Pablo Ardón López
// Carnet: 201700450
// Ref: https://github.com/luisespino/artificial_intelligence_js/blob/main/01_reflex_agent.js

function reflex_agent(location, state) {
  if (state == "DIRTY") return "CLEAN";
  else if (location == "A") return "RIGHT";
  else if (location == "B") return "LEFT";
}

function checkEnd(states) {
  if (states[1] == "CLEAN" && states[2] == "CLEAN")
    return true;
  return false;
}

function test(states) {
  var location = states[0];
  var state = states[0] == "A" ? states[1] : states[2];
  var action_result = reflex_agent(location, state);
  var log_table = document.getElementById("table");
  var row = log_table.insertRow();
  var location_column = row.insertCell(0);
  var a_column = row.insertCell(1);
  var b_column = row.insertCell(2);
  var action_column = row.insertCell(3);
  location_column.innerHTML = location;
  a_column.innerHTML = states[1];
  b_column.innerHTML = states[2];
  action_column.innerHTML = action_result;
  if (action_result == "CLEAN") {
    if (location == "A") states[1] = "CLEAN";
    else if (location == "B") states[2] = "CLEAN";
  }
  else if (action_result == "RIGHT") states[0] = "B";
  else if (action_result == "LEFT") states[0] = "A";
  var rand = Math.floor(Math.random() * 14) + 1;
  console.log(rand);
  switch (true) {
    case rand > 0 && rand <= 7:
      //No ensuciar nada
      row.insertCell(4).innerHTML = "Ninguna."
      break;
    case rand > 9 && rand < 14:
      //Ensuciar alguna habitación
      var room;
      rand == 10 || rand == 11 ? (states[1] = "DIRTY", room = "A") : (states[2] = "DIRTY", room = "B")
      row.insertCell(4).innerHTML = `Se ensució la habitación ${room}.`
      break;
    default:
      states[1] = "DIRTY";
      states[2] = "DIRTY";
      row.insertCell(4).innerHTML = `Se ensuciaron ambas habitaciones.`
      break;
  }
  document.getElementById("A").innerHTML = `Estado A: ${states[1]}`;
  document.getElementById("B").innerHTML = `Estado B: ${states[2]}`;
  checkEnd(states) ? (document.getElementById("final").innerHTML = "<h1>FINALIZA</h1>") : setTimeout(function () { test(states); }, 2000);
}

var states = ["A", "DIRTY", "DIRTY"];
var move = true;
document.getElementById("A").innerHTML = `Estado A: ${states[1]}`;
document.getElementById("B").innerHTML = `Estado B: ${states[2]}`;
test(states);