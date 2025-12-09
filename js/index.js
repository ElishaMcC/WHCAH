const bugs = document.getElementById("bugs");
const rules = document.getElementById("rules");
const e = document.getElementsByClassName('close');
const closeA = e[0];
const closeB = e[1];
const closeC = e[2];
const closeD = e[3];
const exit = document.getElementById("exit");

const n = document.getElementsByClassName('next');
const nextA = n[0];
const nextB = n[1];
const nextC = n[2];

rules.addEventListener("click", () => { RulesA.showModal();});
bugs.addEventListener("click", () => { BugReport.showModal();});
nextA.addEventListener("click", () => { RulesA.close(); RulesB.showModal(); });
nextB.addEventListener("click", () => { RulesB.close(); RulesC.showModal(); });
nextC.addEventListener("click", () => { RulesC.close(); RulesD.showModal(); });

closeA.addEventListener("click", () => { RulesA.close();});
closeB.addEventListener("click", () => { RulesB.close();});
closeC.addEventListener("click", () => { RulesC.close();});
closeD.addEventListener("click", () => { RulesD.close();});
exit.addEventListener("click", () => { BugReport.close();});
