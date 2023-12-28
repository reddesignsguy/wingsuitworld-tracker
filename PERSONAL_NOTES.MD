// useEffect closes the modal as a side effect of the state of the parent
// The button in the parent handles the parent's state, which is subscribed to by the child's UseEffect() and UseState()

const modalRef = useRef(null); // \* allows us to reference the modal in the "HTML" world
