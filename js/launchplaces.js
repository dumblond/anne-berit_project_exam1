const url = "https://api.spacexdata.com/v4/launchpads";

const launchpadsContainer = document.querySelector(".launch-container");

async function fetchLaunchpads() {
    try {
        const response = await fetch(url);
        const launchpads = await response.json();

        console.log(launchpads);

        launchpadsContainer.innerHTML = "";

        for (let i = 0; i < launchpads.length; i++) {
            console.log(launchpads[i].images.large)

            launchpadsContainer.innerHTML += `
                <div class="launches">
                    <a href="launchplaces_detail.html?id=${launchpads[i].id}">
                    <img alt="Picture of ${launchpads[i].name}" referrerpolicy="no-referrer" class="images" src="${launchpads[i].images.large}">
                    <p> Name: ${launchpads[i].name} </p>

                </div>
                                                `


        }


    } catch (error) {
        console.log(error);
        launchpadsContainer.innerHTML = message("sorry", "error");
    }
}

fetchLaunchpads();