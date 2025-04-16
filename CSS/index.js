$(document).ready(() => {
  const cardNumber = $("#number");
  const nameInput = $("#name");
  const monthInput = $("#month");
  const yearInput = $("#year");
  const cvcInput = $("#CVC");

  $(".completed-container").hide();

  // Update card name when #name input changes
  nameInput.on("input", () => {
    const nameValue = nameInput.val();
    $(".card-name p:first-child").text(nameValue || "Jane Appleseed"); // Fallback to default if empty
    $("#errorMsgName").text(""); // Clear error message
  });

  // Update card number when #number input changes
  cardNumber.on("input", () => {
    let numberValue = cardNumber.val().replace(/\D/g, ""); // Remove non-digits
    // Format the number with spaces every 4 digits
    numberValue = numberValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    // Trim to 16 digits max
    numberValue = numberValue.slice(0, 19); // 16 digits + 3 spaces
    $(".card-num").text(numberValue || "0000 0000 0000 0000"); // Fallback to default if empty
    $("#errorMsg").text(""); // Clear error message
  });

  // Update expiry date when #month or #year input changes
  monthInput.add(yearInput).on("input", () => {
    let monthValue = monthInput.val().replace(/\D/g, "").slice(0, 2); // Keep 2 digits
    let yearValue = yearInput.val().replace(/\D/g, "").slice(0, 2); // Keep 2 digits
    const expiryValue = `${monthValue || "00"}/${yearValue || "00"}`;
    $(".card-name p:last-child").text(expiryValue); // Update with MM/YY format
    $("#errorMsgDate").text(""); // Clear error message
  });

  // Update CVC when #CVC input changes
  cvcInput.on("input", () => {
    let cvcValue = cvcInput.val().replace(/\D/g, "").slice(0, 3); // Keep 3 digits
    $(".ATM-Back p").text(cvcValue || "000"); // Fallback to default if empty
    $("#errorCVC").text(""); // Clear error message
  });

  // Button click validation
  $("#btn1").click(() => {
    let hasError = false;

    if ($("#name").val() === "") {
      $("#errorMsgName").text("Enter your name");
      hasError = true;
    }
    if (cardNumber.val().length < 16) {
      $("#errorMsg").text("Incomplete number and numbers only");
      hasError = true;
    }
    if ($("#month").val() === "" || $("#year").val() === "") {
      $("#errorMsgDate").text("can't be blank");
      hasError = true;
    }
    if ($("#CVC").val() === "") {
      $("#errorCVC").text("can't be blank");
      hasError = true;
    }

    if (!hasError) {
      $(".completed-container").show();
      $(".card-input").hide();
    }
  });

  $("#btn").click(() => {
    location.reload();
  });
});
