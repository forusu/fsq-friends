const apiURL = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks";
const apiFormat = "json";
const apiUser = "npenullpointer";
const apiKey = process.env.VIXIS_LASTFM_API_KLEY;
const apiResultLimit = 2;
const nowPlayingElement = document.getElementById("lastfm");

window.onload = function() {
    nowPlaying();
};

function nowPlaying() {
    setTimeout(fetchPlays, 1500);
    setInterval(fetchPlays, 10000);
}

async function fetchPlays() {
    const url = `${apiURL}&user=${apiUser}&api_key=${apiKey}&format=${apiFormat}&limit=${apiResultLimit}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const results = await response.json();

            const currTrack = {
                title: results.recenttracks.track[0]?.name,
                artists: results.recenttracks.track[0]?.artist?.["#text"],
                playing: results.recenttracks.track[0]?.["@attr"]?.nowplaying,
            };
            currTrack.artist = currTrack.artists.split(" • ")[0];

            if (currTrack.playing == "true") {
                nowPlayingElement.style.color = "var(--fg)";
                nowPlayingElement.innerHTML = `${currTrack.artist} - ${currTrack.title}`;
            }
            else
            {
                nowPlayingElement.innerHTML = "nothing playing,,,";
            }
        }
        else {
            throw new Error("Couldn't grab results. Something fucked up.");
        }
    }
    catch (error) {
        console.error("Error:", error)
    }
}



