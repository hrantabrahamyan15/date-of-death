const selectDate = document.querySelector("#selectDate");
const selectYear = document.querySelector("#selectYear");
const callButton = document.querySelector(".call__button");
const selectMount = document.querySelector("#selectMount");
const stepTwoButton = document.querySelectorAll(".stepTwoButton");
const stepTreeButton = document.querySelector(".stepTreeButton");
const stepFourButton = document.querySelectorAll(".stepFourButton");
const stepFiveButton = document.querySelectorAll(".stepFiveButton");

const loader = document.querySelector(".lds-spinner");
const stepTwo = document.querySelector("#stepTwo");
const stepCall = document.querySelector(".call");
const stepLoad = document.querySelector(".loader");
const stepTree = document.querySelector("#stepTree");
const stepFour = document.querySelector("#stepFour");
const stepFive = document.querySelector("#stepFive");
const callModal = document.querySelector(".call__modal");
const headerTitle = document.querySelector(".header__title");
const headerTooltip = document.querySelector(".header__tooltip");
const stepRecorting = document.querySelector(".recorting");
const recortingTitle = document.querySelector(".recorting__title");
const recortingRadio = document.querySelector(".recorting__radio");
const callModalContent = document.querySelector(".call__modal_content");
const activeStepFooter = document.querySelector(".content__footer_text");
const headerTooltipText = document.querySelector(".header__tooltip_text");

const loadingItems = Array.from({ length: 12 }, (v, i) => i);
const arrDayes = Array.from({ length: 31 }, (v, i) => i + 1);
const arrMount = Array.from({ length: 12 }, (v, i) => i + 1);
const arrYear = Array.from({ length: 72 }, (v, i) => i + 1932);

const editStepTwoHandler = () => {
  const changeStepHandler = (step) => {
    switch (step) {
      case 3:
        stepTwo.classList.add("hide");
        stepTree.classList.add("show");
        activeStepFooter.innerText = "Вопрос 3-5";
        headerTitle.innerText =
          "Уже совсем скоро Вы узнаете много интересного о своем будущем!";
        break;
      case 4:
        stepLoad.classList.add("show");
        setTimeout(() => {
          stepLoad.classList.remove("show");
          stepLoad.classList.add("hide");
          changeStepHandler(5);
        }, 2000);
        break;
      case 5:
        stepTwo.classList.add("hide");
        stepTree.classList.remove("show");
        stepFour.classList.add("show");
        activeStepFooter.innerText = "Вопрос 4-5";
        headerTitle.innerText =
          "Смерть родного человека – одно из тяжелейших испытаний в жизни каждого из нас!";
        break;
      case 6:
        stepFour.classList.remove("show");
        stepFive.classList.add("show");
        headerTitle.classList.add("hide");
        headerTooltip.classList.add("show");
        activeStepFooter.innerText = "Вопрос 5-5";
        break;

      case 7:
        stepFive.classList.remove("show");
        stepRecorting.classList.add("show");
        recortingTitle.classList.add("animation_title");
        recortingRadio.classList.add("animation_radio");

        setTimeout(() => {
          stepRecorting.classList.remove("show");
          stepLoad.classList.add("hide");
          changeStepHandler(8);
        }, 2500);
        break;
      case 8:
        stepCall.classList.add("show");

        break;
      default:
        break;
    }
  };

  callButton.addEventListener("click", () => {
    fetch("https://swapi.dev/api/people/1/")
      .then((response) => response.json())
      .then((data) => {
        callModal.classList.add("show");

        const {
          name,
          mass,
          height,
          gender,
          eye_color,
          hair_color,
          skin_color,
          birth_year,
        } = data;

        Object.keys(data).forEach((item) => {
          const value = data[item];
          if (typeof value === "string") {
            const p = document.createElement("p");
            const div = document.createElement("div");
            const span = document.createElement("span");

            p.innerText = `${item}:`;
            span.innerText = value;
            div.appendChild(p);
            div.appendChild(span);
            div.classList.add("call__modal_item");
            callModalContent.appendChild(div);
          }
        });

        console.log(data);
      });
  });

  stepTwoButton.forEach((item) => {
    item.addEventListener("click", () => {
      changeStepHandler(3);
    });
  });

  stepTreeButton.addEventListener("click", () => {
    changeStepHandler(4);
  });

  stepFourButton.forEach((item) => {
    item.addEventListener("click", () => {
      changeStepHandler(6);
    });
  });

  stepFiveButton.forEach((item) => {
    item.addEventListener("click", () => {
      changeStepHandler(7);
    });
  });

  selectYear.addEventListener("change", (e) => {
    const { value } = e.target;
    const calculateYear = 2021 - Number(value);

    if (calculateYear > 46) {
      headerTooltipText.innerText =
        "По вам скучает очень близкий человек, которого больше нет в мире живых. Возможно это кто-то из Ваших родителей.";
    } else if (calculateYear >= 36 && calculateYear <= 45) {
      headerTooltipText.innerText =
        "По вам скучает очень близкий человек, которого больше нет в мире живых. Возможно это дедушка или бабушка.";
    } else {
      headerTooltipText.innerText =
        "По вам скучает очень близкий человек, которого больше нет в мире живых.";
    }
  });

  loadingItems.map((item) => {
    const div = document.createElement("div");
    loader.appendChild(div);
  });

  arrDayes.map((item) => {
    const options = document.createElement("option");
    if (item <= 9) {
      options.innerHTML = `0${item}`;
    } else {
      options.innerHTML = item;
    }
    selectDate.appendChild(options);
  });

  arrMount.map((item) => {
    const options = document.createElement("option");
    if (item <= 9) {
      options.innerHTML = `0${item}`;
    } else {
      options.innerHTML = item;
    }
    selectMount.appendChild(options);
  });

  arrYear.map((item) => {
    const options = document.createElement("option");
    options.innerHTML = item;
    selectYear.appendChild(options);
  });
};

editStepTwoHandler();
