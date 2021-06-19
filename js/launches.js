const url = "https://api.spacexdata.com/v4/launches";

const dataContainer = document.querySelector(".launch-container");

async function fetchLaunches() {
    try {
            const response = await fetch(url);
            const launches = await response.json();

            console.log(launches);

            dataContainer.innerHTML = "";

        for (let i = 0; i < launches.length; i++) {
            console.log(launches[i].links.patch.small)
            dataContainer.innerHTML += `
                                        <div class="launches">
                                            <a href="launch_detail.html?id=${launches[i].name}">
                                            <img alt="Piture of=${launches[i].name}" src="${launches[i].links.patch.small}">
                                        </div>
                                        `
        }
             

    } catch (error) {
        console.log(error);
        dataContainer.innerHTML = message("sorry", "error");
    }
}

fetchLaunches();