document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  
  // Optionally, add form validation or AJAX here

  const toast = document.getElementById("toast");
  toast.className = "show";

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);

  // Clear form
  this.reset();
});
