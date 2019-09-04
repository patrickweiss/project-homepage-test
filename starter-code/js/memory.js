class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
    this.shuffleCards();
  }
  shuffleCards() {
    var counter = this.cards.length;

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = this.cards[counter];
      this.cards[counter] = this.cards[index];
      this.cards[index] = temp;
    }
  }

  flipCardInDiv(cardDiv) {
    const backSideDiv = cardDiv.getElementsByClassName("back")[0];
    const frontSideDiv = cardDiv.getElementsByClassName("front")[0];
    backSideDiv.setAttribute("class", "front");
    frontSideDiv.setAttribute("class", "back");
    console.log(backSideDiv);
    console.log(frontSideDiv);
  }
  selectCard(card) {
    const cardDiv = card.parentNode;
    this.flipCardInDiv(cardDiv);
    this.pickedCards.push(card)
    if (this.pickedCards.length === 2) {
      console.log("second card, is it a pair?");
      console.log(this.pickedCards[0]);
      console.log(this.pickedCards[1]);
      if (this.checkIfPair(this.pickedCards[0], this.pickedCards[1])) {
        console.log("It's a pair :)");
      }
      else {
        console.log("It's not a pair :(");
        const cardDiv1 = this.pickedCards[0].parentNode;
        const cardDiv2 = this.pickedCards[1].parentNode;
        const that = this ;
        setTimeout(
          ()=>{
            that.flipCardInDiv(cardDiv1);
            that.flipCardInDiv(cardDiv2);    
          }
          ,2000
        );
      }
      this.pickedCards=[];
    }
    if (this.isFinished()){
      console.log("you won!");
      document.getElementById("you_won").innerHTML="<h1>You Won </h1>"
    }
  }
  checkIfPair(card1, card2) {
    console.log(card1.getAttribute("name"))
    console.log(card2.getAttribute("name"))
    this.pairsClicked ++ ;
    document.getElementById("pairs_clicked").innerHTML=this.pairsClicked.toString();
    if (card1.getAttribute("name") === card2.getAttribute("name")) {
      this.pairsGuessed++;
      document.getElementById("pairs_guessed").innerHTML=this.pairsGuessed.toString();
      return true;
    } else return false;

  }

  isFinished() {
    if (this.pairsGuessed === 12) return true;
    return false
  }
}