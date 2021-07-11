const url = "https://api.spacexdata.com/v4/launches/";

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

        let article = launch.links.wikipedia ? launch.links.wikipedia : "";

        console.log(date);

        launchDetailContainer.innerHTML += `
        <a href="launches.html"> &#8592; Back to the overview</a>
            <div class="launch">
                
                <h1>${launch.name}</h1>
                <p>${date}</p>
                <iframe src="https://www.youtube.com/embed/${launch.links.youtube_id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <p>Details about the ${launch.name}: </p>
                <p>${details}</p>
                <p>Read more about it in this article on wikipedia ${article}</p>
                </div>
            `

    } catch (error) {
        console.log(error);
        launchDetailContainer.innerHTML = message("sorry", "error");
    }
}
fetchLaunch();