function ThemeInputs() {
  const theme = "dark";

  function changeTheme(theme) {
    console.log(theme);
    fetch("/setTheme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        theme: theme,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        // TODO: error checking
        console.log(text, "set as theme");
      });
  }

  return (
    <div className="themeInputs" onChange={(e) => changeTheme(e.target.value)}>
      <label htmlFor="light">Light </label>
      <input
        type="radio"
        name="theme"
        value="light"
        defaultChecked={theme === "light"}
      />
      <label htmlFor="dark">Dark </label>
      <input
        type="radio"
        name="theme"
        value="dark"
        defaultChecked={theme === "dark"}
      />
    </div>
  );
}

export default ThemeInputs;
