let user = localStorage.getItem("login");
      function populateDropdown(select, start, end) {
        for (let i = start; i <= end; i++) {
          let option = document.createElement("option");
          option.value = i;
          option.text = i;
          select.appendChild(option);
        }
      }
      let dayDropdown = document.getElementById("day");
      populateDropdown(dayDropdown, 1, 31);
      let monthDropdown = document.getElementById("month");
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      for (let i = 0; i < months.length; i++) {
        let option = document.createElement("option");
        option.value = i + 1; 
        option.text = months[i];
        monthDropdown.appendChild(option);
      }
      let yearDropdown = document.getElementById("year");
      let currentYear = new Date().getFullYear();
      populateDropdown(yearDropdown, currentYear - 100, currentYear);
      function chooseFile(input) {
        var preview = document.getElementById("image-preview");
        var imgFile = document.getElementById("imgFile");
        var file = input.files[0];
        if (file) {
          var reader = new FileReader();
          reader.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;
            preview.innerHTML = ""; 
            preview.appendChild(img);
            imgFile.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      }