const rocketsUrl = "https://api.spacexdata.com/v4/rockets";

const rocketsContainer = document.querySelector(".rockets-container");

async function fetchRockets() {
    try {
        const responseRockets = await fetch(rocketsUrl);
        const rockets = await responseRockets.json(); 

        rocketsContainer.innerHTML = "";

        for (let i = 0; i < rockets.length; i++) {
            rocketsContainer.innerHTML += `
                <a href="rocket_detail.html?id=${rockets[i].id}">
                    <div class="launches">
                        <img alt="Picture of ${rockets[i].name}" referrerpolicy="no-referrer" class="images" src="${rockets[i].flickr_images}">
                        <h2>${rockets[i].name}</h2>
                    </div>
                </a>`;
        }
        
    } catch (error) {
        console.log(error);
        rocketsContainer.innerHTML = message("Sorry, something went wrong &#128533", "error");
    }
}
fetchRockets();