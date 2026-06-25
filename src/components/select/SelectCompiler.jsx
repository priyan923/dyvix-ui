import './dependencies/style/styles.css';
import React from 'react';
import SelectEngine from './SelectEngine';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { EvaluateFailure, GuardStatus } from '../../utils/DyvixGuard';
import { ValidateSelect } from './validation';

/**
 * @param {Object} props
 * @param {Array<Object>} props.elements - Array of select elements
 * @param {Function} [props.onChange] - Change callback
 * @param {('select'|'autocomplete')} props.type - Select type
 * @param {string} [props.animation] - Animation name, defaults to fade
 * @param {string} [props.className] - Select class
 * @param {string} [props.placeholder] - Select placeholder
 */
function DyvixSelect({
  elements = [],
  onChange,
  type = 'select',
  animation = 'fade',
  className,
  placeholder = '',
  style,
  ...rest
}) {
  type = type.includes('-') ? type.split('-')[1] : type;

  const [Select, SetSelect] = React.useState({
    is_rendered: true,
    is_open: false,
    elements: [],
    selected: '',
    activeIndex: -1
  });
  const selectWrapperRef = React.useRef(null);
  const selectRef = React.useRef(null);
  const [configs, SetConfig] = React.useState({});
  const instanceId = React.useId();
  const dropdownSelectRef = React.useRef(null);

  function onChangeInternalCallback(data) {
    onChange(data);
  }

  function TranslateEngineType(value, handler, controller) {
    if (type === 'select') {
      if (handler !== 'focus' && handler !== 'blur') return;

      controller((prevData) => ({
        ...prevData,
        is_open: handler === 'focus',
        elements: elements
      }));
    }
  }

  const PopulateSelect = (value, controller, elementArray) => {
    value = value.toLowerCase();

    if (!value) {
      controller((prevData) => ({
        ...prevData,
        is_open: false
      }));
      return;
    }

    const result = elementArray.filter((element) => {
      const items = String(element).trim().toLowerCase();
      const query = value.trim().toLowerCase();

      return items.startsWith(query);
    });

    if (result.length == 0) {
      controller((prevData) => ({
        ...prevData,
        elements: [],
        is_open: false
      }));

      return;
    }

    controller((prevData) => ({
      ...prevData,
      elements: result,
      is_open: true
    }));
  };
  const currentAnimation = animation ? configs['animation'] : null;
  className = `dyvix-select-wrapper${className !== '' ? ` ${className}` : ''}`;

  React.useEffect(() => {
    async function validate() {
      const validator = await ValidateSelect(
        elements,
        type,
        animation,
        '',
        SetConfig,
        instanceId
      );

      if (validator.status === GuardStatus.Error) {
        return EvaluateFailure(validator.error, validator.status);
      }
    }

    validate();
  }, [animation]);

  function HandleKey(e, controller) {
    if (Select.is_open == false) return;

    const { key } = e;
    const max = Select.elements.length - 1;
    const min = -1;
    const index = Select.activeIndex;

    if (key === 'ArrowUp') {
      if (index <= min) return;
      controller((prevData) => ({
        ...prevData,
        activeIndex: index - 1
      }));
      e.preventDefault();
    }

    if (key === 'ArrowDown') {
      if (index >= max) return;
      controller((prevData) => ({
        ...prevData,
        activeIndex: index + 1
      }));
      e.preventDefault();
    }

    if (key === 'Enter') {
      if (index < 0 || index > max) return;

      selectRef.current.value = Select.elements[index];
      controller((prevData) => ({
        ...prevData,
        selected: Select.elements[index],
        is_open: false,
        activeIndex: -1
      }));
      e.preventDefault();
    }
  }

  useGSAP(() => {
    if (!selectWrapperRef.current || !currentAnimation) return;

    gsap.fromTo(selectWrapperRef.current, currentAnimation.from, {
      ...currentAnimation.to,
      duration: currentAnimation['default-duration'],
      ease: currentAnimation.ease
    });
  }, [currentAnimation]);
  const props = {
    className: className,
    style: style
  };

  return (
    <div {...props} ref={selectWrapperRef}>
      <div className={`dyvix-select`}>
        <input
          {...rest}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={Select.is_open}
          aria-haspopup="listbox"
          className={`dyvix-select-input`}
          type="text"
          ref={selectRef}
          placeholder={placeholder}
          onChange={(e) => {
            PopulateSelect(e.target.value, SetSelect, elements);
            onChangeInternalCallback(e.target.value);
          }}
          onFocus={(e) => {
            TranslateEngineType(e.target.value, 'focus', SetSelect);
          }}
          onBlur={(e) => {
            TranslateEngineType(e.target.value, 'blur', SetSelect);
          }}
          onKeyDown={(e) => HandleKey(e, SetSelect)}
        />
        <SelectEngine
          elements={Select.elements}
          is_open={Select.is_open}
          is_rendered={Select.is_rendered}
          inputRef={selectRef}
          activeIndex={Select.activeIndex}
          ref={dropdownSelectRef}
          controller={SetSelect}
          OnChangeCallback={(value) => onChangeInternalCallback(value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default DyvixSelect;
