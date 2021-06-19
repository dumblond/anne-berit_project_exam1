const url = "https://api.spacexdata.com/v4/launches";

const dataContainer = document.querySelector(".launch-container");

async function fetchLaunches() {
    try {
            const response = await fetch(url);
            const launches = await response.json();

            console.log(launches);

            dataContainer.innerHTML = "";

        for (let i = 0; i < launches.length; i++) {
            console.log(launches[i])
            let failures;
            let patch;
            if (launches[i].failures.length > 0) {
                failures = "yes";
            }
            else {
                failures = "no";
            }
            if (launches[i].links.patch.small) {
                patch = `<img alt="Picture of ${launches[i].name}" src="${launches[i].links.patch.small}">`
            }
            else {
                patch = `<img alt="Picture not found" src="images/rocket.png">`;
            }
            
            dataContainer.innerHTML += `
                                        <div class="launches">
                                            <a href="launch_detail.html?id=${launches[i].name}">
                                            ${patch}
                                            <p> Name: ${launches[i].name} </p>
                                            <p> Failure: ${failures} </p>
                                        </div>
                                        `
        }
             

    } catch (error) {
        console.log(error);
        dataContainer.innerHTML = message("sorry", "error");
    }
}

fetchLaunches();