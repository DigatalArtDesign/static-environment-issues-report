import FormData  from "../classes/app-form-data/FormData";
import { api } from "../api/api";
import Dropdown from "../classes/app-dropdown/Dropdown";
import { Countriable } from "../interfaces/countries";

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let formData = new FormData();

  const initForm = () => {
    const injured = Object.values(formData.injuredFromAttack);
    for (let i = 0; i < injured.length; i += 1) {
      (document.getElementsByClassName("checkbox")[i] as HTMLInputElement).checked = injured[i];
    }
    Object.keys(formData.type).map((item, index) => (document.getElementsByClassName("form-radio-type")[index] as HTMLInputElement).checked = formData.type[item]);
    Object.keys(formData.amountOfInjures).map((item, index) => (document.getElementsByClassName("form-radio-amount")[index] as HTMLInputElement).checked = formData.amountOfInjures[item]);

    Object.keys(formData).map((item) => {
      if (typeof formData[item] !== "object" && item !== "description" && item !== "sentTime" && formData.isDomLinked(item) && item !== "country") {
        (document.getElementById(`form-${item}`) as HTMLInputElement).value = formData[item];
      }
    });
    (document.getElementById("form-description") as HTMLInputElement).value = formData.description;
  };

  const listenDomMultiselectCollection = (element, formObject, listener = "input", inputClass, isRadio = false) => {
    const domObject = document.getElementsByClassName(element);

    for (let i = 0; i < domObject.length; i++) {
      domObject[i].addEventListener(listener, () => {
        if (isRadio) {
          Object.keys(formObject).map((i) => {
            formObject[i] = false;
          });
        }
        const key = Object.keys(formObject).find((_, ind) => ind === i);
        formObject[key] = !formObject[key];
        const el = <HTMLInputElement>domObject[i].getElementsByClassName(inputClass)[0];
        if ((el.checked) !== undefined) {
          el.checked = formObject[key];
        } else {
          console.error("Selection error: This element doesn't have input with checked attribute");
        }
      }, true);
    }
  };

  const listenDomElement = (elementName, formObject) => {
    const domObject = document.getElementById(elementName);
    domObject.addEventListener("input", (e) => {
      formData[formObject] = (e.target as HTMLInputElement).value;
    });
  };

  const sendForm = () => {
    const button = document.getElementById("send-compliant");
    button.addEventListener("click", async () => {
      formData.sentTime = new Date().getTime();
      await api.sendReport(formData);
      localStorage.setItem("formItem", JSON.stringify(formData));
      window.location.href = ("./redirected.html");
    });
  };

  const resetForm = () => {
    const reset = document.getElementById("reset-form");
    reset.addEventListener("click", () => {
      console.log("reset form");
      formData.resetForm();
      initForm();
    });
  };

  initForm();
  listenDomMultiselectCollection("cb-container", formData.injuredFromAttack, "click", "checkbox");
  listenDomMultiselectCollection("form-radio-type-wrapper", formData.type, "click", "form-radio-type", true);
  listenDomMultiselectCollection("form-radio-amount-wrapper", formData.amountOfInjures, "click", "form-radio-amount", true);

  Object.keys(formData).map((item) => {
    if (typeof formData[item] !== "object" && item !== "description" && item !== "sentTime" && formData.isDomLinked(item)) {
      listenDomElement(`form-${item}`, item);
    }
    return item;
  });
  listenDomElement("form-description", "description");

  const createDropdown = (async () => {
    const dropdownContent: Countriable[] = await api.loadCountries();
    const props = {
      arrayOfElements: dropdownContent,
      defaultText: "Select your region",
      appendTo: "dropdown-section",
    };
    // eslint-disable-next-line no-unused-vars
    const drop = new Dropdown(props);
    drop.listenOptions();
    console.log(drop);
  });

  createDropdown();
  sendForm();
  resetForm();
});
