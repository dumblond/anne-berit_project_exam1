const url = "https://api.spacexdata.com/v4/launches";

const dataContainer = document.querySelector(".launch-container");

async function fetchLaunches() {
    try {
            const response = await fetch(url);
            const launches = await response.json();

            console.log(launches);

            dataContainer.innerHTML = "";

        for (let i = 0; i < launches.length; i++) {
            console.log(launches[i].links.wikipedia)
            let failures = launches[i].failures.length > 0 ? "yes" : "no";
            let patch = launches[i].links.patch.small ? 
                `<img alt="Picture of ${launches[i].name}" referrerpolicy="no-referrer" class="images" src="${launches[i].links.patch.small}">` 
                : `<img alt="Picture not found" class="images" src="images/rocket.png">`;
            
            
            dataContainer.innerHTML += `
                <div class="launches">
                    <a href="launch_detail.html?id=${launches[i].id}">
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