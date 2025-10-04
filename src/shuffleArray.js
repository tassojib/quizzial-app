export  function shuffleArray(array) {
  const copy = [...array]; // don’t mutate the original
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    [copy[i], copy[j]] = [copy[j], copy[i]]; // swap
  }
  return copy;
}
