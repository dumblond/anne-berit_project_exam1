const url = "https://api.spacexdata.com/v4/launches/";
const rocketUrl = "https://api.spacexdata.com/v4/rockets/";
const launchPadUrl = "https://api.spacexdata.com/v4/launchpads/";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const launchDetailContainer = document.querySelector(".detail-container");

async function fetchLaunch() {
    try {
        const response = await fetch(url + params.get("id"));
        const launch = await response.json();
        console.log(launch.details);

        document.title = launch.name;

        launchDetailContainer.innerHTML = "";

        let date = new Date(launch.date_utc).toLocaleString();

        let details = launch.details ? launch.details : "";

        const wikipedia = launch.links.wikipedia ? `
            <p><a class="details" href="${launch.links.wikipedia}">
                <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="wikipedia-w" class="svg-inline--fa fa-wikipedia-w fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M640 51.2l-.3 12.2c-28.1.8-45 15.8-55.8 40.3-25 57.8-103.3 240-155.3 358.6H415l-81.9-193.1c-32.5 63.6-68.3 130-99.2 193.1-.3.3-15 0-15-.3C172 352.3 122.8 243.4 75.8 133.4 64.4 106.7 26.4 63.4.2 63.7c0-3.1-.3-10-.3-14.2h161.9v13.9c-19.2 1.1-52.8 13.3-43.3 34.2 21.9 49.7 103.6 240.3 125.6 288.6 15-29.7 57.8-109.2 75.3-142.8-13.9-28.3-58.6-133.9-72.8-160-9.7-17.8-36.1-19.4-55.8-19.7V49.8l142.5.3v13.1c-19.4.6-38.1 7.8-29.4 26.1 18.9 40 30.6 68.1 48.1 104.7 5.6-10.8 34.7-69.4 48.1-100.8 8.9-20.6-3.9-28.6-38.6-29.4.3-3.6 0-10.3.3-13.6 44.4-.3 111.1-.3 123.1-.6v13.6c-22.5.8-45.8 12.8-58.1 31.7l-59.2 122.8c6.4 16.1 63.3 142.8 69.2 156.7L559.2 91.8c-8.6-23.1-36.4-28.1-47.2-28.3V49.6l127.8 1.1.2.5z"></path></svg> 
            Read more about ${launch.name} at Wikipedia</a></p>` : "";

        const article = launch.links.article ? `
            <p><a class="details" href="${launch.links.article}">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="newspaper" class="svg-inline--fa fa-newspaper fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z"></path></svg>
            Here is an article on ${launch.name}</a></p> ` : "";

        const video = launch.links.youtube_id ? `
            <div class="video">
                <iframe src="https://www.youtube.com/embed/${launch.links.youtube_id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div>` : "";

        console.log(launch);

        launchDetailContainer.innerHTML += `
            <a href="${document.referrer}"> &#8592; Back to the overview</a>
            <h1>${launch.name}</h1>
            <div class="information">
                <p><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg></p>
                <p>Launch date and time: ${date}</p>
                <p>${details}</p>
            </div>
            <div class="rocket-information"></div>
            <div class="launchpad-information"></div>
            ${video}
            ${article}
            ${wikipedia}        
            `;
        fetchRocket(launch.rocket);
        fetchLaunchpad(launch.launchpad);

    } catch (error) {
        console.log(error);
        launchDetailContainer.innerHTML = message("Sorry, something went wrong &#128533", "error");
    }
}

async function fetchRocket(rocketId) {
    const rocketDetailContainer = document.querySelector(".rocket-information");

    const response = await fetch(rocketUrl+rocketId);
    const rocket = await response.json();

    console.log(rocket.flickr_images);
    
    rocketDetailContainer.innerHTML = `
        <div class="information">
            <a href="rocket_detail.html?id=${rocket.id}"><h2>Rocket ${rocket.name}</h2></a>
            <img alt="Picture of ${rocket.name}" referrerpolicy="no-referrer" class="images" src="${rocket.flickr_images}">
            <div class="rocket-facts">
                <ul>
                    <li>Height: ${rocket.height.meters} meters</li>
                    <li>Diameter: ${rocket.diameter.meters} meters</li>
                    <li>Weight: ${rocket.mass.kg} kg</li>
                </ul>
            </div>
        </div>
    `;
}

async function fetchLaunchpad(launchPadId) {
    const launchPadDetialContainer = document.querySelector(".launchpad-information");

    const response = await fetch(launchPadUrl+launchPadId);
    const launchpad = await response.json();

    console.log(launchpad.name);

    launchPadDetialContainer.innerHTML = `
        <div class="information">
            <a href="launchplaces_detail.html?id=${launchpad.id}"><h2>Launchpad ${launchpad.locality}</h2></a>
            <img alt="Picture of ${launchpad.name}" referrerpolicy="no-referrer" class="images" src="${launchpad.images.large}">
            <div class ="launcpad-facts"
            <ul>
                <li>Name: ${launchpad.name}</li>
                <li>Locality: ${launchpad.locality}</li>
                <li>Status: ${launchpad.status}</li>
            </ul>
            <p>Details: ${launchpad.details}</p>
    `;
}

fetchLaunch();