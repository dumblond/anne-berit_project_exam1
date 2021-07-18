const url = "https://api.spacexdata.com/v4/launchpads/";
const launchesUrl = "https://api.spacexdata.com/v4/launches/";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const launchPadDetailContainer = document.querySelector(".detailLaunchPad-container");

async function fetchLaunchPad() {
    try {
        const response = await fetch(url + params.get("id"));
        const LaunchPad = await response.json();
        console.log(LaunchPad);

        document.title = LaunchPad.name;

        launchPadDetailContainer.innerHTML = "";

        console.log(LaunchPad.longitude);

        launchPadDetailContainer.innerHTML += `
            <a href="${document.referrer}"> &#8592; Back to the overview</a>
            <h1>${LaunchPad.locality}</h1>
            <div class="information">
                <p><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg></p>
                <p> ${LaunchPad.details} </p>  
                <ul>
                    <li>Name: ${LaunchPad.name} </li>
                    <li>Timezone: ${LaunchPad.timezone} </li>
                    <li>Status: ${LaunchPad.status} </li>
                </ul>
                </div>    
            <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d3504.2632367722717!2d${LaunchPad.longitude}!3d${LaunchPad.latitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sno!2sno!4v1626532151927!5m2!1sno!2sno" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            <div class="launch-information"></div> 
            `;
        fetchLaunches(LaunchPad.launches);

    } catch (error) {
        console.log(error);
        launchPadDetailContainer.innerHTML = message("Sorry, something went wrong &#128533", "error");
    }
}

async function fetchLaunches(launchesId) {
    const launchDetailContainer = document.querySelector(".launch-information");

    launchDetailContainer.innerHTML = launchesId.length > 0 ? `<h2>Missions from this launchplace</h2>` : `<h2>No launches from here yet &#128528</h2>`;
        
    for (let i = 0; i < launchesId.length; i++) {
        const response =  await fetch(launchesUrl+launchesId[i]);
        const launch = await response.json();

        console.log(launch);
        launchDetailContainer.innerHTML += `
            <a href="launch_detail.html?id=${launch.id}"><li>${launch.name}</li></a>
            `;   
    }
}

fetchLaunchPad();