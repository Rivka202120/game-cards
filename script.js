const listCards = document.querySelector(".listCards");
let sumSucesess = 0;
let err = 0;

function checkCardsEquals(ch1, ch2, e1, e2) {
    console.log("choose1: ", ch1);
    console.log("choose2: ", ch2);
    if (ch1 == ch2) {
        sumSucesess++;
        setTimeout(function () {
            e1.target.parentElement.remove();
            e2.target.parentElement.remove();
            alert("succeses馃憤");
        }, 1000);

    } else {
        err++;
        setTimeout(function () {
            e1.target.src = "card.jpg";
            e2.target.src = "card.jpg";
        }, 1000);
        // alert("error馃槩");

    }

    if (sumSucesess == 26) {
        e1.target.parentElement.remove();
        e2.target.parentElement.remove();
        alert("wowwwwwwwwwwwwwwwwwwwww馃槉");
    }

    if (err == 20) {
        alert("谞讻砖诇转, 讬砖 诇讱 20 讟注讜讬讜转. 讛诪砖讞拽 谞讙诪专专专专专专专专专专专专馃が");
        listCards.innerHTML="";
        getAllCards();
    }
}

function drawCards(cards) {
    console.log(cards);
    let choose1;
    let choose2;
    let e1;
    let e2;

    let flag = false;
    for (const card of cards) {

        console.log(card.image);
        const divCard = document.createElement("div");
        const img = document.createElement("img");

        divCard.className = "divCard";
        img.className = "img";
        img.src = "card.jpg";

        divCard.appendChild(img);
        listCards.appendChild(divCard);

        img.addEventListener("click", (e) => {

            img.src = card.image;

            if (!flag) {
                choose1 = card.value;
                flag = true;
                console.log("choose1: ", choose1);
                e1 = e;
            }
            else {
                choose2 = card.value;
                e2 = e;
                checkCardsEquals(choose1, choose2, e1, e2);
                flag = false;
            }
        })
    }

}

async function getAllCards() {
    const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const data = await res.json();
    const deckId = data.deck_id;
    console.log(deckId);
    const res2 = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`);
    const data2 = await res2.json();
    console.log(data2);
    drawCards(data2.cards);
}

getAllCards();

