import * as styles from "./countries-dropdown-search.module.css";
import classNames from "classnames";
import React, { useEffect, useState, useRef } from "react";
import { CaretDown, Search, X } from "../icons";
import { map, prop, pipe, startsWith, filter, toLower, equals } from "ramda";
import noop from "../noop";

const CountriesDropdownSearch = ({
  className,
  options = [],
  selected,
  onChanged = noop,
}) => {
  const [isPopoverActive, setIsPopoverActive] = useState(false);
  // TODO: add placeholder if selected is undefined
  const [selectedItem, setSelectedItem] = useState(selected);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const searchInputRef = useRef(null);
  const containerRef = useRef(null);
  const selectedItemRef = useRef(null);

  const containerClasses = classNames(className, styles["dropdown"]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsPopoverActive(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [containerRef]);

  useEffect(() => {
    if (!isPopoverActive) {
      setFilteredOptions(options);
    } else {
      selectedItemRef.current.scrollIntoView();
    }
  }, [isPopoverActive]);

  useEffect(() => {
    if (isPopoverActive) {
      searchInputRef.current.focus();
    }
  }, [isPopoverActive]);

  const onItemSelected = (item) => () => {
    setSelectedItem(item);
    setIsPopoverActive(false);

    onChanged(item);
  };

  const DropdownItem = (countryObj) => {
    const { name, countryCode, phoneCode, id } = countryObj;
    const containerClasses = classNames(styles["list__item"], {
      [styles["list__item__selected"]]: equals(countryObj, selectedItem),
    });

    const divProps = equals(countryObj, selectedItem)
      ? { ref: selectedItemRef }
      : {};

    return (
      <div
        className={containerClasses}
        onClick={onItemSelected(countryObj)}
        key={id}
        {...divProps}
      >
        <div className={styles["list__name_container"]}>
          <div className={styles["selected__country__img"]}>
            <img src={`https://flagcdn.com/16x12/${countryCode}.png`} />
          </div>
          <span>{name}</span>
        </div>
        <span className={styles["list__phone_code"]}>{phoneCode}</span>
      </div>
    );
  };

  const dropdownList = map(DropdownItem)(filteredOptions);

  const onSelectedCountryClicked = () => {
    setIsPopoverActive((prev) => !prev);
  };

  const onSearchInputChanged = (e) => {
    const val = e.target.value;

    const updatedOptions = filter(pipe(prop("name"), toLower, startsWith(val)))(
      options
    );

    setFilteredOptions(updatedOptions);
  };

  const onTest = () => {
    selectedItemRef.current.scrollIntoView();
  };

  return (
    <div className={containerClasses} ref={containerRef}>
      <div
        className={styles["selected_container"]}
        onClick={onSelectedCountryClicked}
      >
        <div className={styles["selected__country"]}>
          <div className={styles["selected__country__img"]}>
            <img
              src={`https://flagcdn.com/16x12/${prop("countryCode")(
                selectedItem
              )}.png`}
            />
          </div>
          <span>{prop("name")(selectedItem)}</span>
        </div>
        <CaretDown />
      </div>
      {isPopoverActive && (
        <div className={styles["popover"]}>
          <div className={styles["popover__input"]}>
            <div className={styles["popover__img"]}>
              <Search />
            </div>
            <input ref={searchInputRef} onChange={onSearchInputChanged} />
            <div onClick={onTest}>
              <X />
            </div>
          </div>
          <div className={styles["dropdown__list"]}>{dropdownList}</div>
        </div>
      )}
    </div>
  );
};

export default CountriesDropdownSearch;
