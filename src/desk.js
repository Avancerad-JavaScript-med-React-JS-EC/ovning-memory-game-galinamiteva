function shuffle(array) {
  const _array = array.slice();
  for (let i = _array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [_array[i], _array[randomIndex]] = [_array[randomIndex], _array[i]];
  }
  return _array;
}

export default function initializeDeck() {
  const types = [
    'astronaut', 'clown', 'cook', 'diver',
    'doctor', 'fairy', 'musician', 'police'
  ];

  const cards = types.flatMap((type, index) => ([
    { id: index * 2, type },
    { id: index * 2 + 1, type }
  ]));

  return shuffle(cards);
}
