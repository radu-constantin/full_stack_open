function Notification( {messageObj} ) {
  const successDivStyle = {
    border: "solid green",
    background: "lightgrey",
    color: "green"
  };

  const errorDivStyle = {
    border: "solid red",
    background: "lightgrey",
    color: "red"
  };

  const pStyle = {
    lineHeight: "0px",
    fontSize: "20px"
  }


  if (messageObj === null) {
    return;
  }

  return (
    <div style={messageObj.type === "success" ? successDivStyle : errorDivStyle}>
      <p style={pStyle}>{messageObj.message}</p>
    </div>
  )
}

export default Notification;