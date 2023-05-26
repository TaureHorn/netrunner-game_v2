function UserDisplayStatus(props) {
  const user = props.user;

  return (
    <>
      <div className="inlineBoxLeft item" style={{ paddingLeft: "2%" }}>
        <div>
          <img
            src={user._pfp}
            width="72"
            title={user._alias + "'s profile picture"}
            alt="user profile"
          />
        </div>
        <div style={{ lineHeight: "0.5" }}>
          <p className="ircText">
            <strong>{user._name} / {user._alias}</strong> [
            {user._connectionStatus}]
          </p>
          <p className="ircText">
            <em>{user._status}</em>
          </p>
          <br />
        </div>
      </div>
    </>
  );
}

export default UserDisplayStatus;
