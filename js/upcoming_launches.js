const url = "https://api.spacexdata.com/v4/launches/upcoming";

const dataContainer = document.querySelector(".launch-container");

async function fetchLaunches() {
    try {
        const response = await fetch(url);
        const launches = await response.json();
           
        dataContainer.innerHTML = "";

        for (let i = 0; i < launches.length; i++) {
            let patch = launches[i].links.patch.small ? 
                `<img alt="Picture of ${launches[i].name}" referrerpolicy="no-referrer" class="images" src="${launches[i].links.patch.small}">` 
                : `<img alt="Picture not found" class="images" src="images/rocket_picture_not_found.png">`;
            
            dataContainer.innerHTML += `
                <div class="launches">
                    <a href="launch_detail.html?id=${launches[i].id}">
                        ${patch}
                        <h2>${launches[i].name}</h2>
                        <p>${new Date(launches[i].date_utc).toLocaleDateString()}</p>
                    </a>
                </div>`;
        }            

    } catch (error) {
        console.log(error);
        dataContainer.innerHTML = message("Sorry, something went wrong &#128533", "error");
    }
}

fetchLaunches();