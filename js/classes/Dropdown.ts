import uuid from "uuid";
import { Countriable } from "../interfaces/countries";
import { Elementable } from "../interfaces/elementable";

interface DropdownContructor {
    arrayOfElements: Array<Countriable>;
    defaultText: string;
    appendTo: string;
}

export default class Dropdown {
    private optionButton!: Elementable;

    private dropdown!: Elementable;

    private selected!: Elementable;

    private menuDropdown!: Elementable;

    private dropdownOptions!: Elementable;

    private createNewElement(element: Elementable): void {
      const el = document.createElement(element.tag);
      el.id = element.id;
      element.class.map((i) => el.classList.add(i));
      if (element.attributes) {
        element.attributes.map((i) => el.setAttribute(i.name, i.value));
      }
      if (element.innerHtml) {
        el.innerHTML = element.innerHtml;
      }
      const parent = document.getElementById(element.parentElementId);
      parent.appendChild(el);
    }

    constructor(props: DropdownContructor) {
      const id = uuid();
      this.dropdown = {
        tag: "div",
        id: `dropdown-${id}`,
        class: "dropdown is-w-full".split(" "),
        parentElementId: props.appendTo,
      };
      this.optionButton = {
        tag: "button",
        id: `options-menu-${id}`,
        class: "button select cursor-pointer is-display-flex".split(" "),
        parentElementId: this.dropdown.id,
        attributes: [
          { name: "aria-haspopup", value: "true" },
          { name: "aria-expanded", value: "true" },
        ],
      };

      this.menuDropdown = {
        tag: "div",
        id: `menu-dropdown-${id}`,
        class: "dropdown-leave menu-dropdown".split(" "),
        parentElementId: this.dropdown.id,
      };
      this.selected = {
        tag: "span",
        id: `current-dropdown-${id}`,
        class: "button-span".split(" "),
        parentElementId: this.optionButton.id,
        innerHtml: props.defaultText,
      };
      this.dropdownOptions = {
        tag: "div",
        id: `dropdown-options-${id}`,
        class: ["is-flex-column"],
        parentElementId: this.menuDropdown.id,
        attributes: [
          { name: "role", value: "menu" },
          { name: "aria-orientation", value: "vertical" },
          { name: "aria-labelledby", value: `options-menu-${id}` },
        ],
      };

      Object.keys(this).map((i) => this.createNewElement(this[i]));
      props.arrayOfElements.map((i) => {
        const elem: Elementable = {
          tag: "button",
          id: `dropdown-element-${id}`,
          class: ["option-dropdown", "select"],
          parentElementId: this.dropdownOptions.id,
          attributes: [{ name: "value", value: i.country }],
          innerHtml: i.country,
        };
        this.createNewElement(elem);
      });
      this.listenButton();
      this.clickOutsideListen();
    }

    public listenOptions(): void {
      const options = document.getElementsByClassName("option-dropdown");
      const menu = document.getElementById(this.menuDropdown.id);
      for (const option of options) {
        option.addEventListener("click", (e) => {
          const selected = document.getElementById(this.selected.id);
          selected.innerHTML = (e.target as HTMLButtonElement).value;
          console.log(selected.innerHTML);

          for (const option of options) {
            if ((option as HTMLInputElement).innerText === selected.innerText) {
              option.classList.add("dropdown-selected");
            } else {
              option.classList.remove("dropdown-selected");
            }
          }

          menu.classList.add("dropdown-leave");
          menu.classList.remove("dropdown-enter");
        });
      }
    }

    private listenButton(): void {
      const optionButton = document.getElementById(this.optionButton.id);
      optionButton.addEventListener("click", () => {
        const menu = document.getElementById(this.menuDropdown.id);
        if (menu.classList.contains("dropdown-leave")) {
          menu.classList.remove("dropdown-leave");
          menu.classList.add("dropdown-enter");
        } else {
          menu.classList.add("dropdown-leave");
          menu.classList.remove("dropdown-enter");
        }
      });
    }

    private clickOutsideListen(): void {
      document.addEventListener("click", (e) => {
        e.preventDefault();
        const dropdown = document.getElementById(this.dropdown.id);
        const isClickInside = dropdown.contains((e as any).target);
        const menu = document.getElementById(this.menuDropdown.id);
        if (!isClickInside && menu.classList.contains("dropdown-enter")) {
          menu.classList.add("dropdown-leave");
          menu.classList.remove("dropdown-enter");
        }
      });
    }
}
