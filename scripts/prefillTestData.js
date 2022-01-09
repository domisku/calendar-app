prefillTestData();

function prefillTestData() {
  const testDataFilled = sessionStorage.getItem("testDataFilled");
  if (testDataFilled && Object.keys(sessionStorage).length > 1) return;

  sessionStorage.setItem("testDataFilled", "true");
  TEST_DATA.forEach((event) =>
    sessionStorage.setItem(String(Math.random()), JSON.stringify(event))
  );
}
