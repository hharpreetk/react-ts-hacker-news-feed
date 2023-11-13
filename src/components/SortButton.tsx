const SORT_ARROWS: { NONE: string; ASCENDING: string; DESCENDING: string } = {
  NONE: "⮃",
  ASCENDING: "⮇",
  DESCENDING: "⮅",
};

const SortButton = ({
  handleSort,
  isActive,
  isReverse,
  normalOrderText,
  reverseOrderText,
}): SortButtonProps => (
  <button
    onClick={handleSort}
    alt={isReverse ? reverseOrderText : normalOrderText}
    title={isReverse ? reverseOrderText : normalOrderText}
  >
    {isActive
      ? isReverse
        ? SORT_ARROWS.DESCENDING
        : SORT_ARROWS.ASCENDING
      : SORT_ARROWS.NONE}
  </button>
);

export default SortButton;
