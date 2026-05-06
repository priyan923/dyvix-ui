import { Modal, DYVIX_GLOBAL_ANIMATION, DYVIX_GLOBAL_THEME } from 'dyvix-ui';
import React from 'react';
export function ModalTest() {
  const testData = Array.from({ length: 9 }, (_, i) => ({
    type: 'text',
    name: `field_${i}`,
    placeholder: `Extended Field ${i + 1}`,
    amount: 1
  }));

  return (
    <Modal
      title="Register"
      Id="register-modal"
      className="modalsss"
      theme={DYVIX_GLOBAL_THEME.FROST}
      //preset={'ResetPassword'}
      type="auth"
      elements={[
        {
          type: 'password',
          placeholder: ['New Password', 'fgfg'],
          validation: 'password',
          id: ['new-password', 'new-passwordx'],
          name: ['newPassword', 'ddffd'],
          amount: 2
        },
        {
          type: 'password',
          placeholder: 'Confirm Password',
          validation: 'password',
          id: 'confirm-password',
          name: 'confirmPassword',
          amount: 1,
          match: ['new-password']
        }
      ]}
      onSubmit={(data) => console.log(data)}
      onChange={(data) => console.log(data)}
    />
  );
}
