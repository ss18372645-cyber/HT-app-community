let records = JSON.parse(localStorage.getItem("bp_records")) || [];

function saveRecord() {
  let sys = document.getElementById("sys").value;
  let dia = document.getElementById("dia").value;
  let date = new Date().toLocaleDateString();

  let record = { sys, dia, date };
  records.push(record);

  localStorage.setItem("bp_records", JSON.stringify(records));

  renderRecords();
  renderChart();
}

function renderRecords() {
  let list = document.getElementById("records");
  list.innerHTML = "";

  records.forEach(r => {
    let li = document.createElement("li");
    li.innerText = `${r.date} : ${r.sys}/${r.dia}`;
    list.appendChild(li);
  });
}

function renderChart() {
  let ctx = document.getElementById("chart").getContext("2d");

  let labels = records.map(r => r.date);
  let sys = records.map(r => r.sys);
  let dia = records.map(r => r.dia);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Systolic",
          data: sys,
          borderWidth: 2
        },
        {
          label: "Diastolic",
          data: dia,
          borderWidth: 2
        }
      ]
    }
  });
}

renderRecords();
renderChart();
