var intervalID;
var stpsec = 0;
var stpmin = 0;
var stphrs = 0;
var stpmillisec = 0;
var plustme = 0;
var count = 0;

// Function to start stopwatch setInterval call

let start = ()=> {
  startbutt.disabled = true;
  intervalID = setInterval(stpwatch, 10);
}

// Function to lap stopwatch

let lap = ()=> {
  count++;
  currtime = Number(`${stpsec}.${stpmillisec}`);
  plustme = currtime - plustme;
  console.log(Math.abs(plustme).toFixed(2));
  lapbox.innerHTML += `
    <div class="d-flex justify-content-evenly align-items-center text-wrap">
        <h3>${String(count).padStart(2, "0")}</h3>
        <h3>+${Math.abs(plustme).toFixed(2)}</h3>
        <h3>${
          String(stphrs).padStart(2, "0") +
          ":" +
          String(stpmin).padStart(2, "0") +
          ":" +
          String(stpsec).padStart(2, "0") +
          "." +
          String(stpmillisec).padStart(2, "0")
        }
    </div>    
        `;
  console.log(stphrs, stpmin, stpsec, stpmillisec);
  plustme = currtime;
}

// Function to stop stopwatch setInterval call
let stop = () => {
  startbutt.disabled = false;
  clearInterval(intervalID);
}

// Function of stopwatch that call repeatedly

let stpwatch = ()=> {
  ++stpmillisec;
  if (stpmillisec == 100) {
    stpmillisec = 0;
    ++stpsec;
  }

  if (stpsec == 60) {
    stpsec = 0;
    ++stpmin;
  }
  if (stpmin == 60) {
    ++stphrs;
  }
  var stpwtch =
    String(stphrs).padStart(2, "0") +
    " : " +
    String(stpmin).padStart(2, "0") +
    " : " +
    String(stpsec).padStart(2, "0") +
    ".";
  document.getElementById("stpwtch").innerHTML = stpwtch;
  document.getElementById("milli").innerHTML = String(stpmillisec).padStart(
    2,
    "0"
  );
}

// stopwatch function button action forwarding to each function
document.getElementById("startbutt").addEventListener("click", start);
document.getElementById("lapbutt").addEventListener("click", lap);
document.getElementById("stopbutt").addEventListener("click", stop);

// --------------------------------------------------------------------------------------------------

// counter function

var cuntinter;
var csec;
var cmin;
var chrs;
var cuntmillisec = 99;

// Function to start Timer setInterval call

let cuntstrt = ()=> {
  cntbutt.disabled = true;
  csec = cuntsec.value || 0;
  cmin = cuntmin.value || 0;
  chrs = cunthrs.value || 0;
  cuntinter = setInterval(counter, 10);
}

// Function to Resume Timer setInterval call

let cuntrestrt = ()=> {
  button1.disabled = true;
  cuntinter = setInterval(counter, 10.10101010101);
}

// Function to stop Timer setInterval call

let cuntstop = ()=> {
  cntbutt.disabled = false;
  clearInterval(cuntinter);
}

// Function of Timer that call repeatedly

let counter = ()=> {
  if (csec >= 0 && cmin >= 0 && chrs >= 0) {
    --cuntmillisec;
    if (cuntmillisec == 0) {
      cuntmillisec = 99;
      --csec;
    }

    if (csec == 0 && cmin == 0 && chrs == 0) {
      cmin++;
      cuntmillisec = 0;
      location.reload();
      clearInterval(cuntinter);
    }
    if (csec == 0) {
      if (cmin == 0 && csec == 0) {
        cmin = 60;
        chrs--;
      }
      csec = 60;
      cmin--;
    }
    if (csec == 60) {
      var cunterwtch =
        String(chrs).padStart(2, "0") +
        " : " +
        String(cmin).padStart(2, "0") +
        " : " +
        String("0").padStart(2, "0") +
        ".";
    } else {
      var cunterwtch =
        String(chrs).padStart(2, "0") +
        " : " +
        String(cmin).padStart(2, "0") +
        " : " +
        String(csec).padStart(2, "0") +
        ".";
    }

    document.getElementById("cunterwtch").innerHTML = cunterwtch;
    document.getElementById("cuntmilli").innerHTML = String(
      cuntmillisec
    ).padStart(2, "0");
  } else {
    document.getElementById(
      "cunterr"
    ).innerHTML = `*DoubleClick on STOP Button & enter time above zero`;
  }
}

