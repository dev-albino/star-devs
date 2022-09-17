const personsCard = document.getElementById("persons");
const starshipsCard = document.getElementById("starships");
const planetsCard = document.getElementById("planets");
const btnPhrases = document.getElementById("btn-phrases");
btnPhrases.addEventListener("click", loadPhrase);
const phrase = document.getElementById("phrase");

function getData(param){
    return fetch(`https://swapi.dev/api/${param}`).then(res => res.json());
};

function fillCounters(){
    Promise.all([
        getData("people"),
        getData("starships"),
        getData("planets")
    ]).then(data => {
        personsCard.innerHTML = data[0].count;
        personsCard.style.fontSize = "5em";

        starshipsCard.innerHTML = data[1].count;
        starshipsCard.style.fontSize = "5em";

        planetsCard.innerHTML = data[2].count;
        planetsCard.style.fontSize = "5em";
    }).catch(err => console.error('ERROR: ', err));
};

fillCounters();

function loadPhrase(){
    return fetch(`https://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote`)
    .then(res => res.json())
    .then(data => {
        phrase.innerHTML = `"${data.content}"`;
        btnPhrases.innerHTML = "Ver mais uma frase!";

        phrase.animate([
            {transform: 'translateY(-100px)'},
            {transform: 'translateY(0px)'},
        ], {duration: 500});
    })
    .catch(err => console.error('ERROR: ', err));
};