import { useState, useEffect } from 'react';

export const useGameState = () => {
 const cardData = [
    { id: 1, value: 'A' },
    { id: 2, value: 'B' },
    { id: 3, value: 'C' },
    { id: 4, value: 'D' },
    { id: 5, value: 'E' },
    { id: 6, value: 'F' },
    { id: 7, value: 'G' },
    { id: 8, value: 'H' },
  ];
  
  const shuffleCards = () => {
    const cards = [...cardData, ...cardData].map((card,index) => ({
      ...card,
      isFlipped: false,
      isMatched: false,
      index
    }));
    return cards.sort(() => Math.random() - 0.5);
  };
  const [cards, setCards] = useState(shuffleCards());
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (firstCard && secondCard) {
      setIsDisabled(true);

      if (firstCard.value === secondCard.value) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.value === firstCard.value ? { ...card, isMatched: true } : card
          )
        );
        setMatches((prev) => prev + 1);
      
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.value === firstCard.value || card.value === secondCard.value
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 300);
      }

      setTimeout(() => {
        setFirstCard(null);
        setSecondCard(null);
        setIsDisabled(false);
    
      }, 1000);
    }
  }, [firstCard, secondCard]);

  const handleCardClick = (card) => {
    if (isDisabled || card.isFlipped || card.isMatched) return;

    setCards((prevCards) =>
      prevCards.map((c) =>
        c.index === card.index ? { ...c, isFlipped: true } : c
      )
    );

    if (!firstCard) {
      setFirstCard(card);
    } else {
      setSecondCard(card);
      setMoves((prev) => prev + 1);
    }
  };

  const restartGame = () => {
    setCards(shuffleCards());
    setFirstCard(null);
    setSecondCard(null);
    setMoves(0);
    setMatches(0);
    setIsDisabled(false);
  };

  return { cards, moves, matches, handleCardClick, restartGame };
};