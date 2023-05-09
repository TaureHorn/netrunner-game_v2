function UserDisplayStatus(props) {
  const user = props.user;

  return (
    <>
      <div className="inlineBoxLeft hoverRed" style={{ paddingLeft: "2%" }}>
        <div>
          <img
            src={user._pfp}
            width="72"
            title={user._alias + "'s profile picture"}
            alt="a users profile picture"
          />
        </div>
        <div style={{ lineHeight: "0.5" }}>
          <p>
            <strong>{user._alias}</strong> <em>({user._pronoun})</em> [
            {user._connectionStatus}]
          </p>
          <p>
            <em>{user._status}</em>
          </p>
          <br />
        </div>
      </div>
    </>
  );
}

export default UserDisplayStatus;
