let cards = [];
let flippedCards = [];
let numPairs = 5;
let cardSize = 100;
let margin = 10;
let backgroundColor = 200;
let cardColor = 255;
let matchedPairs = 0;
let canClick = true;
let congratulations = false;

function setup() {
  createCanvas(600, 400);
  createCards();
  shuffle(cards, true);
}

function draw() {
  background(backgroundColor);
  displayCards();
  
  if (congratulations) {
    textSize(24);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text("Parabéns! Você encontrou todos os pares.", width / 2, height / 2);
  }
}

function createCards() {
  let values = [];
  for (let i = 0; i < numPairs; i++) {
    values.push(i);
    values.push(i);
  }
  shuffle(values, true);
  
  for (let i = 0; i < values.length; i++) {
    let card = {
      value: values[i],
      x: (i % 5) * (cardSize + margin) + margin,
      y: floor(i / 5) * (cardSize + margin) + margin,
      width: cardSize,
      height: cardSize,
      flipped: false,
      matched: false
    };
    cards.push(card);
  }
}

function displayCards() {
  for (let card of cards) {
    fill(card.matched ? color(0, 255, 0) : card.flipped ? color(255) : cardColor);
    rect(card.x, card.y, card.width, card.height);
    if (card.flipped || card.matched) {
      fill(0);
      textSize(20);
      textAlign(CENTER, CENTER);
      text(card.value, card.x + card.width / 2, card.y + card.height / 2);
    }
  }
}

function mousePressed() {
  if (!canClick) return;
  
  for (let card of cards) {
    if (!card.matched && !card.flipped && mouseX > card.x && mouseX < card.x + card.width && mouseY > card.y && mouseY < card.y + card.height) {
      card.flipped = true;
      flippedCards.push(card);
      if (flippedCards.length === 2) {
        canClick = false;
        setTimeout(checkMatch, 1000);
        break;
      }
    }
  }
}

function checkMatch() {
  if (flippedCards.length === 2) {
    if (flippedCards[0].value === flippedCards[1].value) {
      flippedCards[0].matched = true;
      flippedCards[1].matched = true;
      matchedPairs++;
      if (matchedPairs === numPairs) {
        congratulations = true;
      }
    } else {
      for (let card of flippedCards) {
        card.flipped = false;
      }
    }
    flippedCards = [];
  }
  canClick = true;
}
