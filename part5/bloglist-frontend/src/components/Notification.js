function Notification({ message, type }) {
  const notificationStyle = type === "success" ? {
    color: 'green',
    background: 'lightgrey',
    border: 'solid green',
    fontSize: '30px',
    padding: '0px',
    marginBottom: '15px',
    width:'max-content'
  } :
    {
      color: 'red',
      background: 'lightgrey',
      border: 'solid red',
      fontSize: '30px',
      padding: '0px',
      marginBottom: '15px',
      width:'max-content'
    };

  const paragraphStyle = {
    padding: '5px',
    margin: '5px 0 5px 0px'
  }


  return (
    <div style={notificationStyle}>
      <p style={paragraphStyle}>{message}</p>
    </div>
  )
}

export default Notification;