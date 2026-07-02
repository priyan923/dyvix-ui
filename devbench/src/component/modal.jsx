import {
  Modal,
  DYVIX_GLOBAL_ANIMATION,
  DYVIX_GLOBAL_THEME,
  DYVIX_MODAL_ELEMENT
} from 'dyvix-ui';
import React from 'react';
export function ModalTest() {
  const types = Object.values(DYVIX_MODAL_ELEMENT);
  const optionatedTypes = ['select', 'd-select', 'autocomplete'];

  const simpleHeightTestData = Array.from({ length: 1 }, (_, i) => ({
    type: 'text',
    name: `field_${i}`,
    placeholder: `Extended Field ${i + 1}`,
    amount: 1
  }));
  const stressTestData = Array.from({ length: 5 }, (_, i) => {
    const randomEleType = types[Math.floor(Math.random() * types.length)];
    let props = { type: randomEleType, amount: (i % 3) + 1 };
    let placeholder = [];
    let name = [];
    let options = [];

    for (let j = 0; j < props.amount; j++) {
      placeholder.push(`Test Field ${i + 1}_${j + 1}`);
      name.push(`dynamic_field_${i + 1}_${j + 1}`);
      options.push([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }
    props = {
      ...props,
      ...{
        placeholder: placeholder,
        name: name,
        ...(options.length > 0 && { options: options })
      }
    };

    return props;
  });

  return (
    <Modal
      title="Register"
      Id="register-modal"
      className="testmodal"
      //background="red"
      theme={'Crimson'}
      // background={'Red'}
      //  preset={'ResetPassword'}
      type="auth"
      elements={[    {
      type: "d-select",
      amount: 3,
      placeholder: ["Select Size", "Choose Color", "Shipping Method"],
      name: ["Size", "Color", "Method"],
      options: [
        ["Small", "Medium", "Large"],
        ["Red", "Blue", "Green"],
        ["Standard", "Express", "Prime"]
      ]
    }]}
      onSubmit={(data) => console.log(data)}
      onChange={(data) => console.log(data)}
    />
  );
}
