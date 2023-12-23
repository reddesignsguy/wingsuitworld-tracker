const { useState } = require("react");

export default function AlertBar(props) {
  const { text, popup } = props;
  const [popupIsRevealed, setPopupIsRevealed] = useState(false);

  return (
    <>
      <section
        className={!popup ? "alert-bar" : "alert-bar_popup"}
        // TODO alert bar should not be clickable
        onClick={() => {
          setPopupIsRevealed(true);
        }}
      >
        <span className="alert-bar__text"> {text} </span>
      </section>

      {popup && popupIsRevealed ? popup : null}
    </>
  );
}