// Timer function button action forwarding to each function

document.getElementById("cntbutt").addEventListener("click", cuntstrt);
document.getElementById("cntstpbutt").addEventListener("click", cuntstop);

// -----------------------------------------------------------------------------------------------

// age calculator function

let agecalc = ()=> {
  var brth = new Date(birth.value);
  var birthday = brth.getDate();
  var birthmonth = brth.getMonth() + 1;
  var birthyear = brth.getFullYear();

  var crnt = new Date(curent.value);
  var currentday = crnt.getDate();
  var currentmonth = crnt.getMonth() + 1;
  var currentyear = crnt.getFullYear();

  // year and month finding using without using date methods

  if (brth <= crnt) {
    if (birthmonth < currentmonth) {
      res_y = currentyear - birthyear; //years
      if (birthday <= currentday) {
        res_m = currentmonth - birthmonth; //month
      } else if (birthday > currentday) {
        res_m = currentmonth - birthmonth - 1; //month
      }
    } else if (birthmonth > currentmonth) {
      res_y = currentyear - birthyear - 1; //years
      if (birthday <= currentday) {
        res_m = 12 - birthmonth + currentmonth; //month
        res_d = Math.abs(birthday - currentday); //day
      } else if (birthday > currentday) {
        res_m = 12 - birthmonth + currentmonth - 1; //month
      }
    } else if (birthmonth == currentmonth) {
      if (birthday <= currentday) {
        res_y = currentyear - birthyear; //years
        res_m = currentmonth - birthmonth; //month
      } else if (birthday > currentday) {
        res_y = currentyear - birthyear - 1; //years
        res_m = 11; //month
      }
    }

    var date1 = new Date(`${currentmonth - 1}/${birthday}/${currentyear}`);
    var date2 = new Date(`${currentmonth}/${currentday}/${currentyear}`);

    //calculate time difference
    var time_difference = date2.getTime() - date1.getTime();
    //calculate days difference by dividing total milliseconds in a day
    var res_d = time_difference / (1000 * 60 * 60 * 24);

    if (res_d >= 31) {
      res_d -= 31;
    }

    age_res.innerHTML = `AGE : ${res_y} Years , ${res_m} Months , ${res_d} Days `;

    // calculation of detailed descriptions of age

    var t1 = new Date(`${birthmonth} ${birthday} ${birthyear}`);
    var t2 = new Date(`${currentmonth} ${currentday} ${currentyear}`);

    console.log(t1.getTime());
    console.log(t2.getTime());
    var allseconds = Math.abs(t1.getTime() - t2.getTime()) / 1000;
    var allminutes = allseconds / 60;
    var allhours = allminutes / 60;
    var alldays = allhours / 24;
    var allweeks = Math.floor(alldays / 7);
    var allweekdays = alldays % 7;
    var allmonths = res_y * 12 + res_m;

    age_det.innerHTML = `
  <h3>${allmonths} months ${res_d} days or</h3>
  <h3>${allweeks} weeks ${allweekdays} days or</h3>
  <h3>${alldays} days or</h3>
  <h3>${allhours} hours or</h3>
  <h3>${allminutes} minutes or</h3>
  <h3>${allseconds} Seconds</h3>
  `;

    // using date method to find the year of age

    // let getYearDiffWithMonth =(startDate, endDate)=> {
    //   const ms = endDate.getTime() - startDate.getTime();

    //   const date = new Date(ms);

    //   return Math.abs(date.getUTCFullYear() - 1970);
    // }

    // console.log(
    //   getYearDiffWithMonth(new Date('1995-01-29'), new Date('2023-08-1')),
    // );
  } else {
    agerr.innerHTML = `*There is an error in selecting date, date of birth needs to be earlier than the selected date.`;
  }
}
