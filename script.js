function compare(a, b) {
  if (a["# of Courses Completed"] > b["# of Courses Completed"]) {
    return -1;
  } else if (a["# of Courses Completed"] < b["# of Courses Completed"]) {
    return 1;
  } else {
    // If the number of courses completed is the same, compare by skill badges completed
    if (a["# of Skill Badges Completed"] > b["# of Skill Badges Completed"]) {
      return -1;
    } else if (
      a["# of Skill Badges Completed"] < b["# of Skill Badges Completed"]
    ) {
      return 1;
    } else {
      // If skill badges completed are also the same, compare by "# of GenAI Game Completed"
      if (a["# of GenAI Game Completed"] > b["# of GenAI Game Completed"]) {
        return -1;
      } else if (
        a["# of GenAI Game Completed"] < b["# of GenAI Game Completed"]
      ) {
        return 1;
      } else {
        // If GenAI games completed are also the same, compare by "Total completion" value
        if (a["Total completion"] === "Yes" && b["Total completion"] === "No") {
          return -1;
        } else if (
          a["Total completion"] === "No" &&
          b["Total completion"] === "Yes"
        ) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  }
}

const updateData = async (filter) => {
  let data = await (await fetch("./data.json")).json();
  let total_started = 0;
  if (filter !== "") {
    data = data.filter((el) => {
      return el["Student Name"].toLowerCase().includes(filter.toLowerCase());
    });
  }
  data.sort(compare);
  let total_reg = data.length;
  let html = "";
  data.forEach((d, i) => {
    total_started += d["Redemption Status"] === "Yes" ? 1 : 0;
    html += `
          <tr>
              <th>${i + 1}</th>
              <td><a href="${
                d["Google Cloud Skills Boost Profile URL"]
              }" target="_blank" style="color:#000000;">${
      d["Student Name"]
    }</a></td>
              <td>${d["Redemption Status"] === "Yes" ? "✅" : "⚠️"}</td>
              <td>${d["# of Courses Completed"]}</td>
              <td>${d["# of Skill Badges Completed"]}</td>
              <td>${d["# of GenAI Game Completed"]}</td>
              <td>${d["Total Completions of both Pathways"]}</td>
          </tr>
      `;
  });
  document.getElementById("gccp_body").innerHTML = html;
};

updateData("");
const input = document.getElementById("input");
input.addEventListener("input", () => {
  updateData(input.value);
});
