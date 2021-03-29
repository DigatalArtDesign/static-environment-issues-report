import uuid from "uuid";
import { Countriable } from "../../interfaces/countries";
import { Elementable, Attr } from "../../interfaces/elementable";
import AppElementUI from "../AppElement";
import AppElementCreator from "../ElementCreator";

export interface DropdownContructor {
    arrayOfElements: Array<Countriable>;
    defaultText: string;
    appendTo: string;
}

export class AppDropdown extends AppElementCreator {
  public createElement(id: string): AppElementUI {
    const props: Elementable = {
      tag: "div",
      id: `dropdown-${uuid()}`,
      class: "dropdown is-w-full".split(" "),
      parentElementId: id,
    };

    return new AppElementUI(props, true);
  }
}

export class AppDropdownOptionButton extends AppElementCreator {
  public createElement(id: string): AppElementUI {
    const props: Elementable = {
      tag: "button",
      id: `options-menu-${uuid()}`,
      class: "button select cursor-pointer is-display-flex".split(" "),
      parentElementId: id,
      attributes: [
        { name: "aria-haspopup", value: "true" },
        { name: "aria-expanded", value: "true" },
      ],
    };

    return new AppElementUI(props, true);
  }
}

export class AppDropdownSelected extends AppElementCreator {
  public createElement(id: string, innerHTML?: string): AppElementUI {
    const props: Elementable = {
      tag: "span",
      id: `current-dropdown-${uuid()}`,
      class: "button-span".split(" "),
      parentElementId: id,
      innerHtml: innerHTML,
    };

    return new AppElementUI(props, true);
  }
}

export class AppDropdownMenu extends AppElementCreator {
  public createElement(id: string): AppElementUI {
    const props: Elementable = {
      tag: "div",
      id: `menu-dropdown-${uuid()}`,
      class: "dropdown-leave menu-dropdown".split(" "),
      parentElementId: id,
    };

    return new AppElementUI(props, true);
  }
}

export class AppDropdownOptions extends AppElementCreator {
  public createElement(id: string): AppElementUI {
    const currentId = uuid();
    const props: Elementable = {
      tag: "div",
        id: `dropdown-options-${currentId}`,
        class: ["is-flex-column"],
        parentElementId: id,
        attributes: [
          { name: "role", value: "menu" },
          { name: "aria-orientation", value: "vertical" },
          { name: "aria-labelledby", value: `options-menu-${currentId}` },
        ],
    };

    return new AppElementUI(props, true);
  }
}

export class AppDropdownElement extends AppElementCreator {
  public createElement(id: string, attributes: Attr[], innerHTML: string): AppElementUI {
    const props: Elementable = {
      tag: "button",
      id: `dropdown-element-${id}`,
      class: ["option-dropdown", "select"],
      parentElementId: id,
      attributes: attributes,
      innerHtml: innerHTML,
    };

    return new AppElementUI(props, true);
  }
}

export default class Dropdown {
    private optionButton!: AppElementUI;

    private dropdown!: AppElementUI;

    private selected!: AppElementUI;

    private menuDropdown!: AppElementUI;

    private dropdownOptions!: AppElementUI;

    private dropdownElements: AppElementUI[] = [];

    private _firstClick = true;

    constructor(props: DropdownContructor) {
      this.dropdown = new AppDropdown().createElement(props.appendTo);
      this.dropdown.renderElement();

      this.optionButton = new AppDropdownOptionButton().createElement(this.dropdown.id);

      this.menuDropdown = new AppDropdownMenu().createElement(this.dropdown.id);

      this.selected = new AppDropdownSelected().createElement(this.optionButton.id, props.defaultText);

      this.dropdownOptions = new AppDropdownOptions().createElement(this.menuDropdown.id);

      props.arrayOfElements.map((i) => {
        const element = new AppDropdownElement().createElement(this.dropdownOptions.id, [{ name: "value", value: i.country }], i.country);
        this.dropdownElements.push(element);
      });
      this.listenButton();
      this.clickOutsideListen();
    }

    public resetValue(innerHTML: string) {
      this.selected.changeInnerHtml(innerHTML);
    } 

    set firstClick(b: boolean) {
      this._firstClick = b;
    }

    public listenOptions(changeValidation: () => void): void {
      const options = document.getElementsByClassName("option-dropdown");
      const menu = document.getElementById(this.menuDropdown.id);
      for (const option of options) {
        option.addEventListener("click", (e) => {
          const selected = document.getElementById(this.selected.id);
          selected.innerHTML = (e.target as HTMLButtonElement).value;
          if(this._firstClick) {
            changeValidation();
            this._firstClick = false;
          }

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

    public get value() {
      return document.getElementById(this.selected.id).innerHTML;
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
