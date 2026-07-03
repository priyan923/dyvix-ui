import './dependencies/style/styles.css';
import React, { forwardRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SelectEngine = forwardRef(
  (
    {
      elements = [],
      is_open,
      is_rendered,
      selectedElement = '',
      placeholder = '',
      controller,
      activeIndex,
      inputRef,
      OnChangeCallback,
      type,
      background,
      className
    },
    ref
  ) => {
    const itemsRef = React.useRef([]);

    function ChangeValue(value) {
      if (!value) {
        return;
      }

      inputRef.current.value = value;
      controller((prevData) => ({
        ...prevData,
        is_open: false,
        activeIndex: -1
      }));

      OnChangeCallback(value);
    }

    useGSAP(() => {
      if (!ref?.current) return;

      if (is_open) {
        gsap.fromTo(
          ref.current,
          {
            height: 0,
            opacity: 0
          },
          {
            height: 'auto',
            opacity: 1,
            duration: 1.1,
            ease: 'power2.inOut',
            overwrite: 'auto'
          }
        );
      } else {
        gsap.to(ref.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
          overwrite: 'auto'
        });
      }
    }, [is_open, elements]);

    useEffect(() => {
      if (activeIndex >= 0 && itemsRef.current[activeIndex]) {
        itemsRef.current[activeIndex].scrollIntoView({ block: 'nearest' });
      }
    }, [activeIndex]);
console.log(background)
    return (
      <>
        {is_rendered && (
          <ul
            className={`dyvix-dropdown-select ${className}`.trim()}
            role="listbox"
            ref={ref}
            style={{...(background && {'--dyvix-select-dropdown-color': background})}}
          >
            {is_open &&
              elements.map((element, index) => (
                <li
                  role="option"
                  ref={(ele) => (itemsRef.current[index] = ele)}
                  key={index}
                  style={
                    index === activeIndex
                      ? {
                          backgroundColor:
                            'var(--dyvix-select-active-bg, #e0f7fa)',
                          color: 'var(--dyvix-select-active-text, #141618)',
                          cursor: 'pointer'
                        }
                      : {}
                  }
                  onMouseDown={(e) => {
                    e.preventDefault();
                    ChangeValue(element);
                  }}
                  onMouseEnter={() => {
                    controller((prevData) => ({
                      ...prevData,
                      activeIndex: index
                    }));
                  }}
                >
                  {element}
                </li>
              ))}
            {is_open && elements.length === 0 && (
              <li
                role="option"
                key={404}
                style={{
                  fontSize: '.5rem',
                  color: '#888',
                  textAlign: 'center'
                }}
              >
                Not Found!
              </li>
            )}
          </ul>
        )}
      </>
    );
  }
);

export default SelectEngine;
