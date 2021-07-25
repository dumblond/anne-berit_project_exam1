const url = "https://api.spacexdata.com/v4/launchpads";

const launchpadsContainer = document.querySelector(".launch-container");

async function fetchLaunchpads() {
    try {
        const response = await fetch(url);
        const launchpads = await response.json();

        launchpadsContainer.innerHTML = "";

        for (let i = 0; i < launchpads.length; i++) {
            
            launchpadsContainer.innerHTML += `
                <div class="launches">
                    <a href="launchplaces_detail.html?id=${launchpads[i].id}">
                    <img alt="Picture of ${launchpads[i].name}" referrerpolicy="no-referrer" class="images" src="${launchpads[i].images.large}">
                    <h2>${launchpads[i].locality}</h2>
                    <p>${launchpads[i].region}</p>    
                </div>`;
        }

    } catch (error) {
        console.log(error);
        launchpadsContainer.innerHTML = message("Sorry, something went wrong &#128533", "error");
    }
}
fetchLaunchpads();